import { useState } from 'react';
import { Send, Mail, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error: insertError } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email,
          name,
          subscribed: true
        });

      if (insertError) {
        if (insertError.code === '23505') {
          setError('This email is already subscribed!');
        } else {
          throw insertError;
        }
        return;
      }

      setSuccess(true);
      setEmail('');
      setName('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to subscribe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-bold">Stay Updated</h3>
        </div>

        <p className="text-blue-100 text-lg mb-8 max-w-2xl">
          Get the latest insights on AWS, DevOps, Terraform, and cloud architecture delivered straight to your inbox.
          Join 1,000+ professionals staying ahead in cloud technology.
        </p>

        {success ? (
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-6">
            <CheckCircle className="w-8 h-8 text-green-300" />
            <div>
              <h4 className="font-bold text-lg">Successfully Subscribed!</h4>
              <p className="text-blue-100">Check your inbox for a confirmation email.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl disabled:bg-gray-300 whitespace-nowrap flex items-center justify-center gap-2"
            >
              {loading ? (
                'Subscribing...'
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Subscribe
                </>
              )}
            </button>
          </form>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-400/30 rounded-lg text-red-100">
            {error}
          </div>
        )}

        <p className="text-blue-200 text-sm mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
