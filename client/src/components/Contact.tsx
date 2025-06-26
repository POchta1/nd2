import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ContactForm {
  name: string;
  phone: string;
  email: string;
  program: string;
  message: string;
  privacy: boolean;
}

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    phone: "",
    email: "",
    program: "",
    message: "",
    privacy: false
  });

  const submitContactForm = useMutation({
    mutationFn: async (data: ContactForm) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Заявка отправлена!",
        description: "Спасибо за обращение! Мы свяжемся с вами в ближайшее время.",
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
        program: "",
        message: "",
        privacy: false
      });
    },
    onError: () => {
      toast({
        title: "Ошибка отправки",
        description: "Произошла ошибка при отправке заявки. Попробуйте еще раз.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) {
      toast({
        title: "Согласие на обработку данных",
        description: "Необходимо согласиться с политикой конфиденциальности",
        variant: "destructive",
      });
      return;
    }
    submitContactForm.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactForm, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-brand-gray mb-6">
            Свяжитесь с нами
          </h2>
          <p className="text-xl text-brand-gray/70 max-w-3xl mx-auto">
            Готовы начать изучение английского? Свяжитесь с нами любым удобным способом
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="font-montserrat font-bold text-2xl text-brand-gray mb-6">
                Наши контакты
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-map-marker-alt text-brand-red text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-gray mb-1">Адрес</h4>
                    <p className="text-brand-gray/70">
                      г. Москва, ул. Тверская, 15<br/>
                      БЦ "Центральный", офис 412
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-phone text-brand-red text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-gray mb-1">Телефон</h4>
                    <p className="text-brand-gray/70">
                      <a href="tel:+74951234567" className="hover:text-brand-red transition-colors">
                        +7 (495) 123-45-67
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-envelope text-brand-red text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-gray mb-1">Email</h4>
                    <p className="text-brand-gray/70">
                      <a href="mailto:info@englishschool.ru" className="hover:text-brand-red transition-colors">
                        info@englishschool.ru
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-clock text-brand-red text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-gray mb-1">Режим работы</h4>
                    <p className="text-brand-gray/70">
                      Пн-Пт: 9:00 - 21:00<br/>
                      Сб-Вс: 10:00 - 18:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-brand-gray mb-4">Мы в социальных сетях</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-brand-red/10 hover:bg-brand-red text-brand-red hover:text-white rounded-lg flex items-center justify-center transition-all duration-300">
                  <i className="fab fa-vk"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-brand-red/10 hover:bg-brand-red text-brand-red hover:text-white rounded-lg flex items-center justify-center transition-all duration-300">
                  <i className="fab fa-telegram"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-brand-red/10 hover:bg-brand-red text-brand-red hover:text-white rounded-lg flex items-center justify-center transition-all duration-300">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-brand-red/10 hover:bg-brand-red text-brand-red hover:text-white rounded-lg flex items-center justify-center transition-all duration-300">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            
            {/* Yandex Map */}
            <div className="bg-gray-200 rounded-xl h-64 overflow-hidden">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A3e9f8c9e7b6d5e8e9f8c9e7b6d5e8e9f8c9e7b6d5e8e&amp;source=constructor"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ borderRadius: '12px' }}
                title="Яндекс.Карта - Школа Английского"
              ></iframe>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            className="bg-brand-gray-light rounded-2xl p-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="font-montserrat font-bold text-2xl text-brand-gray mb-6">
              Запишитесь на пробный урок
            </h3>
            <p className="text-brand-gray/70 mb-8">
              Оставьте заявку, и мы свяжемся с вами в течение часа для согласования времени бесплатного пробного урока.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-brand-gray mb-2">
                  Ваше имя *
                </label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-300"
                  placeholder="Введите ваше имя" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-gray mb-2">
                  Телефон *
                </label>
                <input 
                  type="tel" 
                  required 
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-300"
                  placeholder="+7 (___) ___-__-__" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-gray mb-2">
                  Email
                </label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-300"
                  placeholder="your@email.com" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-gray mb-2">
                  Программа обучения
                </label>
                <select 
                  value={formData.program}
                  onChange={(e) => handleInputChange('program', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-300"
                >
                  <option value="">Выберите программу</option>
                  <option value="general">Общий английский</option>
                  <option value="business">Бизнес-английский</option>
                  <option value="kids">Английский для детей</option>
                  <option value="ielts">Подготовка к IELTS</option>
                  <option value="individual">Индивидуальные занятия</option>
                  <option value="speaking">Разговорный клуб</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-gray mb-2">
                  Сообщение
                </label>
                <textarea 
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Расскажите о ваших целях и предпочтениях по обучению..." 
                />
              </div>
              
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  id="privacy" 
                  required 
                  checked={formData.privacy}
                  onChange={(e) => handleInputChange('privacy', e.target.checked)}
                  className="mt-1 mr-3" 
                />
                <label htmlFor="privacy" className="text-sm text-brand-gray/70">
                  Я согласен с <a href="#" className="text-brand-red hover:underline">политикой конфиденциальности</a> и 
                  обработкой персональных данных
                </label>
              </div>
              
              <motion.button 
                type="submit" 
                disabled={submitContactForm.isPending}
                className="w-full bg-brand-red hover:bg-brand-red-dark text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {submitContactForm.isPending ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Отправляем...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>
                    Записаться на пробный урок
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
          
        </div>
        
      </div>
    </section>
  );
}
