import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import OpenAI from "openai";

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

// Store conversation history (in production, use Redis or database)
const conversationHistory = new Map<string, { role: string; content: string }[]>();

// Initialize OpenAI client
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}) : null;

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      
      // In a real application, you would:
      // 1. Save to database
      // 2. Send email notification
      // 3. Integrate with CRM system
      // 4. Send SMS confirmation
      
      console.log("Contact form submission:", validatedData);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      res.json({ 
        success: true, 
        message: "Заявка успешно отправлена. Мы свяжемся с вами в ближайшее время." 
      });
      
    } catch (error) {
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
        res.json({
          message: "Для полной функциональности AI помощника необходим API ключ OpenAI. Пожалуйста, свяжитесь с администратором или воспользуйтесь формой обратной связи для получения консультации.",
          step: step
        });
        return;
      }

      // Generate session ID from IP or use a simple hash
      const sessionId = req.ip || 'default';
      
      // Get or initialize conversation history
      if (!conversationHistory.has(sessionId)) {
        conversationHistory.set(sessionId, []);
      }
      
      const history = conversationHistory.get(sessionId)!;

      // System prompt
      const systemPrompt = `Вы - AI консультант школы английского языка "English Excellence".

ПРАВИЛА ОБЩЕНИЯ:
- Отвечайте на вопрос пользователя напрямую
- Не повторяйте одни и те же фразы
- Если пользователь грубит или пишет неуместное - мягко перенаправьте на тему обучения
- Если вопрос не связан с английским - вежливо верните к теме школы
- Узнавайте потребности только если пользователь проявляет интерес к курсам

ПРОГРАММЫ ШКОЛЫ:
• Общий английский (4500₽/мес) - 95% студентов повышают уровень за 6 месяцев
• Бизнес-английский (6500₽/мес) - 80% получили повышение или новую работу
• Английский для детей (3800₽/мес) - 90% детей сдают экзамены на "отлично"
• Подготовка к IELTS (8500₽/мес) - средний балл выпускников 7.5
• Индивидуальные занятия (1500₽/урок) - результат в 3 раза быстрее
• Разговорный клуб (2000₽/мес) - 100% преодолевают языковой барьер

Будьте дружелюбны, но профессиональны.`;

      // Build conversation messages
      const messages = [
        { role: "system", content: systemPrompt },
        ...history,
        { role: "user", content: message }
      ];

      // Keep conversation history reasonable (last 10 messages)
      const maxHistory = 10;
      if (messages.length > maxHistory + 1) {
        messages.splice(1, messages.length - maxHistory - 1);
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: messages,
        max_tokens: 400,
        temperature: 0.7
      });

      const aiResponse = completion.choices[0].message.content || "Извините, не смог обработать ваш запрос.";

      // Update conversation history
      history.push({ role: "user", content: message });
      history.push({ role: "assistant", content: aiResponse });
      
      // Keep history manageable
      if (history.length > maxHistory) {
        history.splice(0, history.length - maxHistory);
      }

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
