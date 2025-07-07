import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import OpenAI from "openai";
import { db } from "./db";
import { courseRegistrations, insertRegistrationSchema } from "@shared/schema";

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

const registrationSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  email: z.string().email("Введите корректный email").optional().or(z.literal("")),
  age: z.string(),
  level: z.string(),
  goals: z.string(),
  experience: z.string(),
  program: z.string()
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

ВАШИ ВОЗМОЖНОСТИ:
- Консультировать по программам обучения
- Собирать информацию для записи на курсы
- РЕГИСТРИРОВАТЬ КЛИЕНТОВ на выбранные программы

ПРОГРАММЫ ШКОЛЫ:
• Общий английский (4500₽/мес) - 95% студентов повышают уровень за 6 месяцев
• Бизнес-английский (6500₽/мес) - 80% получили повышение или новую работу
• Английский для детей (3800₽/мес) - 90% детей сдают экзамены на "отлично"
• Подготовка к IELTS (8500₽/мес) - средний балл выпускников 7.5
• Индивидуальные занятия (1500₽/урок) - результат в 3 раза быстрее
• Разговорный клуб (2000₽/мес) - 100% преодолевают языковой барьер

ПРОЦЕСС РЕГИСТРАЦИИ:
1. Узнайте потребности клиента (возраст, уровень, цели, опыт)
2. Порекомендуйте подходящую программу
3. Если клиент хочет записаться - соберите контактные данные:
   - Имя и фамилию
   - Номер телефона
   - Email (необязательно)
4. Подтвердите все данные
5. Используйте функцию регистрации для записи клиента

ПРАВИЛА:
- Ведите естественную беседу
- Не повторяйте одни и те же фразы
- Собирайте информацию поэтапно
- После получения всех данных - регистрируйте клиента

ФУНКЦИИ:
Если у вас есть все необходимые данные для регистрации, используйте:
REGISTER_CLIENT{name:"Имя Фамилия", phone:"номер", email:"email", age:"возраст", level:"уровень", goals:"цели", experience:"опыт", program:"программа"}

Будьте дружелюбны и профессиональны.`;

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

      let aiResponse = completion.choices[0].message.content || "Извините, не смог обработать ваш запрос.";
      let registrationResult = null;

      // Check if AI wants to register a client
      const registerMatch = aiResponse.match(/REGISTER_CLIENT\{([^}]+)\}/);
      if (registerMatch) {
        try {
          // Parse registration data from AI response
          const regDataStr = registerMatch[1];
          const regData: any = {};
          
          // Simple parsing of key-value pairs
          regDataStr.split(',').forEach(pair => {
            const [key, value] = pair.split(':');
            if (key && value) {
              regData[key.trim().replace(/"/g, '')] = value.trim().replace(/"/g, '');
            }
          });

          // Validate and register
          const validatedData = registrationSchema.parse(regData);
          
          const [registration] = await db
            .insert(courseRegistrations)
            .values({
              ...validatedData,
              email: validatedData.email || null
            })
            .returning();

          console.log("AI registered client:", registration);
          
          registrationResult = {
            success: true,
            registrationId: registration.id
          };

          // Remove the REGISTER_CLIENT command from response
          aiResponse = aiResponse.replace(/REGISTER_CLIENT\{[^}]+\}/, '').trim();
          
          // Add success message
          aiResponse += `\n\n✅ Отлично! Ваша регистрация успешно завершена (№${registration.id}). Наш менеджер свяжется с вами в ближайшее время для подтверждения записи на программу "${registration.program}".`;

        } catch (error) {
          console.error("AI registration error:", error);
          aiResponse = aiResponse.replace(/REGISTER_CLIENT\{[^}]+\}/, '').trim();
          aiResponse += "\n\n❌ Извините, произошла ошибка при регистрации. Пожалуйста, проверьте данные или обратитесь к менеджеру.";
        }
      }

      // Update conversation history
      history.push({ role: "user", content: message });
      history.push({ role: "assistant", content: aiResponse });
      
      // Keep history manageable
      if (history.length > maxHistory) {
        history.splice(0, history.length - maxHistory);
      }

      res.json({
        message: aiResponse,
        step: step,
        registration: registrationResult
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

  // Course registration endpoint
  app.post("/api/register", async (req, res) => {
    try {
      const validatedData = registrationSchema.parse(req.body);
      
      // Save registration to database
      const [registration] = await db
        .insert(courseRegistrations)
        .values({
          ...validatedData,
          email: validatedData.email || null
        })
        .returning();

      console.log("New course registration:", registration);
      
      res.json({
        success: true,
        message: "Регистрация успешно завершена! Наш менеджер свяжется с вами в ближайшее время для подтверждения записи.",
        registrationId: registration.id
      });

    } catch (error) {
      console.error("Registration error:", error);
      
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

  const httpServer = createServer(app);
  return httpServer;
}
