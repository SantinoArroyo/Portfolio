// Tipos centralizados para el proyecto

export interface Project {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  category: 'ai' | 'data' | 'speaking' | 'web' | 'mobile';
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  images: string[];
  date?: string;
  duration?: string;
}

export interface Skill {
  name: string;
  level: number;
  color: string;
  category: string;
}

export interface Experience {
  year: string;
  title: string;
  company: string;
  description: string;
  technologies?: string[];
  link?: string;
}

export interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  href: string;
}

export interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}

export interface FilterOption {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface PersonalInfo {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
} 