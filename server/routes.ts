import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  email: z.string().email("Введите корректный email").optional().or(z.literal("")),
  program: z.string().optional(),
  message: z.string().optional(),
  privacy: z.boolean().refine(val => val === true, "Необходимо согласие на обработку данных")
});

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

  const httpServer = createServer(app);
  return httpServer;
}
