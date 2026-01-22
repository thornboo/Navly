import { CategoryType } from './integration';

export interface Category {
  id: CategoryType;
  name: string;
  description?: string;
  icon?: string;
  order: number;
  enabled: boolean;
}
