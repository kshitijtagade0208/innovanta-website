export interface Pillar {
  tag: string;
  title: string;
  description: string;
}

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role?: string;
  bio?: string;
  createdAt: string;
  avatarColor?: string;
}

