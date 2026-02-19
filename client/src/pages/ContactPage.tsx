import { Mail, Phone, MapPin, Linkedin, Send } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';
import { usePerformanceMonitor } from '../lib/performance';
import { useScrollReveal } from '../lib/useScrollReveal';

export default function ContactPage() {
  const statsReveal = useScrollReveal();
  
  usePerformanceMonitor('ContactPage');
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'vuligittipandu@gmail.com',
      link: 'mailto:vuligittipandu@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 8106809841',
      link: 'tel:+918106809841'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Andhra Pradesh, India'
      // No link for location
    }
  ];

  const social = [
    { 
      icon: Linkedin, 
      name: 'LinkedIn', 
      link: 'https://www.linkedin.com/in/pandurangaswamy-vuligitti/' 
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title="Contact - Get in Touch for DevOps Consulting"
        description="Contact me for AWS cloud consulting, DevOps automation, CI/CD implementation, and infrastructure modernization. 24-hour response time guaranteed."
        keywords="Contact DevOps Engineer, AWS Consulting, Cloud Architecture Consultation"
      />
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Let's Build
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Something Amazing
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have a project in mind? Whether you need cloud architecture consulting,
              DevOps automation, or infrastructure modernization, I'm here to help.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all transform hover:scale-105 hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{info.label}</h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-gray-600 font-medium">{info.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <ContactForm />

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">Or connect with me on social media</p>
            <div className="flex justify-center gap-4">
              {social.map((platform, idx) => (
                <a
                  key={idx}
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 hover:from-blue-500 hover:to-purple-500 rounded-xl flex items-center justify-center transition-all group shadow-md hover:shadow-xl transform hover:scale-110 hover:rotate-6"
                  aria-label={`Visit ${platform.name}`}
                >
                  <platform.icon className="w-7 h-7 text-gray-700 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Send className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Response Time</h2>
          <p className="text-xl text-blue-100 mb-6">
            I typically respond to all inquiries within 24 hours. For urgent matters,
            please mention it in your message.
          </p>
          <div ref={statsReveal.ref} className={`grid md:grid-cols-3 gap-6 mt-8 transition-all duration-1000 ${statsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all transform hover:scale-105">
              <div className="text-4xl font-bold mb-2">24h</div>
              <div className="text-blue-100">Response Time</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all transform hover:scale-105">
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-blue-100">Happy Clients</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all transform hover:scale-105">
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
