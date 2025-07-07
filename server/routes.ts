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
        // Fallback response when OpenAI is not configured
        res.json({
          message: "Для полной функциональности AI помощника необходим API ключ OpenAI. Пожалуйста, свяжитесь с администратором или воспользуйтесь формой обратной связи для получения консультации.",
          step: step
        });
        return;
      }

      // Create context based on user profile
      const context = `
Вы - AI консультант школы английского языка "English Excellence". Ваша задача - провести полную консультацию с клиентом.

ЭТАПЫ КОНСУЛЬТАЦИИ:
1. Поприветствуйте клиента
2. Узнайте возраст/возрастную группу
3. Определите текущий уровень английского
4. Выясните цели изучения языка
5. Узнайте опыт изучения английского
6. Порекомендуйте подходящую программу с ДЕТАЛЬНЫМ описанием

ИНФОРМАЦИЯ О ПРОГРАММАХ:

🎯 ОБЩИЙ АНГЛИЙСКИЙ (4500₽/мес)
- Описание: Комплексное изучение всех аспектов языка
- Чему научитесь: грамматика, лексика, чтение, письмо, аудирование, говорение
- Достижения выпускников: 95% студентов повышают уровень за 6 месяцев
- Результат: свободное общение в повседневных ситуациях

💼 БИЗНЕС-АНГЛИЙСКИЙ (6500₽/мес)  
- Описание: Профессиональный английский для карьеры
- Чему научитесь: деловая переписка, презентации, переговоры, отраслевая лексика
- Достижения выпускников: 80% получили повышение или новую работу
- Результат: уверенность в международном бизнесе

👶 АНГЛИЙСКИЙ ДЛЯ ДЕТЕЙ (3800₽/мес)
- Описание: Игровые методики для детей 5-17 лет
- Чему научитесь: основы языка через игры, песни, творчество
- Достижения выпускников: 90% детей сдают школьные экзамены на "отлично"
- Результат: любовь к языку и крепкая база знаний

🎓 ПОДГОТОВКА К IELTS (8500₽/мес)
- Описание: Интенсивная подготовка к международному экзамену
- Чему научитесь: стратегии сдачи всех частей IELTS
- Достижения выпускников: средний балл наших студентов 7.5
- Результат: высокие баллы для поступления в зарубежные вузы

👨‍🏫 ИНДИВИДУАЛЬНЫЕ ЗАНЯТИЯ (1500₽/урок)
- Описание: Персональный подход с опытным преподавателем
- Чему научитесь: программа адаптируется под ваши потребности
- Достижения выпускников: результат в 3 раза быстрее групповых занятий
- Результат: максимально эффективное обучение

🗣️ РАЗГОВОРНЫЙ КЛУБ (2000₽/мес)
- Описание: Практика живого общения с носителями языка
- Чему научитесь: преодоление языкового барьера, беглость речи
- Достижения выпускников: 100% участников начинают свободно говорить
- Результат: уверенность в разговоре на любые темы

ДОСТИЖЕНИЯ ШКОЛЫ:
- 15 лет опыта
- Более 5000 выпускников
- 98% довольных студентов
- Сертифицированные преподаватели
- Современные методики обучения

ПРАВИЛА:
- Задавайте по одному вопросу за раз
- Собирайте всю информацию поэтапно
- После сбора данных дайте ДЕТАЛЬНУЮ рекомендацию
- Всегда указывайте достижения и результаты программ
- Мотивируйте к началу обучения

Пользователь написал: "${message}"
Текущая информация о пользователе: возраст: ${userProfile.age || 'не указано'}, уровень: ${userProfile.level || 'не указано'}, цели: ${userProfile.goals || 'не указано'}, опыт: ${userProfile.experience || 'не указано'}
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
