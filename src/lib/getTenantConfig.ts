import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { TenantConfig } from './types';

// In-memory cache for tenant configs (consider Redis for production)
const tenantCache = new Map<string, { config: TenantConfig | null; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export const getTenantConfig = async (slug: string): Promise<TenantConfig | null> => {
  try {
    // Check cache first
    const cached = tenantCache.get(slug);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.config;
    }

    // Fetch from Firestore
    const tenantDoc = await getDoc(doc(db, 'tenants', slug));
    
    if (!tenantDoc.exists()) {
      // Cache the null result to avoid repeated lookups
      tenantCache.set(slug, { config: null, timestamp: Date.now() });
      return null;
    }

    const data = tenantDoc.data();
    const config: TenantConfig = {
      id: tenantDoc.id,
      name: data.name,
      slug: data.slug || tenantDoc.id,
      status: data.status,
      domain: data.domain,
      customDomain: data.customDomain,
      settings: data.settings || {
        branding: {},
        features: {
          customDomain: false,
          advancedReporting: false,
          apiAccess: false,
          prioritySupport: false,
        },
      },
    };

    // Cache the result
    tenantCache.set(slug, { config, timestamp: Date.now() });
    
    return config;
  } catch (error) {
    console.error('Error fetching tenant config:', error);
    return null;
  }
};

export const getTenantByCustomDomain = async (domain: string): Promise<TenantConfig | null> => {
  try {
    // For custom domains, we'd need a separate collection or index
    // For now, we'll iterate through cache or use a Firestore query
    // In production, consider a dedicated collection for domain mappings
    
    // This is a simplified implementation
    // You'd want to create a 'domainMappings' collection for better performance
    const cacheKey = `custom:${domain}`;
    const cached = tenantCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.config;
    }

    // In a real implementation, query a domainMappings collection
    // For now, return null and handle custom domains in the middleware
    return null;
  } catch (error) {
    console.error('Error fetching tenant by custom domain:', error);
    return null;
  }
};

export const clearTenantCache = (slug?: string) => {
  if (slug) {
    tenantCache.delete(slug);
  } else {
    tenantCache.clear();
  }
}; 