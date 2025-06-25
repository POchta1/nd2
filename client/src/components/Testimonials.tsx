import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      rating: 5,
      text: "Благодаря курсам в Школе Английского я получила повышение на работе! Преподаватели очень профессиональные, а атмосфера на занятиях просто потрясающая. Особенно понравился индивидуальный подход и современные методики.",
      name: "Мария Петрова",
      role: "Менеджер по продажам",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      rating: 5,
      text: "Мой сын ходит на детские курсы уже полгода, и прогресс просто невероятный! Он с удовольствием идет на занятия, дома постоянно практикует английский. Преподаватель Елена находит подход к каждому ребенку.",
      name: "Анна Козлова",
      role: "Мама ученика",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      rating: 5,
      text: "Сдал IELTS на 7.5 баллов с первого раза! Курс подготовки был интенсивным, но очень эффективным. Особенно помогли mock tests и индивидуальные консультации. Теперь поступаю в университет в Канаде!",
      name: "Дмитрий Волков",
      role: "Студент",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      rating: 5,
      text: "Бизнес-курс превзошел все ожидания! Теперь свободно веду переговоры с зарубежными партнерами, делаю презентации на английском. Очень практичный подход и реальные бизнес-ситуации на занятиях.",
      name: "Александр Новиков",
      role: "Директор по развитию",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      rating: 5,
      text: "Разговорный клуб - это то, что мне было нужно! После изучения грамматики по учебникам наконец-то начала говорить свободно. Очень дружная атмосфера, интересные темы для обсуждения.",
      name: "Екатерина Смирнова",
      role: "IT-специалист",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      rating: 5,
      text: "Индивидуальные занятия с Майклом помогли мне быстро подготовиться к собеседованию в международной компании. Гибкий график, персональная программа - все было идеально подстроено под мои потребности.",
      name: "Павел Иванов",
      role: "Финансовый аналитик",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    }
  ];

  const stats = [
    { value: "95%", label: "учеников достигают целей" },
    { value: "4.9/5", label: "средняя оценка школы" },
    { value: "500+", label: "довольных выпускников" },
    { value: "3 мес", label: "средний срок до результата" }
  ];

  return (
    <section id="testimonials" className="py-20 bg-brand-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-brand-gray mb-6">
            Отзывы наших учеников
          </h2>
          <p className="text-xl text-brand-gray/70 max-w-3xl mx-auto">
            Истории успеха людей, которые достигли своих целей в изучении английского языка
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.name}
              className="bg-white rounded-xl shadow-lg p-6 hover-lift"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
                <span className="text-sm text-brand-gray/70">5.0</span>
              </div>
              <p className="text-brand-gray/80 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={`${testimonial.name} - satisfied student`} 
                  className="w-12 h-12 rounded-full mr-4 object-cover" 
                />
                <div>
                  <h4 className="font-semibold text-brand-gray">{testimonial.name}</h4>
                  <p className="text-sm text-brand-gray/70">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Statistics */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold text-brand-red mb-2">{stat.value}</div>
                <div className="text-brand-gray/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
