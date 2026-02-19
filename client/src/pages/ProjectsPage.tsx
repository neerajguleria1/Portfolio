import { TrendingUp, Users, Clock } from 'lucide-react';
import { useRouter } from '../router';
import SEO from '../components/SEO';
import { useScrollReveal } from '../lib/useScrollReveal';
import { usePerformanceMonitor } from '../lib/performance';
import analytics from '../lib/analytics';

export default function ProjectsPage() {
  const { navigate } = useRouter();
  const projectsReveal = useScrollReveal();
  
  usePerformanceMonitor('ProjectsPage');

  const projects = [
    {
      title: 'E-Commerce Platform Migration to AWS ECS',
      client: 'RetailCorp',
      description: 'Migrated a monolithic e-commerce application to microservices architecture on AWS ECS with complete CI/CD automation.',
      challenge: 'Legacy monolithic application causing scalability issues and long deployment times',
      solution: 'Containerized services, implemented ECS Fargate, automated deployments with Jenkins, and set up comprehensive monitoring',
      results: [
        '99.99% uptime achieved',
        '60% reduction in infrastructure costs',
        'Deployment time reduced from hours to minutes',
        'Auto-scaling handling 10x traffic spikes'
      ],
      technologies: ['AWS ECS', 'Terraform', 'Docker', 'Jenkins', 'CloudWatch', 'RDS'],
      image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1200',
      duration: '4 months',
      team: '3 DevOps Engineers'
    },
    {
      title: 'Kubernetes Infrastructure for Fintech Startup',
      client: 'FinPay Solutions',
      description: 'Built production-ready Kubernetes infrastructure on AWS EKS with complete observability and security compliance.',
      challenge: 'Need for highly available, secure, and compliant infrastructure for financial services',
      solution: 'Deployed EKS cluster with Istio service mesh, implemented GitOps with ArgoCD, integrated with HashiCorp Vault for secrets',
      results: [
        'SOC2 and PCI-DSS compliance achieved',
        'Zero-downtime deployments',
        'Sub-second API response times',
        '99.95% service availability'
      ],
      technologies: ['AWS EKS', 'Kubernetes', 'Istio', 'ArgoCD', 'Vault', 'Prometheus', 'Grafana'],
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      duration: '6 months',
      team: '5 Engineers'
    },
    {
      title: 'Multi-Cloud Terraform Infrastructure',
      client: 'TechGlobal Inc',
      description: 'Designed and implemented multi-cloud infrastructure using Terraform for disaster recovery and vendor lock-in prevention.',
      challenge: 'Vendor lock-in concerns and need for disaster recovery across cloud providers',
      solution: 'Created reusable Terraform modules for AWS and GCP, implemented state management, automated compliance scanning',
      results: [
        'Infrastructure as Code adoption',
        'Deployment across 3 cloud providers',
        '95% infrastructure automation',
        'RTO reduced to under 15 minutes'
      ],
      technologies: ['Terraform', 'AWS', 'GCP', 'Atlantis', 'Sentinel', 'GitHub Actions'],
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200',
      duration: '5 months',
      team: '4 Engineers'
    },
    {
      title: 'CI/CD Pipeline Modernization',
      client: 'SaaS Platform',
      description: 'Modernized legacy CI/CD pipeline, implementing trunk-based development and automated testing strategies.',
      challenge: 'Slow release cycles, frequent production issues, manual testing bottlenecks',
      solution: 'Implemented GitLab CI, automated testing pyramid, feature flags, and progressive delivery',
      results: [
        'Release frequency: weekly to daily',
        'Lead time reduced by 80%',
        'Production incidents down 65%',
        'Developer satisfaction up 40%'
      ],
      technologies: ['GitLab CI', 'Docker', 'Kubernetes', 'LaunchDarkly', 'Selenium'],
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1200',
      duration: '3 months',
      team: '2 DevOps Engineers'
    },
    {
      title: 'Observability Stack Implementation',
      client: 'HealthTech Startup',
      description: 'Implemented comprehensive monitoring, logging, and tracing for microservices architecture.',
      challenge: 'Lack of visibility into system performance and difficulty troubleshooting issues',
      solution: 'Deployed Prometheus/Grafana stack, ELK for log aggregation, Jaeger for distributed tracing',
      results: [
        'MTTR reduced by 70%',
        'Proactive issue detection',
        'Custom SLI/SLO dashboards',
        'Cost optimization insights'
      ],
      technologies: ['Prometheus', 'Grafana', 'ELK Stack', 'Jaeger', 'CloudWatch'],
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
      duration: '2 months',
      team: '2 Engineers'
    },
    {
      title: 'Serverless Architecture Migration',
      client: 'Media Company',
      description: 'Migrated event-driven workloads to AWS Lambda and Step Functions for cost efficiency.',
      challenge: 'High infrastructure costs for sporadic, event-driven workloads',
      solution: 'Refactored to serverless architecture using Lambda, API Gateway, DynamoDB, and Step Functions',
      results: [
        '85% cost reduction',
        'Infinite scalability achieved',
        'Zero server management',
        'Sub-100ms API latency'
      ],
      technologies: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'Step Functions', 'EventBridge'],
      image: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=1200',
      duration: '4 months',
      team: '3 Engineers'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title="Projects - Real-World DevOps Case Studies"
        description="Explore successful cloud migration, Kubernetes deployment, CI/CD automation, and infrastructure projects. Real results from AWS, Terraform, and DevOps implementations."
        keywords="DevOps Projects, Cloud Migration, Kubernetes Case Studies, AWS Projects, Terraform Infrastructure"
      />
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Project
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Case Studies
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-world projects showcasing cloud transformation, DevOps automation,
            and infrastructure excellence.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div ref={projectsReveal.ref} className={`max-w-7xl mx-auto space-y-16 transition-all duration-1000 ${projectsReveal.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {projects.map((project, index) => (
            <div
              key={index}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'md:grid-flow-dense' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              </div>

              <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                  {project.client}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h2>
                <p className="text-gray-600 text-lg mb-6">{project.description}</p>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Challenge:</h4>
                    <p className="text-gray-600">{project.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Solution:</h4>
                    <p className="text-gray-600">{project.solution}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 mb-6">
                  <h4 className="font-bold text-gray-900 mb-3">Results:</h4>
                  <ul className="space-y-2">
                    {project.results.map((result, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700">
                        <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{project.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{project.team}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Start Your Project</h2>
          <p className="text-xl text-gray-600 mb-12">
            Ready to transform your infrastructure? Let's discuss your requirements
            and build a solution that scales.
          </p>
          <button
            onClick={() => {
              analytics.trackButtonClick('Projects - Schedule Consultation');
              navigate('/contact');
            }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg text-lg"
            aria-label="Schedule a consultation"
          >
            Schedule a Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
