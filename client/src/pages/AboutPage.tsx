import { Award } from 'lucide-react';
import { useRouter } from '../router';
import SEO from '../components/SEO';
import { useScrollReveal } from '../lib/useScrollReveal';
import { usePerformanceMonitor } from '../lib/performance';
import analytics from '../lib/analytics';

export default function AboutPage() {
  const { navigate } = useRouter();
  const experienceReveal = useScrollReveal();
  const skillsReveal = useScrollReveal();
  const certsReveal = useScrollReveal();
  
  usePerformanceMonitor('AboutPage');

  const skills = [
    { category: 'Cloud Platforms', items: ['AWS (EC2, S3, VPC, RDS, ELB)', 'Route 53, IAM, CloudFront', 'CloudWatch, ECR, ECS'] },
    { category: 'Infrastructure as Code', items: ['Terraform', 'Ansible', 'Ansible Tower'] },
    { category: 'CI/CD Tools', items: ['Jenkins', 'GitHub Actions', 'AWS CodePipeline', 'CodeBuild, CodeDeploy'] },
    { category: 'Containerization', items: ['Docker', 'Kubernetes', 'Helm', 'ECS/Fargate'] },
    { category: 'Monitoring & Security', items: ['Prometheus', 'Grafana', 'CloudWatch', 'SonarQube, Trivy'] },
    { category: 'Databases & Scripting', items: ['MySQL', 'PostgreSQL', 'Shell Scripting', 'Python'] },
  ];

  const certifications = [
    { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: '2023' },
    { name: 'AWS Certified Developer Associate', issuer: 'Amazon Web Services', year: '2024' },
    { name: 'HashiCorp Certified: Terraform Associate (003)', issuer: 'HashiCorp', year: '2024' },
  ];

  const experience = [
    {
      title: 'DevOps Engineer',
      company: 'Advent Global Solutions Pvt. Ltd',
      period: 'July 2023 - Sep 2025',
      description: 'Designed and deployed AWS cloud infrastructure with automated CI/CD pipelines using Jenkins, Docker, and Kubernetes. Built Infrastructure as Code with Terraform, deployed microservices with 99.9% uptime using Helm charts, and implemented comprehensive monitoring with CloudWatch, Prometheus, and Grafana. Reduced deployment time by 40% through automation.',
      highlights: [
        'Automated deployments with Jenkins, reducing deployment time by 40%',
        'Deployed microservices on Kubernetes with 99.9% uptime using Helm',
        'Built modular Terraform infrastructure enabling scalable deployments',
        'Implemented security scanning with Trivy and code quality checks with SonarQube'
      ]
    },
    {
      title: 'AWS Trainer',
      company: 'Freelance / Training Institute',
      period: 'Oct 2022 - Present',
      description: 'Conducting AWS training sessions for students and professionals, covering fundamental to advanced cloud concepts. Designed hands-on labs on EC2, VPC, IAM, S3, RDS, and other AWS services. Mentored learners on real-time projects and guided them towards AWS certifications.',
      highlights: [
        'Delivered comprehensive AWS training from fundamentals to advanced topics',
        'Created hands-on labs covering EC2, VPC, IAM, S3, and RDS',
        'Mentored students toward AWS and Terraform certifications',
        'Developed training materials and practical assignments'
      ]
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title="About - CloudDevOps Expert | AWS & DevOps Engineer"
        description="Certified AWS & DevOps Engineer with 3+ years experience in cloud infrastructure, CI/CD, and automation. AWS Certified Developer & Terraform Associate."
        keywords="AWS Engineer, DevOps Expert, Cloud Architect, Terraform, Kubernetes"
      />
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                About Me
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                I'm a Certified AWS & DevOps Engineer with 3+ years of hands-on experience in designing
                and managing cloud infrastructure, implementing CI/CD pipelines, automating deployments,
                and containerizing applications.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Skilled in a wide range of AWS services and DevOps tools, with strong expertise in
                Infrastructure as Code (IaC) using Terraform, Kubernetes-based container orchestration,
                and end-to-end monitoring and alerting solutions. I deliver scalable, secure, and
                cost-effective cloud solutions in fast-paced Agile environments.
              </p>
              <button
                onClick={() => {
                  analytics.trackButtonClick('About - Lets Work Together');
                  navigate('/contact');
                }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
                aria-label="Contact us to work together"
              >
                Let's Work Together
              </button>
            </div>
            <div className="relative">
              <img
                src="/AQNxjHx8IfFv6ByqZgXTsTo-u0EJh3kKRvB_z7I0Mf1R6rJSQ_V9HjkWT-wQq67sA7DRjqSrDGB1p1LYf8sV4FxYNrpPjzIHWkT3JzeRG2AkxnEuWDW5hyHjN3rO_kM.jpeg"
                alt="Profile"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Experience</h2>
          <div ref={experienceReveal.ref} className={`space-y-8 transition-all duration-1000 ${experienceReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {experience.map((exp, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 border-l-4 border-blue-600">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{exp.title}</h3>
                    <p className="text-lg text-blue-600 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-gray-600 font-medium">{exp.period}</span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">{exp.description}</p>
                {exp.highlights && (
                  <ul className="space-y-2 mt-4">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Technical Skills</h2>
          <div ref={skillsReveal.ref} className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${skillsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {skills.map((skill, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{skill.category}</h3>
                <ul className="space-y-2">
                  {skill.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Certifications</h2>
          <div ref={certsReveal.ref} className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${certsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {certifications.map((cert, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-sky-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.name}</h3>
                    <p className="text-gray-600 text-sm">{cert.issuer}</p>
                    <p className="text-sm text-gray-500 mt-1">{cert.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
