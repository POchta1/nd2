import { motion } from "framer-motion";
import PricingCalculator from "./PricingCalculator";

export default function Programs() {
  const programs = [
    {
      title: "Общий английский",
      icon: "fas fa-users",
      description: "Комплексное изучение языка для взрослых. Развитие всех навыков: говорение, чтение, письмо, аудирование.",
      features: [
        "2 раза в неделю по 90 минут",
        "Группы до 8 человек",
        "Все уровни (A1-C2)"
      ],
      price: "от 4 500₽",
      period: "за месяц",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    },
    {
      title: "Бизнес-английский",
      icon: "fas fa-briefcase",
      description: "Профессиональный английский для карьерного роста. Деловая переписка, презентации, переговоры.",
      features: [
        "2 раза в неделю по 90 минут",
        "Группы до 6 человек",
        "Уровень B1+"
      ],
      price: "от 6 500₽",
      period: "за месяц",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    },
    {
      title: "Английский для детей",
      icon: "fas fa-child",
      description: "Увлекательное изучение английского для детей 5-12 лет. Игровые методики, песни, интерактив.",
      features: [
        "2 раза в неделю по 60 минут",
        "Группы до 6 детей",
        "Возраст 5-12 лет"
      ],
      price: "от 3 800₽",
      period: "за месяц",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    },
    {
      title: "Подготовка к IELTS",
      icon: "fas fa-certificate",
      description: "Интенсивная подготовка к международному экзамену IELTS. Все разделы теста, стратегии решения.",
      features: [
        "3 раза в неделю по 90 минут",
        "Группы до 4 человек",
        "Уровень B2+"
      ],
      price: "от 8 500₽",
      period: "за месяц",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    },
    {
      title: "Индивидуальные занятия",
      icon: "fas fa-user",
      description: "Персональный подход с максимальной эффективностью. Программа под ваши цели и график.",
      features: [
        "Гибкий график",
        "1 на 1 с преподавателем",
        "Любой уровень"
      ],
      price: "от 1 500₽",
      period: "за урок",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    },
    {
      title: "Разговорный клуб",
      icon: "fas fa-comments",
      description: "Практика живого общения на английском языке. Дискуссии, дебаты, игры в дружеской атмосфере.",
      features: [
        "1 раз в неделю 120 минут",
        "Группы до 10 человек",
        "Уровень A2+"
      ],
      price: "от 2 000₽",
      period: "за месяц",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    }
  ];

  const enrollInProgram = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="programs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-brand-gray mb-6">
            Программы обучения
          </h2>
          <p className="text-xl text-brand-gray/70 max-w-3xl mx-auto">
            Выберите программу, которая идеально подходит для ваших целей и уровня знаний
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {programs.map((program, index) => (
            <motion.div 
              key={program.title}
              className="bg-white border border-gray-200 rounded-xl shadow-lg hover-lift overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img 
                src={program.image} 
                alt={`${program.title} course`} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <i className={`${program.icon} text-brand-red text-2xl mr-3`}></i>
                  <h3 className="font-montserrat font-bold text-xl text-brand-gray">
                    {program.title}
                  </h3>
                </div>
                <p className="text-brand-gray/70 mb-4 leading-relaxed">
                  {program.description}
                </p>
                <div className="space-y-2 mb-6">
                  {program.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-brand-gray/70">
                      <i className="fas fa-clock mr-2 text-brand-red"></i>
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-brand-red">{program.price}</span>
                  <span className="text-sm text-brand-gray/70">{program.period}</span>
                </div>
                <motion.button 
                  onClick={enrollInProgram}
                  className="w-full bg-brand-red hover:bg-brand-red-dark text-white py-3 rounded-lg font-semibold transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Записаться
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Pricing Calculator */}
        <PricingCalculator />
        
      </div>
    </section>
  );
}
