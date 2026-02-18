import { Mail, Phone, MapPin, Linkedin, Send } from 'lucide-react';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
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
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto">
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
              <div key={idx} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
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
                  className="w-12 h-12 bg-gray-100 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 rounded-lg flex items-center justify-center transition-all group"
                >
                  <platform.icon className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Send className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Response Time</h2>
          <p className="text-xl text-blue-100 mb-6">
            I typically respond to all inquiries within 24 hours. For urgent matters,
            please mention it in your message.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">24h</div>
              <div className="text-blue-100">Response Time</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-blue-100">Happy Clients</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
