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
  conversationHistory: z.array(z.object({
    id: z.string(),
    text: z.string(),
    isBot: z.boolean(),
    timestamp: z.union([z.date(), z.string()]).transform(val => typeof val === 'string' ? new Date(val) : val),
    options: z.array(z.string()).optional()
  }))
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
      const { message, conversationHistory } = chatMessageSchema.parse(req.body);
      
      console.log("Chat message:", { message, conversationHistory: conversationHistory.length });

      if (!openai) {
        // Fallback response when OpenAI is not configured
        res.json({
          message: "Для полной функциональности AI помощника необходим API ключ OpenAI. Пожалуйста, свяжитесь с администратором или воспользуйтесь формой обратной связи для получения консультации."
        });
        return;
      }

      // Create comprehensive context for the AI consultant
      const systemContext = `
Вы - AI консультант школы английского языка "English World". Ваша задача - помочь клиентам выбрать подходящую программу обучения.

ОБЯЗАТЕЛЬНО узнайте у клиента:
1. Текущий уровень английского (A1, A2, B1, B2, C1, C2 или "не знаю")
2. Возраст или возрастную группу
3. Цели изучения (работа, путешествия, образование, общение, переезд и т.д.)
4. Опыт изучения английского (школа, репетитор, самостоятельно, с нуля)

Отвечайте дружелюбно, профессионально, на русском языке. Задавайте вопросы по очереди, не все сразу.

ПРОГРАММЫ ОБУЧЕНИЯ:

1. **Общий английский** (от 4500₽/мес)
   - Для чего: Развитие всех навыков языка
   - Чему научит: Грамматика, лексика, говорение, аудирование, чтение, письмо
   - Достижения учеников: 95% повышают уровень за 6 месяцев
   
2. **Бизнес-английский** (от 6500₽/мес)  
   - Для чего: Профессиональная деятельность и карьера
   - Чему научит: Деловая переписка, презентации, переговоры, профессиональная лексика
   - Достижения учеников: 87% получили повышение или новую работу после курса

3. **Английский для детей** (от 3800₽/мес)
   - Для чего: Обучение детей 5-17 лет
   - Чему научит: Основы языка через игры, песни, интерактивные занятия
   - Достижения учеников: 92% детей сдают школьные экзамены на отлично

4. **Подготовка к IELTS** (от 8500₽/мес)
   - Для чего: Сдача международного экзамена для учебы/работы за границей
   - Чему научит: Все секции IELTS, стратегии сдачи экзамена
   - Достижения учеников: Средний балл наших студентов 7.5 (из 9)

5. **Индивидуальные занятия** (от 1500₽/урок)
   - Для чего: Персональная программа под конкретные цели
   - Чему научит: Любые аспекты языка по индивидуальному плану
   - Достижения учеников: Результат в 3 раза быстрее групповых занятий

6. **Разговорный клуб** (от 2000₽/мес)
   - Для чего: Практика живого общения
   - Чему научит: Уверенная речь, преодоление языкового барьера
   - Достижения учеников: 98% начинают свободно говорить за 3 месяца

ДОСТИЖЕНИЯ ШКОЛЫ:
- 15 лет успешной работы
- Более 5000 выпускников
- 96% студентов рекомендуют школу друзьям
- Сертифицированные преподаватели с международным опытом
- Гарантия результата или возврат денег

Если пользователь пишет "start_conversation", начните с приветствия и задайте первый вопрос.
`;

      // Build conversation history for context
      let messages = [{ role: "system", content: systemContext }];
      
      // Add conversation history
      conversationHistory.forEach(msg => {
        messages.push({
          role: msg.isBot ? "assistant" : "user",
          content: msg.text
        });
      });
      
      // Add current message
      if (message !== "start_conversation") {
        messages.push({ role: "user", content: message });
      }

      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: messages,
        max_tokens: 600,
        temperature: 0.7
      });

      const aiResponse = completion.choices[0].message.content || "Извините, не смог обработать ваш запрос.";

      res.json({
        message: aiResponse
      });

    } catch (error) {
      console.error("Chat API error:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Ошибка валидации данных"
        });
      } else {
        res.status(500).json({ 
          message: "Извините, произошла ошибка. Попробуйте еще раз или обратитесь к менеджеру."
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
