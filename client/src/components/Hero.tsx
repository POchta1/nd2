import { motion } from "framer-motion";

export default function Hero() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const startLearning = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Modern classroom environment" 
          className="w-full h-full object-cover opacity-10" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/90"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-montserrat font-bold text-5xl md:text-7xl lg:text-8xl text-brand-gray mb-6">
            Изучайте<br/>
            <motion.span 
              className="text-brand-red inline-block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Английский
            </motion.span><br/>
            с профессионалами
          </h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-brand-gray/80 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Откройте мир возможностей с нашими инновационными методами обучения. 
            Персональный подход, современные технологии и результат уже через месяц.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.button 
              onClick={startLearning}
              className="bg-brand-red hover:bg-brand-red-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-play mr-2"></i>
              Начать обучение
            </motion.button>
            <motion.button 
              className="border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-video mr-2"></i>
              Смотреть видео
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="text-4xl font-bold text-brand-red mb-2">500+</div>
              <div className="text-brand-gray/70">довольных учеников</div>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <div className="text-4xl font-bold text-brand-red mb-2">15+</div>
              <div className="text-brand-gray/70">опытных преподавателей</div>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <div className="text-4xl font-bold text-brand-red mb-2">95%</div>
              <div className="text-brand-gray/70">успешных выпускников</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <button 
          onClick={scrollToAbout}
          className="text-brand-red hover:text-brand-red-dark transition-colors"
        >
          <i className="fas fa-chevron-down text-2xl"></i>
        </button>
      </motion.div>
    </section>
  );
}
