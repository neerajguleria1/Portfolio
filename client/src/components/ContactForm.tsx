import { useState } from 'react';
import { Send, Mail, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import toast from "react-hot-toast";
import analytics from '../lib/analytics';
import { useDebounce } from '../lib/useDebounce';

const CONTACT_API = import.meta.env.VITE_CONTACT_API_URL;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    service_type: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : '';
      case 'message':
        return value.length < 10 ? 'Message must be at least 10 characters' : '';
      case 'service_type':
        return !value ? 'Please select a service' : '';
      default:
        return '';
    }
  };

  const debouncedValidate = useDebounce((name: string, value: string) => {
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, 300);

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      debouncedValidate(name, value);
    }
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, message: true, service_type: true });
      toast.error('Please fix the errors before submitting');
      return;
    }

    setLoading(true);
    analytics.trackFormSubmit('Contact Form');

    try {
      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to send message");

      toast.success("✅ Message sent successfully! I'll get back to you within 24 hours.");
      analytics.trackEvent('form_success', 'Contact', 'Form Submitted');
      
      setFormData({ name: "", email: "", message: "", service_type: "" });
      setErrors({});
      setTouched({});
    } 
    catch (err: any) {
      toast.error(err?.message || "❌ Failed to send message. Please try again.");
      analytics.trackError(err, 'ContactForm.handleSubmit');
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto border border-gray-100">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">Get In Touch</h3>
        <p className="text-gray-600">
          Have a project in mind? Let's discuss how I can help you!
        </p>
        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>Response within 24 hours</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-1" /> Your Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.name && touched.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="John Doe"
            aria-label="Your name"
            aria-invalid={!!errors.name && touched.name}
          />
          {errors.name && touched.name && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-1" /> Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="john@example.com"
            aria-label="Your email"
            aria-invalid={!!errors.email && touched.email}
          />
          {errors.email && touched.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Type *
          </label>
          <select
            value={formData.service_type}
            onChange={(e) => handleChange('service_type', e.target.value)}
            onBlur={() => handleBlur('service_type')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.service_type && touched.service_type ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-label="Select service type"
            aria-invalid={!!errors.service_type && touched.service_type}
          >
            <option value="">Select a service</option>
            <option value="consulting">AWS Consulting</option>
            <option value="training">DevOps Training</option>
            <option value="devops">CI/CD Setup</option>
            <option value="aws">Cloud Architecture</option>
            <option value="kubernetes">Kubernetes Implementation</option>
            <option value="terraform">Infrastructure as Code</option>
            <option value="freelance">Freelance Project</option>
            <option value="hiring">Hiring Inquiry</option>
          </select>
          {errors.service_type && touched.service_type && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.service_type}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MessageSquare className="w-4 h-4 inline mr-1" /> Message *
          </label>
          <textarea
            required
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            onBlur={() => handleBlur('message')}
            rows={5}
            maxLength={500}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
              errors.message && touched.message ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Tell me about your project requirements, timeline, and budget..."
            aria-label="Your message"
            aria-invalid={!!errors.message && touched.message}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.message && touched.message ? (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.message}
              </p>
            ) : (
              <p className="text-sm text-gray-500">
                {formData.message.length} / 500 characters
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || Object.values(errors).some(e => e)}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
          aria-label="Send message"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" /> Send Message
            </>
          )}
        </button>

      </form>
    </div>
  );
}
