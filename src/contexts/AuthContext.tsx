'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { AuthUser, TenantConfig, User } from '@/lib/types';

interface AuthContextType {
  user: AuthUser | null;
  userProfile: User | null;
  tenant: TenantConfig | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
  initialTenant?: TenantConfig;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ 
  children, 
  initialTenant 
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [tenant, setTenant] = useState<TenantConfig | null>(initialTenant || null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (uid: string, tenantId?: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        setUserProfile(userData);
        
        // If we don't have tenant info from headers, get it from user profile
        if (!tenant && userData.tenantId) {
          // We could fetch tenant info here, but for now we'll rely on middleware
        }
        
        return userData;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
    return null;
  };

  const refreshUser = async () => {
    if (user?.uid) {
      await fetchUserProfile(user.uid, user.tenantId);
    }
  };

  // Initialize tenant info from headers (runs once on mount)
  useEffect(() => {
    if (typeof window !== 'undefined' && !tenant) {
      const tenantId = document.querySelector('meta[name="x-tenant-id"]')?.getAttribute('content');
      const tenantName = document.querySelector('meta[name="x-tenant-name"]')?.getAttribute('content');
      const tenantConfig = document.querySelector('meta[name="x-tenant-config"]')?.getAttribute('content');
      
      if (tenantConfig) {
        try {
          setTenant(JSON.parse(tenantConfig));
        } catch (error) {
          console.error('Error parsing tenant config:', error);
        }
      } else if (tenantId && tenantName) {
        setTenant({
          id: tenantId,
          name: tenantName,
          slug: tenantId,
          status: 'active',
          domain: '',
          settings: {
            branding: {},
            features: {
              customDomain: false,
              advancedReporting: false,
              apiAccess: false,
              prioritySupport: false,
            },
          },
        });
      }
    }
  }, []); // Empty dependency array - runs once on mount

  // Set up authentication listener (runs once on mount)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Get custom claims (including tenantId and role)
        const token = await firebaseUser.getIdTokenResult();
        const customClaims = token.claims;

        const authUser: AuthUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          tenantId: customClaims.tenantId as string,
          role: customClaims.role as string,
        };

        setUser(authUser);
        await fetchUserProfile(firebaseUser.uid, customClaims.tenantId as string);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []); // Empty dependency array - runs once on mount

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    tenant,
    loading,
    signOut: handleSignOut,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 