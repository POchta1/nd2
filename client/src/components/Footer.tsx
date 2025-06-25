export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-gray text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <i className="fas fa-graduation-cap text-brand-red text-2xl mr-3"></i>
              <span className="font-montserrat font-bold text-xl">Школа Английского</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Мы помогаем людям осваивать английский язык уже более 10 лет. 
              Наша миссия — сделать изучение языка доступным и эффективным для каждого.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-brand-red text-white rounded-lg flex items-center justify-center transition-all duration-300">
                <i className="fab fa-vk"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-brand-red text-white rounded-lg flex items-center justify-center transition-all duration-300">
                <i className="fab fa-telegram"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-brand-red text-white rounded-lg flex items-center justify-center transition-all duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-brand-red text-white rounded-lg flex items-center justify-center transition-all duration-300">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-6">Быстрые ссылки</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-brand-red transition-colors"
                >
                  О школе
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('programs')}
                  className="text-gray-300 hover:text-brand-red transition-colors"
                >
                  Программы
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="text-gray-300 hover:text-brand-red transition-colors"
                >
                  Отзывы
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('blog')}
                  className="text-gray-300 hover:text-brand-red transition-colors"
                >
                  Блог
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('faq')}
                  className="text-gray-300 hover:text-brand-red transition-colors"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-brand-red transition-colors"
                >
                  Контакты
                </button>
              </li>
            </ul>
          </div>
          
          {/* Programs */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-6">Программы обучения</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-brand-red transition-colors">Общий английский</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-red transition-colors">Бизнес-английский</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-red transition-colors">Английский для детей</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-red transition-colors">Подготовка к IELTS</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-red transition-colors">Индивидуальные занятия</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-red transition-colors">Разговорный клуб</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-6">Контакты</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <i className="fas fa-map-marker-alt text-brand-red mt-1 mr-3"></i>
                <span className="text-gray-300 text-sm">
                  г. Москва, ул. Тверская, 15<br/>
                  БЦ "Центральный", офис 412
                </span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone text-brand-red mr-3"></i>
                <a href="tel:+74951234567" className="text-gray-300 hover:text-brand-red transition-colors">
                  +7 (495) 123-45-67
                </a>
              </div>
              <div className="flex items-center">
                <i className="fas fa-envelope text-brand-red mr-3"></i>
                <a href="mailto:info@englishschool.ru" className="text-gray-300 hover:text-brand-red transition-colors">
                  info@englishschool.ru
                </a>
              </div>
              <div className="flex items-start">
                <i className="fas fa-clock text-brand-red mt-1 mr-3"></i>
                <span className="text-gray-300 text-sm">
                  Пн-Пт: 9:00 - 21:00<br/>Сб-Вс: 10:00 - 18:00
                </span>
              </div>
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Школа Английского. Все права защищены.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-brand-red transition-colors">Политика конфиденциальности</a>
              <a href="#" className="text-gray-400 hover:text-brand-red transition-colors">Пользовательское соглашение</a>
              <a href="#" className="text-gray-400 hover:text-brand-red transition-colors">Карта сайта</a>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
