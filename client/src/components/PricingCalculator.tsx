import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PricingCalculator() {
  const [program, setProgram] = useState("general");
  const [level, setLevel] = useState("beginner");
  const [frequency, setFrequency] = useState(2);
  const [duration, setDuration] = useState(6);

  const basePrices: { [key: string]: number } = {
    'general': 4500,
    'business': 6500,
    'kids': 3800,
    'ielts': 8500,
    'individual': 6000, // per 4 lessons
    'speaking': 2000
  };

  const [pricing, setPricing] = useState({
    monthly: 4500,
    total: 27000,
    discount: 10
  });

  useEffect(() => {
    let basePrice = basePrices[program] || 4500;
    
    // Adjust for frequency (individual lessons calculated differently)
    if (program === 'individual') {
      basePrice = basePrice / 4 * frequency; // Convert to weekly price
    } else {
      basePrice = basePrice * (frequency / 2); // Base price is for 2 lessons per week
    }
    
    const monthly = Math.round(basePrice);
    const total = monthly * duration;
    const discountPercent = duration >= 6 ? 10 : duration >= 3 ? 5 : 0;
    const discountAmount = Math.round(total * discountPercent / 100);
    const finalTotal = total - discountAmount;
    
    setPricing({
      monthly,
      total: finalTotal,
      discount: discountPercent
    });
  }, [program, frequency, duration]);

  const enrollInCourse = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div 
      className="bg-brand-gray-light rounded-2xl p-8 md:p-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h3 className="font-montserrat font-bold text-3xl text-brand-gray text-center mb-8">
        Калькулятор стоимости
      </h3>
      <p className="text-center text-brand-gray/70 mb-8">
        Выберите параметры обучения и узнайте точную стоимость
      </p>
      
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div>
            <label className="block text-sm font-medium text-brand-gray mb-2">Программа</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
            >
              <option value="general">Общий английский</option>
              <option value="business">Бизнес-английский</option>
              <option value="kids">Для детей</option>
              <option value="ielts">Подготовка к IELTS</option>
              <option value="individual">Индивидуальные</option>
              <option value="speaking">Разговорный клуб</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-brand-gray mb-2">Уровень</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="beginner">Начинающий (A1)</option>
              <option value="elementary">Элементарный (A2)</option>
              <option value="intermediate">Средний (B1)</option>
              <option value="upper">Выше среднего (B2)</option>
              <option value="advanced">Продвинутый (C1)</option>
              <option value="proficient">Профессиональный (C2)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-brand-gray mb-2">Занятий в неделю</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
            >
              <option value={1}>1 занятие</option>
              <option value={2}>2 занятия</option>
              <option value={3}>3 занятия</option>
              <option value={4}>4 занятия</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-brand-gray mb-2">Месяцев обучения</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            >
              <option value={1}>1 месяц</option>
              <option value={3}>3 месяца</option>
              <option value={6}>6 месяцев</option>
              <option value={12}>12 месяцев</option>
            </select>
          </div>
          
        </div>
        
        <motion.div 
          className="mt-8 bg-white rounded-xl p-6 shadow-lg"
          key={`${pricing.monthly}-${pricing.total}-${pricing.discount}`}
          initial={{ scale: 0.95, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium text-brand-gray">Стоимость в месяц:</span>
            <span className="text-2xl font-bold text-brand-red">
              {pricing.monthly.toLocaleString('ru-RU')}₽
            </span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium text-brand-gray">Общая стоимость:</span>
            <span className="text-2xl font-bold text-brand-red">
              {pricing.total.toLocaleString('ru-RU')}₽
            </span>
          </div>
          {pricing.discount > 0 && (
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-green-600">Скидка при оплате курса:</span>
              <span className="text-sm font-semibold text-green-600">-{pricing.discount}%</span>
            </div>
          )}
          <motion.button 
            onClick={enrollInCourse}
            className="w-full bg-brand-red hover:bg-brand-red-dark text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="fas fa-credit-card mr-2"></i>
            Записаться на курс
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
