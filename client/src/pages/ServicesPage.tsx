import { Cloud, Server, Award, Shield, Code, Database, Zap, Users, CheckCircle } from 'lucide-react';
import { useRouter } from '../router';
import SEO from '../components/SEO';
import ServiceCard from '../components/ServiceCard';
import { useScrollReveal } from '../lib/useScrollReveal';
import { usePerformanceMonitor } from '../lib/performance';
import analytics from '../lib/analytics';

export default function ServicesPage() {
  const { navigate } = useRouter();
  const processReveal = useScrollReveal();
  
  usePerformanceMonitor('ServicesPage');

  const services = [
    {
      icon: Cloud,
      title: 'AWS Cloud Architecture & Migration',
      description: 'Design, implement, and migrate to scalable, secure, and cost-effective AWS infrastructure.',
      features: [
        'Cloud architecture design and review',
        'Migration from on-premise to AWS',
        'Multi-region and high-availability setups',
        'Cost optimization and right-sizing',
        'AWS Well-Architected Framework review',
        'Disaster recovery planning'
      ],
      technologies: ['EC2', 'ECS', 'EKS', 'Lambda', 'RDS', 'S3', 'CloudFront', 'Route53']
    },
    {
      icon: Server,
      title: 'DevOps & CI/CD Implementation',
      description: 'Automate your software delivery pipeline with modern DevOps practices and tools.',
      features: [
        'CI/CD pipeline design and implementation',
        'Jenkins, GitLab CI, GitHub Actions setup',
        'Automated testing integration',
        'Blue-green and canary deployments',
        'Release automation and rollback strategies',
        'GitOps workflow implementation'
      ],
      technologies: ['Jenkins', 'GitLab CI', 'GitHub Actions', 'ArgoCD', 'Spinnaker']
    },
    {
      icon: Code,
      title: 'Infrastructure as Code (IaC)',
      description: 'Manage and provision infrastructure through code for consistency and reliability.',
      features: [
        'Terraform module development',
        'CloudFormation template creation',
        'Infrastructure automation with Ansible',
        'State management and best practices',
        'Multi-cloud infrastructure support',
        'Infrastructure testing and validation'
      ],
      technologies: ['Terraform', 'CloudFormation', 'Ansible', 'Pulumi']
    },
    {
      icon: Database,
      title: 'Container Orchestration',
      description: 'Deploy and manage containerized applications at scale with Kubernetes and Docker.',
      features: [
        'Kubernetes cluster setup and management',
        'EKS and ECS implementation',
        'Container security and best practices',
        'Service mesh implementation (Istio)',
        'Helm chart development',
        'Container monitoring and logging'
      ],
      technologies: ['Kubernetes', 'Docker', 'ECS', 'EKS', 'Helm', 'Istio']
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Implement security best practices and maintain compliance standards.',
      features: [
        'IAM policies and access management',
        'Security audits and vulnerability scanning',
        'Compliance implementation (SOC2, HIPAA)',
        'Secrets management solutions',
        'Network security and encryption',
        'Security automation with policy-as-code'
      ],
      technologies: ['AWS IAM', 'HashiCorp Vault', 'OPA', 'Trivy', 'Falco']
    },
    {
      icon: Zap,
      title: 'Monitoring & Observability',
      description: 'Gain complete visibility into your infrastructure and applications.',
      features: [
        'Monitoring stack setup (Prometheus, Grafana)',
        'Log aggregation with ELK/EFK stack',
        'Application performance monitoring',
        'Custom dashboards and alerting',
        'Distributed tracing implementation',
        'SRE practices and SLO definition'
      ],
      technologies: ['Prometheus', 'Grafana', 'ELK Stack', 'Datadog', 'New Relic']
    },
    {
      icon: Award,
      title: 'DevOps Training & Consulting',
      description: 'Upskill your team with hands-on training and expert consulting services.',
      features: [
        'AWS and DevOps workshops',
        'Terraform and Kubernetes training',
        'CI/CD best practices sessions',
        'Cloud architecture reviews',
        'DevOps transformation consulting',
        'Custom training programs'
      ],
      technologies: ['AWS', 'Terraform', 'Kubernetes', 'Jenkins', 'Docker']
    },
    {
      icon: Users,
      title: 'Team Augmentation',
      description: 'Extend your team with experienced DevOps engineers for your projects.',
      features: [
        'Dedicated DevOps engineer allocation',
        'Sprint-based project execution',
        'Knowledge transfer and documentation',
        'On-demand DevOps support',
        'Emergency infrastructure support',
        'Long-term partnership options'
      ],
      technologies: ['Full DevOps Stack']
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Assessment',
      description: 'We analyze your current infrastructure, processes, and requirements to create a comprehensive plan.'
    },
    {
      step: '02',
      title: 'Strategy & Planning',
      description: 'Develop a detailed roadmap with milestones, timelines, and resource allocation for your project.'
    },
    {
      step: '03',
      title: 'Implementation',
      description: 'Execute the plan with regular updates, ensuring minimal disruption to your operations.'
    },
    {
      step: '04',
      title: 'Testing & Validation',
      description: 'Comprehensive testing and validation to ensure everything works as expected.'
    },
    {
      step: '05',
      title: 'Documentation & Training',
      description: 'Complete documentation and team training for smooth transition and maintenance.'
    },
    {
      step: '06',
      title: 'Support & Optimization',
      description: 'Ongoing support and continuous optimization to ensure peak performance.'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title="Services - Professional DevOps & Cloud Solutions"
        description="Expert AWS cloud architecture, CI/CD implementation, Kubernetes, Terraform IaC, monitoring, and DevOps consulting services."
        keywords="AWS Services, DevOps Consulting, CI/CD, Kubernetes, Terraform, Cloud Migration"
      />
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Professional
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DevOps Services
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Comprehensive cloud and DevOps solutions tailored to your business needs.
            From architecture design to implementation and support.
          </p>
          <button
            onClick={() => {
              analytics.trackButtonClick('Services - Free Consultation');
              navigate('/contact');
            }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
            aria-label="Get a free consultation"
          >
            Get a Free Consultation
          </button>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">What I Offer</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">How I Work</h2>
          <div ref={processReveal.ref} className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${processReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {process.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg relative">
                <div className="text-6xl font-bold text-blue-100 absolute top-4 right-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed relative z-10">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-12">
            Let's discuss your project and build a solution that scales with your business.
          </p>
          <button
            onClick={() => {
              analytics.trackButtonClick('Services - Schedule Consultation');
              navigate('/contact');
            }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg text-lg"
            aria-label="Schedule a free consultation"
          >
            Schedule a Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
