import { CheckCircle } from 'lucide-react';
import { useTilt } from '../lib/useTilt';
import type { ComponentType } from 'react';

interface ServiceCardProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  index: number;
}

export default function ServiceCard({ icon: Icon, title, description, features }: ServiceCardProps) {
  const tilt = useTilt();

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.handleMouseMove}
      onMouseLeave={tilt.handleMouseLeave}
      className="relative bg-white rounded-2xl shadow-lg p-8 transition-all border border-gray-100 group overflow-hidden"
      style={{ 
        transform: tilt.transform,
        transition: 'transform 0.1s ease-out, box-shadow 0.3s ease',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity" />
      
      <div className="relative z-10">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
        <div className="grid grid-cols-2 gap-3">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="flex items-center gap-2 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-all"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
