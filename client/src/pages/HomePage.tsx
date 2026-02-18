import { useEffect, useState } from 'react';
import {
  ArrowRight, Cloud, Server, Award, TrendingUp, Users,
  CheckCircle, Code, Database, Shield
} from 'lucide-react';
import { useRouter } from '../router';

const API = import.meta.env.VITE_API_URL;

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  cover_image?: string;
  date: string;
  tags?: string[];
}

export default function HomePage() {
  const { navigate } = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  const fetchLatestBlogs = async () => {
    try {
      const res = await fetch(`${API}`);
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs.slice(0, 3));
      }
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    }
  };

  const stats = [
    { icon: Users, label: 'Happy Clients', value: '150+' },
    { icon: Code, label: 'Projects Delivered', value: '200+' },
    { icon: Award, label: 'Years Experience', value: '3+' },
    { icon: TrendingUp, label: 'Success Rate', value: '99%' },
  ];

  const services = [
    {
      icon: Cloud,
      title: 'AWS Cloud Architecture',
      description: 'Design and implement scalable, secure, and cost-effective cloud solutions on AWS.',
      features: ['EC2, ECS, EKS', 'Lambda & Serverless', 'VPC & Networking', 'Cost Optimization']
    },
    {
      icon: Server,
      title: 'DevOps & CI/CD',
      description: 'Automate your deployment pipeline with industry-leading DevOps practices.',
      features: ['Jenkins & GitLab CI', 'Docker & Kubernetes', 'Infrastructure as Code', 'Monitoring & Logging']
    },
    {
      icon: Database,
      title: 'Infrastructure as Code',
      description: 'Manage your infrastructure efficiently with Terraform and CloudFormation.',
      features: ['Terraform Modules', 'State Management', 'Multi-Cloud Support', 'Best Practices']
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Implement security best practices and maintain compliance standards.',
      features: ['IAM Policies', 'Security Audits', 'Compliance (SOC2, HIPAA)', 'Encryption & Secrets']
    },
  ];

  const technologies = [
    'AWS', 'Terraform', 'Kubernetes', 'Docker', 'Jenkins', 'Python',
    'GitLab', 'Ansible', 'Prometheus', 'Grafana', 'ELK Stack', 'CloudFormation'
  ];

  return (
    <div className="min-h-screen">
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  🚀 Cloud & DevOps Expert
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Your
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                  Cloud Infrastructure
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Building scalable, secure, and automated cloud solutions with AWS, Terraform,
                and modern DevOps practices. Let's accelerate your digital transformation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <button
                  onClick={() => navigate('/contact')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/projects')}
                  className="px-8 py-4 bg-white text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-all shadow-md border-2 border-gray-200 flex items-center justify-center gap-2"
                >
                  View Case Studies
                </button>
              </div>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {technologies.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg text-sm font-medium text-gray-700 shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <img
                src="/AQNxjHx8IfFv6ByqZgXTsTo-u0EJh3kKRvB_z7I0Mf1R6rJSQ_V9HjkWT-wQq67sA7DRjqSrDGB1p1LYf8sV4FxYNrpPjzIHWkT3JzeRG2AkxnEuWDW5hyHjN3rO_kM.jpeg"
                alt="DevOps Expert"
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl object-cover shadow-2xl border-8 border-white transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
                <div className="text-white text-center">
                  <div className="text-3xl font-bold">3+</div>
                  <div className="text-xs">Years Exp</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase">Services</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
              Comprehensive Cloud Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From architecture design to deployment automation, I provide end-to-end cloud and DevOps services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all border border-gray-100 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/services')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            >
              View All Services
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {blogs.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase">Blog</span>
                <h2 className="text-4xl font-bold text-gray-900 mt-2">Latest Insights</h2>
              </div>
              <button
                onClick={() => navigate('/blog')}
                className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2"
              >
                View All Posts
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  onClick={() => navigate(`/blog/${blog._id}`)}
                  className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden cursor-pointer"
                >
                  <img
                    src={blog.cover_image || '/placeholder.jpg'}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{blog.title}</h3>
                    <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Infrastructure?</h2>
          <p className="text-xl text-gray-600 mb-8">Let's discuss how I can help you achieve your cloud goals.</p>
          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
          >
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
}
