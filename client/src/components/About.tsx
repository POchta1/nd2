import { motion } from "framer-motion";

export default function About() {
  const teachers = [
    {
      name: "Анна Смирнова",
      title: "Старший преподаватель • 8 лет опыта",
      description: "Магистр лингвистики, сертифицированный преподаватель CELTA. Специализируется на бизнес-английском и подготовке к международным экзаменам.",
      tags: ["IELTS", "Business", "CELTA"],
      image: "https://images.unsplash.com/photo-1494790108755-2616b9ad9a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    },
    {
      name: "Майкл Джонсон",
      title: "Носитель языка • 10 лет опыта",
      description: "Носитель английского языка из США, магистр образования. Эксперт в области разговорной практики и американского произношения.",
      tags: ["Speaking", "Pronunciation", "TESOL"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    },
    {
      name: "Елена Волкова",
      title: "Преподаватель • 5 лет опыта",
      description: "Специалист по работе с детьми и подростками. Использует игровые методики и интерактивные технологии в обучении.",
      tags: ["Kids", "Interactive", "YLE"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    }
  ];

  return (
    <section id="about" className="py-20 bg-brand-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-brand-gray mb-6">
            О нашей школе
          </h2>
          <p className="text-xl text-brand-gray/70 max-w-3xl mx-auto">
            Мы создаем уникальную образовательную среду, где каждый студент достигает своих целей в изучении английского языка
          </p>
        </motion.div>
        
        {/* Mission & Values */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="font-montserrat font-semibold text-2xl text-brand-gray mb-4">
                <i className="fas fa-bullseye text-brand-red mr-3"></i>
                Наша миссия
              </h3>
              <p className="text-brand-gray/80 leading-relaxed">
                Мы стремимся сделать изучение английского языка доступным, эффективным и увлекательным процессом. 
                Наша цель — помочь каждому студенту достичь свободного владения языком и открыть новые горизонты в личной и профессиональной жизни.
              </p>
            </div>
            
            <div>
              <h3 className="font-montserrat font-semibold text-2xl text-brand-gray mb-4">
                <i className="fas fa-heart text-brand-red mr-3"></i>
                Наши ценности
              </h3>
              <ul className="space-y-3 text-brand-gray/80">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-brand-red mr-3"></i>
                  Индивидуальный подход к каждому студенту
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-brand-red mr-3"></i>
                  Использование современных методик обучения
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-brand-red mr-3"></i>
                  Создание дружественной атмосферы
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-brand-red mr-3"></i>
                  Постоянное развитие и совершенствование
                </li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
              alt="Students actively participating in English class discussion" 
              className="rounded-xl shadow-lg w-full h-64 object-cover hover-lift" 
            />
            
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
                alt="Modern interactive English classroom with digital learning tools" 
                className="rounded-lg shadow-md w-full h-32 object-cover hover-lift" 
              />
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
                alt="Personal English tutoring session with focused learning" 
                className="rounded-lg shadow-md w-full h-32 object-cover hover-lift" 
              />
            </div>
          </motion.div>
        </div>
        
        {/* Teachers Section */}
        <div>
          <motion.h3 
            className="font-montserrat font-bold text-3xl text-brand-gray text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Наши преподаватели
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher, index) => (
              <motion.div 
                key={teacher.name}
                className="bg-white rounded-xl shadow-lg p-6 hover-lift"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <img 
                  src={teacher.image} 
                  alt={`${teacher.name} - professional English teacher`} 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" 
                />
                <h4 className="font-montserrat font-semibold text-xl text-brand-gray text-center mb-2">
                  {teacher.name}
                </h4>
                <p className="text-brand-red text-center mb-3">{teacher.title}</p>
                <p className="text-brand-gray/70 text-sm text-center leading-relaxed">
                  {teacher.description}
                </p>
                <div className="flex justify-center mt-4 space-x-2">
                  {teacher.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-brand-red/10 text-brand-red px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
