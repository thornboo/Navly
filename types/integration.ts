export type CategoryType =
  | 'all'
  | 'devtools'
  | 'messaging'
  | 'monitoring'
  | 'productivity'
  | 'security'
  | 'searching';

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
  category: CategoryType;
  featured: boolean;
  tags: string[];
  backgroundColor?: string;
  createdAt: string;
  updatedAt: string;
  order?: number;
  enabled: boolean;
}
