import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Programs />
      <Testimonials />
      <Blog />
      <FAQ />
      <Contact />
      <Footer />
      
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          className="bg-brand-red hover:bg-brand-red-dark text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          title="Записаться на пробный урок"
          onClick={() => {
            const contactSection = document.getElementById('contact');
            contactSection?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <i className="fas fa-phone text-lg"></i>
        </button>
      </div>
      
      {/* AI ChatBot */}
      <ChatBot />
    </div>
  );
}
