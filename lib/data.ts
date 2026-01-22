import { Integration, Category } from '@/types';
import { supabase } from './supabase';

type IntegrationRow = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  url: string;
  category: Integration['category'];
  featured: boolean | null;
  tags: string[] | null;
  background_color: string | null;
  created_at: string;
  updated_at: string;
  order_weight: number | null;
  enabled: boolean;
};

type CategoryRow = {
  id: Category['id'];
  name: string;
  description: string | null;
  icon: string | null;
  order_weight: number;
  enabled: boolean;
};

const mapIntegrationRow = (item: IntegrationRow): Integration => ({
  id: item.id,
  name: item.name,
  description: item.description ?? '',
  icon: item.icon ?? '',
  url: item.url,
  category: item.category,
  featured: item.featured ?? false,
  tags: item.tags ?? [],
  backgroundColor: item.background_color ?? undefined,
  createdAt: item.created_at,
  updatedAt: item.updated_at,
  order: item.order_weight ?? undefined,
  enabled: item.enabled,
});

export async function getIntegrations(): Promise<Integration[]> {
  const { data, error } = await supabase
    .from('integrations')
    .select('*')
    .eq('enabled', true)
    .order('order_weight', { ascending: false });

  if (error) {
    console.error('Error fetching integrations:', error);
    return [];
  }

  return (data as IntegrationRow[] | null)?.map(mapIntegrationRow) ?? [];
}

export async function getIntegrationsByCategory(category: string): Promise<Integration[]> {
  if (category === 'all') {
    return getIntegrations();
  }

  const { data, error } = await supabase
    .from('integrations')
    .select('*')
    .eq('enabled', true)
    .eq('category', category)
    .order('order_weight', { ascending: false });

  if (error) {
    console.error('Error fetching integrations by category:', error);
    return [];
  }

  return (data as IntegrationRow[] | null)?.map(mapIntegrationRow) ?? [];
}

export async function getFeaturedIntegrations(): Promise<Integration[]> {
  const { data, error } = await supabase
    .from('integrations')
    .select('*')
    .eq('enabled', true)
    .eq('featured', true)
    .order('order_weight', { ascending: false });

  if (error) {
    console.error('Error fetching featured integrations:', error);
    return [];
  }

  return (data as IntegrationRow[] | null)?.map(mapIntegrationRow) ?? [];
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('enabled', true)
    .order('order_weight', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return (
    (data as CategoryRow[] | null)?.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description ?? undefined,
      icon: item.icon ?? undefined,
      order: item.order_weight,
      enabled: item.enabled,
    })) ?? []
  );
}

export async function searchIntegrations(query: string): Promise<Integration[]> {
  const lowerQuery = query.toLowerCase();

  const { data, error } = await supabase
    .from('integrations')
    .select('*')
    .eq('enabled', true)
    .or(`name.ilike.%${lowerQuery}%,description.ilike.%${lowerQuery}%`)
    .order('order_weight', { ascending: false });

  if (error) {
    console.error('Error searching integrations:', error);
    return [];
  }

  return (data as IntegrationRow[] | null)?.map(mapIntegrationRow) ?? [];
}
