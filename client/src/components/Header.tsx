import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const openTrialModal = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/98 backdrop-blur-sm shadow-lg' : 'bg-white/95 backdrop-blur-sm shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="font-montserrat font-bold text-2xl text-brand-red">
                <i className="fas fa-graduation-cap mr-2"></i>
                Школа Английского
              </span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('hero')}
                className="px-3 py-2 text-sm font-medium hover:text-brand-red transition-colors"
              >
                Главная
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="px-3 py-2 text-sm font-medium hover:text-brand-red transition-colors"
              >
                О школе
              </button>
              <button 
                onClick={() => scrollToSection('programs')}
                className="px-3 py-2 text-sm font-medium hover:text-brand-red transition-colors"
              >
                Программы
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="px-3 py-2 text-sm font-medium hover:text-brand-red transition-colors"
              >
                Отзывы
              </button>
              <button 
                onClick={() => scrollToSection('blog')}
                className="px-3 py-2 text-sm font-medium hover:text-brand-red transition-colors"
              >
                Блог
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-3 py-2 text-sm font-medium hover:text-brand-red transition-colors"
              >
                Контакты
              </button>
            </div>
          </div>
          
          <div className="hidden md:block">
            <button 
              onClick={openTrialModal}
              className="bg-brand-red hover:bg-brand-red-dark text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
            >
              Пробный урок
            </button>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => scrollToSection('hero')}
              className="block w-full text-left px-3 py-2 text-base font-medium hover:text-brand-red"
            >
              Главная
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-3 py-2 text-base font-medium hover:text-brand-red"
            >
              О школе
            </button>
            <button 
              onClick={() => scrollToSection('programs')}
              className="block w-full text-left px-3 py-2 text-base font-medium hover:text-brand-red"
            >
              Программы
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="block w-full text-left px-3 py-2 text-base font-medium hover:text-brand-red"
            >
              Отзывы
            </button>
            <button 
              onClick={() => scrollToSection('blog')}
              className="block w-full text-left px-3 py-2 text-base font-medium hover:text-brand-red"
            >
              Блог
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-3 py-2 text-base font-medium hover:text-brand-red"
            >
              Контакты
            </button>
            <button 
              onClick={openTrialModal}
              className="w-full mt-4 bg-brand-red text-white px-6 py-2 rounded-lg font-medium"
            >
              Пробный урок
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
