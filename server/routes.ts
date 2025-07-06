import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import OpenAI from "openai";
import { storage } from "./storage";
import { insertContactSchema, insertChatMessageSchema } from "../shared/schema";

const contactFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  email: z.string().email("Введите корректный email").optional().or(z.literal("")),
  program: z.string().optional(),
  message: z.string().optional(),
  privacy: z.boolean().refine(val => val === true, "Необходимо согласие на обработку данных")
});

const chatMessageSchema = z.object({
  message: z.string(),
  userProfile: z.object({
    program: z.string().optional(),
    level: z.string().optional(),
    age: z.string().optional(),
    goals: z.string().optional(),
    experience: z.string().optional()
  }),
  step: z.string()
});

// Initialize OpenAI client
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}) : null;

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      
      // Save to database
      await storage.createContact(validatedData);
      
      console.log("Contact form submission:", validatedData);
      
      res.json({ 
        success: true, 
        message: "Заявка успешно отправлена. Мы свяжемся с вами в ближайшее время." 
      });
      
    } catch (error) {
      console.error("Contact form error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Ошибка валидации данных",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Внутренняя ошибка сервера" 
        });
      }
    }
  });

  // AI Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, userProfile, step } = chatMessageSchema.parse(req.body);
      
      console.log("Chat message:", { message, userProfile, step });

      if (!openai) {
        // Fallback response when OpenAI is not configured
        res.json({
          message: "Для полной функциональности AI помощника необходим API ключ OpenAI. Пожалуйста, свяжитесь с администратором или воспользуйтесь формой обратной связи для получения консультации.",
          step: step
        });
        return;
      }

      // Create context based on user profile
      const context = `
Вы - AI консультант школы английского языка. Пользователь выбрал:
- Программа: ${userProfile.program || 'не указано'}
- Уровень: ${userProfile.level || 'не указано'} 
- Возраст: ${userProfile.age || 'не указано'}
- Цели: ${userProfile.goals || 'не указано'}
- Опыт: ${userProfile.experience || 'не указано'}

Отвечайте дружелюбно, профессионально, на русском языке. Давайте конкретные советы по изучению английского, рекомендации программ и мотивируйте к обучению. Учитывайте профиль пользователя в ответах.

Доступные программы:
- Общий английский (от 4500₽/мес)
- Бизнес-английский (от 6500₽/мес) 
- Английский для детей (от 3800₽/мес)
- Подготовка к IELTS (от 8500₽/мес)
- Индивидуальные занятия (от 1500₽/урок)
- Разговорный клуб (от 2000₽/мес)
`;

      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: context },
          { role: "user", content: message }
        ],
        max_tokens: 500,
        temperature: 0.7
      });

      const aiResponse = completion.choices[0].message.content || "Извините, не смог обработать ваш запрос.";

      // Save chat message to database
      await storage.createChatMessage({
        message,
        response: aiResponse,
        userProfile: JSON.stringify(userProfile),
        step
      });

      res.json({
        message: aiResponse,
        step: step
      });

    } catch (error) {
      console.error("Chat API error:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Ошибка валидации данных",
          step: "error"
        });
      } else {
        res.status(500).json({ 
          message: "Извините, произошла ошибка. Попробуйте еще раз или обратитесь к менеджеру.",
          step: "error"
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
