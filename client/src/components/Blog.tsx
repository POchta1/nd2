import { motion } from "framer-motion";

export default function Blog() {
  const blogPosts = [
    {
      title: "10 лучших приложений для изучения английского в 2024 году",
      excerpt: "Современные технологии открывают новые возможности для изучения языка. Рассказываем о самых эффективных мобильных приложениях...",
      category: "Методики",
      date: "15 декабря 2024",
      readTime: "5 мин чтения",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    },
    {
      title: "Как подготовиться к IELTS за 3 месяца: пошаговый план",
      excerpt: "Детальное руководство по подготовке к международному экзамену IELTS. Разбираем каждый раздел теста и даем практические советы...",
      category: "IELTS",
      date: "12 декабря 2024",
      readTime: "8 мин чтения",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    },
    {
      title: "Деловой английский: фразы для успешных переговоров",
      excerpt: "Изучите ключевые фразы и выражения, которые помогут вам уверенно вести деловые переговоры и производить хорошее впечатление на партнеров...",
      category: "Бизнес",
      date: "10 декабря 2024",
      readTime: "6 мин чтения",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    },
    {
      title: "Игровые методы изучения английского для детей",
      excerpt: "Как сделать изучение языка увлекательным для вашего ребенка? Делимся эффективными играми и упражнениями, которые работают...",
      category: "Дети",
      date: "8 декабря 2024",
      readTime: "4 мин чтения",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    },
    {
      title: "7 способов практиковать английский каждый день",
      excerpt: "Регулярная практика - ключ к успеху в изучении языка. Рассказываем, как интегрировать английский в повседневную жизнь...",
      category: "Практика",
      date: "5 декабря 2024",
      readTime: "7 мин чтения",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    }
  ];

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-brand-gray mb-6">
            Блог и полезные статьи
          </h2>
          <p className="text-xl text-brand-gray/70 max-w-3xl mx-auto">
            Читайте наши статьи, изучайте английский язык эффективнее и следите за новостями школы
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article 
              key={post.title}
              className="bg-white border border-gray-200 rounded-xl shadow-lg hover-lift overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-xs bg-brand-red/10 text-brand-red px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-brand-gray/60 ml-auto">{post.date}</span>
                </div>
                <h3 className="font-montserrat font-bold text-xl text-brand-gray mb-3 hover:text-brand-red transition-colors cursor-pointer">
                  {post.title}
                </h3>
                <p className="text-brand-gray/70 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <i className="far fa-clock text-brand-red mr-2"></i>
                    <span className="text-sm text-brand-gray/60">{post.readTime}</span>
                  </div>
                  <motion.button 
                    className="text-brand-red hover:text-brand-red-dark font-medium transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Читать далее <i className="fas fa-arrow-right ml-1"></i>
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="bg-white border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Все статьи блога
          </motion.button>
        </motion.div>
        
      </div>
    </section>
  );
}
