import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Как проходит первое занятие?",
      answer: "Первое занятие включает в себя определение вашего уровня английского языка, обсуждение целей обучения и знакомство с преподавателем. Мы также покажем наши методики и материалы, которые будем использовать в процессе обучения. Это занятие бесплатное и ни к чему вас не обязывает."
    },
    {
      question: "Можно ли заниматься онлайн?",
      answer: "Да, мы предлагаем онлайн-занятия с использованием современных платформ. Качество обучения остается на том же высоком уровне, что и при очных занятиях. Вы получите доступ к интерактивным материалам, записям уроков и сможете заниматься из любой точки мира."
    },
    {
      question: "Какие документы я получу после окончания курса?",
      answer: "По окончании курса вы получите сертификат нашей школы с указанием пройденного уровня и количества академических часов. Для студентов программ подготовки к международным экзаменам мы также предоставляем детальный отчет о готовности к тестированию."
    },
    {
      question: "Можно ли перейти с группового обучения на индивидуальное?",
      answer: "Конечно! Вы можете в любой момент перейти на индивидуальное обучение. Мы пересчитаем стоимость оставшихся занятий и предложим удобный график для персональных уроков. Переход возможен в обе стороны в зависимости от ваших потребностей."
    },
    {
      question: "Что делать, если я пропустил занятие?",
      answer: "При пропуске группового занятия вы получите запись урока и материалы. Также можно договориться о дополнительной консультации с преподавателем. Индивидуальные занятия можно перенести, предупредив за 24 часа. У нас гибкий подход к таким ситуациям."
    },
    {
      question: "Предоставляете ли вы материалы для самостоятельного изучения?",
      answer: "Да, все студенты получают доступ к нашей онлайн-платформе с материалами: учебники, аудио и видео материалы, интерактивные упражнения, тесты для самопроверки. Также мы предоставляем рекомендации по дополнительным ресурсам для изучения языка."
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const askQuestion = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="faq" className="py-20 bg-brand-gray-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-brand-gray mb-6">
            Часто задаваемые вопросы
          </h2>
          <p className="text-xl text-brand-gray/70">
            Ответы на самые популярные вопросы о наших курсах и методах обучения
          </p>
        </motion.div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button 
                className="w-full px-6 py-4 text-left focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg text-brand-gray">
                    {faq.question}
                  </h3>
                  <motion.i 
                    className="fas fa-chevron-down text-brand-red"
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  ></motion.i>
                </div>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-brand-gray/70 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-brand-gray/70 mb-6">
            Не нашли ответ на свой вопрос?
          </p>
          <motion.button 
            onClick={askQuestion}
            className="bg-brand-red hover:bg-brand-red-dark text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-phone mr-2"></i>
            Задать вопрос
          </motion.button>
        </motion.div>
        
      </div>
    </section>
  );
}
