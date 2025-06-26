// Multi-tenant Healthcare SaaS Types for AFH Office

// ============ Core Tenant/Workspace Types ============
export interface Tenant {
  id?: string;
  name: string;
  slug: string; // subdomain identifier
  status: 'active' | 'suspended' | 'cancelled' | 'trial';
  createdAt: Date;
  updatedAt: Date;
  
  // Billing
  stripeCustomerId?: string;
  planId: string;
  seats: number;
  
  // Configuration
  customDomain?: string;
  timezone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  
  // Contact
  primaryContact: {
    name: string;
    email: string;
    phone: string;
  };
  
  // Features
  features: {
    maxFacilities: number;
    maxResidents: number;
    customBranding: boolean;
    apiAccess: boolean;
    advancedReporting: boolean;
  };
}

// ============ User & Access Types ============
export interface User {
  id: string; // Firebase Auth UID
  displayName: string;
  email: string;
  avatarURL?: string;
  defaultTenant?: string;
  onboardedAt?: Date;
  phoneNumber?: string;
  preferences: {
    notifications: {
      email: boolean;
      sms: boolean;
      inApp: boolean;
    };
    theme: 'light' | 'dark' | 'system';
  };
}

export interface Membership {
  id?: string;
  tenantId: string;
  userId: string;
  role: 'owner' | 'admin' | 'manager' | 'caregiver' | 'viewer';
  status: 'active' | 'invited' | 'suspended';
  invitedBy?: string;
  invitedAt?: Date;
  acceptedAt?: Date;
  permissions: string[]; // Granular permissions
}

// ============ Billing & Subscription Types ============
export interface Plan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  currency: string;
  features: string[];
  limits: {
    facilities: number;
    residents: number;
    staff: number;
    storage: number; // GB
  };
  stripePriceId: {
    monthly: string;
    yearly: string;
  };
  isPopular?: boolean;
}

export interface Subscription {
  id?: string;
  tenantId: string;
  planId: string;
  status: 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  seatCount: number;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
}

// ============ Healthcare Entity Types ============
export interface Facility {
  id?: string;
  tenantId: string;
  name: string;
  licenseNumber: string;
  licenseExpiry: Date;
  capacity: number;
  currentOccupancy: number;
  status: 'active' | 'inactive' | 'pending';
  
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  
  contact: {
    phone: string;
    fax?: string;
    email: string;
    emergencyPhone: string;
  };
  
  manager: {
    name: string;
    email: string;
    phone: string;
  };
  
  certifications: {
    type: string;
    number: string;
    expiryDate: Date;
  }[];
  
  settings: {
    visitingHours: string;
    mealTimes: {
      breakfast: string;
      lunch: string;
      dinner: string;
    };
    medicationTimes: string[];
  };
}

export interface Staff {
  id?: string;
  tenantId: string;
  facilityId: string;
  userId?: string; // Link to User if they have system access
  
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  ssn?: string; // Encrypted
  
  // Employment
  employeeId: string;
  roleTitle: string;
  department: 'nursing' | 'administration' | 'maintenance' | 'dietary' | 'activities';
  employmentType: 'full-time' | 'part-time' | 'contractor' | 'volunteer';
  hireDate: Date;
  terminationDate?: Date;
  status: 'active' | 'on-leave' | 'terminated';
  
  // Qualifications
  certifications: {
    type: string;
    number: string;
    issuedDate: Date;
    expiryDate: Date;
    verifiedBy?: string;
  }[];
  
  // Scheduling
  defaultShift?: 'day' | 'evening' | 'night';
  weeklyHours: number;
  hourlyRate?: number;
}

export interface Resident {
  id?: string;
  tenantId: string;
  facilityId: string;
  
  // Personal Information
  firstName: string;
  lastName: string;
  preferredName?: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  ssn?: string; // Encrypted
  medicareNumber?: string;
  medicaidNumber?: string;
  
  // Admission Info
  admissionDate: Date;
  dischargeDate?: Date;
  status: 'active' | 'hospitalized' | 'on-leave' | 'discharged' | 'deceased';
  roomNumber: string;
  
  // Medical
  primaryDiagnosis: string;
  secondaryDiagnoses: string[];
  allergies: string[];
  dietRestrictions: string[];
  mobilityLevel: 'independent' | 'assisted' | 'wheelchair' | 'bedridden';
  cognitiveLevel: 'alert' | 'mild-impairment' | 'moderate-impairment' | 'severe-impairment';
  
  // Contacts
  primaryContact: {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
    isPowerOfAttorney: boolean;
  };
  
  emergencyContacts: {
    name: string;
    relationship: string;
    phone: string;
    priority: number;
  }[];
  
  // Healthcare Providers
  physician: {
    name: string;
    practice: string;
    phone: string;
    fax?: string;
  };
  
  pharmacy: {
    name: string;
    phone: string;
    fax?: string;
  };
}

// ============ Care Management Types ============
export interface CarePlan {
  id?: string;
  residentId: string;
  tenantId: string;
  
  effectiveDate: Date;
  reviewDate: Date;
  status: 'active' | 'pending-review' | 'archived';
  
  goals: {
    category: 'physical' | 'cognitive' | 'social' | 'emotional';
    description: string;
    targetDate?: Date;
    progress: 'not-started' | 'in-progress' | 'achieved';
  }[];
  
  interventions: {
    category: string;
    description: string;
    frequency: string;
    responsibleStaff: string;
  }[];
  
  createdBy: string;
  approvedBy?: string;
  approvedAt?: Date;
}

export interface Medication {
  id?: string;
  residentId: string;
  tenantId: string;
  
  // Drug Info
  drugName: string;
  genericName?: string;
  strength: string;
  form: 'tablet' | 'capsule' | 'liquid' | 'injection' | 'patch' | 'other';
  
  // Administration
  route: 'oral' | 'sublingual' | 'topical' | 'injection' | 'inhalation' | 'other';
  dosage: string;
  frequency: string;
  times: string[]; // ["08:00", "20:00"]
  
  // Prescription
  prescribedBy: string;
  prescribedDate: Date;
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'discontinued' | 'hold' | 'completed';
  
  // Additional Info
  indication: string;
  specialInstructions?: string;
  sideEffects?: string[];
  
  // PRN (as needed) medications
  isPRN: boolean;
  prnIndication?: string;
  maxDailyDose?: string;
}

export interface MedicationAdministration {
  id?: string;
  medicationId: string;
  residentId: string;
  tenantId: string;
  
  scheduledTime: Date;
  actualTime?: Date;
  status: 'pending' | 'given' | 'refused' | 'held' | 'missed';
  
  administeredBy?: string;
  notes?: string;
  
  // For PRN
  prnReason?: string;
  effectiveness?: 'effective' | 'partially-effective' | 'not-effective';
}

export interface Vitals {
  id?: string;
  residentId: string;
  tenantId: string;
  
  recordedAt: Date;
  recordedBy: string;
  
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  pulse?: number;
  temperature?: number;
  temperatureUnit: 'F' | 'C';
  respirationRate?: number;
  oxygenSaturation?: number;
  bloodGlucose?: number;
  weight?: number;
  weightUnit: 'lbs' | 'kg';
  height?: number;
  heightUnit: 'in' | 'cm';
  
  painLevel?: number; // 0-10
  notes?: string;
}

// ============ Task Management Types ============
export interface Task {
  id?: string;
  tenantId: string;
  facilityId?: string;
  
  title: string;
  description?: string;
  category: 'care' | 'medication' | 'appointment' | 'maintenance' | 'administrative';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // Assignment
  assigneeId?: string;
  assigneeType: 'staff' | 'role';
  residentId?: string; // If resident-specific
  
  // Scheduling
  dueDate: Date;
  dueTime?: string;
  recurrence?: {
    pattern: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: Date;
  };
  
  // Status
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  completedAt?: Date;
  completedBy?: string;
  
  // Additional
  notes?: string;
  attachments?: string[];
  
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============ Document Management Types ============
export interface Document {
  id?: string;
  tenantId: string;
  
  // Owner
  ownerType: 'resident' | 'staff' | 'facility' | 'tenant';
  ownerId: string;
  
  // File Info
  name: string;
  type: 'pdf' | 'doc' | 'image' | 'spreadsheet' | 'other';
  category: 'medical' | 'legal' | 'financial' | 'administrative' | 'personal';
  
  // Storage
  storagePath: string;
  size: number; // bytes
  mimeType: string;
  
  // Metadata
  description?: string;
  tags: string[];
  expiresAt?: Date;
  
  // Security
  isConfidential: boolean;
  allowedRoles: string[];
  
  // Audit
  uploadedBy: string;
  uploadedAt: Date;
  lastAccessedAt?: Date;
  lastAccessedBy?: string;
}

// ============ Compliance & Reporting Types ============
export interface Alert {
  id?: string;
  tenantId: string;
  facilityId?: string;
  
  type: 'compliance' | 'clinical' | 'operational' | 'system';
  severity: 'info' | 'warning' | 'critical';
  
  title: string;
  message: string;
  
  // Reference to entity
  entityType?: 'resident' | 'staff' | 'facility' | 'document';
  entityId?: string;
  
  // Status
  status: 'active' | 'acknowledged' | 'resolved';
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  resolvedBy?: string;
  resolvedAt?: Date;
  
  // Automation
  createdAt: Date;
  expiresAt?: Date;
  
  // Actions
  suggestedAction?: string;
  actionTaken?: string;
}

export interface AuditLog {
  id?: string;
  tenantId: string;
  
  userId: string;
  userEmail: string;
  action: string;
  
  // What was affected
  entityType: string;
  entityId: string;
  
  // Details
  changes?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  
  timestamp: Date;
}

// ============ Communication Types ============
export interface Notification {
  id?: string;
  tenantId: string;
  
  recipientId: string;
  recipientType: 'user' | 'role';
  
  title: string;
  body: string;
  type: 'info' | 'warning' | 'error' | 'success';
  category: 'system' | 'task' | 'alert' | 'message';
  
  // Delivery
  channels: ('inApp' | 'email' | 'sms')[];
  
  // Status
  read: boolean;
  readAt?: Date;
  sent: boolean;
  sentAt?: Date;
  
  // Actions
  actionUrl?: string;
  actionLabel?: string;
  
  createdAt: Date;
  expiresAt?: Date;
}

// ============ System Types ============
export interface SystemLog {
  id?: string;
  tenantId?: string; // Optional for system-wide logs
  
  level: 'debug' | 'info' | 'warning' | 'error' | 'critical';
  event: string;
  message: string;
  
  // Context
  userId?: string;
  source: string; // Function or service name
  
  // Data
  payload?: Record<string, any>;
  stackTrace?: string;
  
  timestamp: Date;
}

export interface FeatureFlag {
  id: string;
  key: string;
  value: boolean | string | number;
  description: string;
  
  // Targeting
  enabledForPlans?: string[];
  enabledForTenants?: string[];
  
  // Rollout
  percentage?: number; // For gradual rollout
  
  updatedAt: Date;
  updatedBy: string;
} 