import { Code, Mail, Linkedin, Github, Twitter, ArrowUp } from 'lucide-react';
import { useRouter } from '../router';
import { useState, useEffect } from 'react';
import analytics from '../lib/analytics';

export default function Footer() {
  const { navigate } = useRouter();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    analytics.trackEvent('scroll_to_top', 'Navigation', 'Footer Button');
  };

  const footerLinks = {
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Projects', path: '/projects' },
      { name: 'Services', path: '/services' },
      { name: 'Contact', path: '/contact' },
    ],
    Resources: [
      { name: 'Blog', path: '/blog' },
      { name: 'Case Studies', path: '/projects' },
      { name: 'Testimonials', path: '/#testimonials' },
      { name: 'FAQ', path: '/about' },
    ],
    Services: [
      { name: 'AWS Consulting', path: '/services' },
      { name: 'DevOps Setup', path: '/services' },
      { name: 'Cloud Migration', path: '/services' },
      { name: 'Training', path: '/services' },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4 group cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Code className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold">CloudDevOps</span>
                <p className="text-sm text-gray-400">Expert Solutions</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming businesses with cutting-edge cloud infrastructure and DevOps automation.
              Building scalable, secure, and efficient solutions.
            </p>
            <div className="flex gap-3 sm:gap-4 flex-wrap justify-center sm:justify-start">
              <a
                href="https://www.linkedin.com/in/pandurangaswamy-vuligitti/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.trackEvent('social_click', 'Footer', 'LinkedIn')}
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                aria-label="Visit LinkedIn profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.trackEvent('social_click', 'Footer', 'GitHub')}
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                aria-label="Visit GitHub profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.trackEvent('social_click', 'Footer', 'Twitter')}
                className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                aria-label="Visit Twitter profile"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:vuligittipandu@gmail.com"
                onClick={() => analytics.trackEvent('email_click', 'Footer', 'Email')}
                className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                aria-label="Send email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold text-lg mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => {
                        analytics.trackEvent('footer_link_click', 'Footer', link.name);
                        navigate(link.path);
                      }}
                      className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                      aria-label={`Navigate to ${link.name}`}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} CloudDevOps. Developed by Neeraj Guleria. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-gray-400 justify-center">
            <button 
              className="hover:text-white transition-colors"
              onClick={() => analytics.trackEvent('footer_policy_click', 'Footer', 'Privacy')}
              aria-label="View privacy policy"
            >
              Privacy Policy
            </button>
            <button 
              className="hover:text-white transition-colors"
              onClick={() => analytics.trackEvent('footer_policy_click', 'Footer', 'Terms')}
              aria-label="View terms of service"
            >
              Terms of Service
            </button>
            <button 
              className="hover:text-white transition-colors"
              onClick={() => analytics.trackEvent('footer_policy_click', 'Footer', 'Cookie')}
              aria-label="View cookie policy"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center group hover:scale-110 animate-fade-in z-50 touch-manipulation"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-y-1 transition-transform" />
          <span className="hidden sm:block absolute -top-12 bg-gray-900 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Back to top
          </span>
        </button>
      )}
    </footer>
  );
}
