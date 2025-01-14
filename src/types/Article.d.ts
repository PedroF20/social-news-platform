export interface Article {
  id: number;
  title: string;
  description: string;
  image?: string;
  category: 'Engineering' | 'Design' | 'Marketing';
  content: string;
  published: boolean;
}
