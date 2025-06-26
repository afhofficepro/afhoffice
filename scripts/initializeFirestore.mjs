import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your Firebase config
const firebaseConfig = {
  // Add your Firebase config here
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Helper function to create timestamps
const now = Timestamp.now();
const daysAgo = (days) => Timestamp.fromDate(new Date(Date.now() - days * 24 * 60 * 60 * 1000));
const daysFromNow = (days) => Timestamp.fromDate(new Date(Date.now() + days * 24 * 60 * 60 * 1000));

async function initializeCollections() {
  try {
    console.log('Starting Firestore initialization...');

    // 1. Create Plans
    const plans = [
      {
        id: 'starter',
        name: 'Starter',
        description: 'Perfect for single facilities just getting started',
        priceMonthly: 99,
        priceYearly: 990,
        currency: 'USD',
        features: [
          'Up to 1 facility',
          'Up to 6 residents',
          'Basic reporting',
          'Email support',
          'Mobile app access'
        ],
        limits: {
          facilities: 1,
          residents: 6,
          staff: 10,
          storage: 5
        },
        stripePriceId: {
          monthly: 'price_starter_monthly',
          yearly: 'price_starter_yearly'
        }
      },
      {
        id: 'professional',
        name: 'Professional',
        description: 'For growing care homes with multiple facilities',
        priceMonthly: 299,
        priceYearly: 2990,
        currency: 'USD',
        features: [
          'Up to 3 facilities',
          'Up to 50 residents',
          'Advanced reporting',
          'Priority support',
          'API access',
          'Custom branding'
        ],
        limits: {
          facilities: 3,
          residents: 50,
          staff: 50,
          storage: 50
        },
        stripePriceId: {
          monthly: 'price_professional_monthly',
          yearly: 'price_professional_yearly'
        },
        isPopular: true
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        description: 'For large organizations with custom needs',
        priceMonthly: 999,
        priceYearly: 9990,
        currency: 'USD',
        features: [
          'Unlimited facilities',
          'Unlimited residents',
          'Custom reporting',
          'Dedicated support',
          'Full API access',
          'White labeling',
          'Custom integrations',
          'SLA guarantee'
        ],
        limits: {
          facilities: -1, // Unlimited
          residents: -1,
          staff: -1,
          storage: 500
        },
        stripePriceId: {
          monthly: 'price_enterprise_monthly',
          yearly: 'price_enterprise_yearly'
        }
      }
    ];

    for (const plan of plans) {
      await setDoc(doc(db, 'plans', plan.id), plan);
      console.log(`Created plan: ${plan.name}`);
    }

    // 2. Create a sample tenant
    const tenantId = 'demo-tenant';
    const tenantData = {
      name: 'Sunshine Adult Family Home',
      slug: 'sunshine-afh',
      status: 'active',
      createdAt: now,
      updatedAt: now,
      planId: 'professional',
      seats: 10,
      timezone: 'America/Los_Angeles',
      address: {
        street: '123 Care Lane',
        city: 'Seattle',
        state: 'WA',
        zip: '98101',
        country: 'USA'
      },
      primaryContact: {
        name: 'Sarah Johnson',
        email: 'sarah@sunshineafh.com',
        phone: '(206) 555-0123'
      },
      features: {
        maxFacilities: 3,
        maxResidents: 50,
        customBranding: true,
        apiAccess: true,
        advancedReporting: true
      }
    };

    await setDoc(doc(db, 'tenants', tenantId), tenantData);
    console.log('Created demo tenant');

    // 3. Create tenant settings
    await setDoc(doc(db, 'tenants', tenantId, 'settings', 'general'), {
      businessHours: {
        monday: { open: '08:00', close: '18:00' },
        tuesday: { open: '08:00', close: '18:00' },
        wednesday: { open: '08:00', close: '18:00' },
        thursday: { open: '08:00', close: '18:00' },
        friday: { open: '08:00', close: '18:00' },
        saturday: { open: '09:00', close: '14:00' },
        sunday: { closed: true }
      },
      medicationTimes: ['08:00', '12:00', '18:00', '22:00'],
      mealTimes: {
        breakfast: '08:00',
        lunch: '12:30',
        dinner: '18:00'
      }
    });

    // 4. Create a facility
    const facilityId = 'facility-1';
    const facilityData = {
      tenantId,
      name: 'Sunshine Main House',
      licenseNumber: 'AFH-2024-001',
      licenseExpiry: daysFromNow(365),
      capacity: 6,
      currentOccupancy: 5,
      status: 'active',
      address: {
        street: '123 Care Lane',
        city: 'Seattle',
        state: 'WA',
        zip: '98101'
      },
      contact: {
        phone: '(206) 555-0123',
        fax: '(206) 555-0124',
        email: 'main@sunshineafh.com',
        emergencyPhone: '(206) 555-0911'
      },
      manager: {
        name: 'Sarah Johnson',
        email: 'sarah@sunshineafh.com',
        phone: '(206) 555-0125'
      },
      certifications: [
        {
          type: 'State License',
          number: 'AFH-2024-001',
          expiryDate: daysFromNow(365)
        },
        {
          type: 'Fire Safety',
          number: 'FS-2024-123',
          expiryDate: daysFromNow(180)
        }
      ],
      settings: {
        visitingHours: '9:00 AM - 8:00 PM',
        mealTimes: {
          breakfast: '8:00 AM',
          lunch: '12:30 PM',
          dinner: '6:00 PM'
        },
        medicationTimes: ['8:00', '12:00', '18:00', '22:00']
      }
    };

    await setDoc(doc(db, 'facilities', facilityId), facilityData);
    console.log('Created facility');

    // 5. Create sample staff members
    const staffMembers = [
      {
        id: 'staff-1',
        firstName: 'Emily',
        lastName: 'Chen',
        email: 'emily@sunshineafh.com',
        phone: '(206) 555-0201',
        dateOfBirth: Timestamp.fromDate(new Date('1985-03-15')),
        employeeId: 'EMP001',
        roleTitle: 'Registered Nurse',
        department: 'nursing',
        employmentType: 'full-time',
        hireDate: daysAgo(730),
        status: 'active',
        certifications: [
          {
            type: 'RN License',
            number: 'RN-123456',
            issuedDate: daysAgo(1095),
            expiryDate: daysFromNow(365)
          },
          {
            type: 'CPR Certification',
            number: 'CPR-789012',
            issuedDate: daysAgo(180),
            expiryDate: daysFromNow(545)
          }
        ],
        defaultShift: 'day',
        weeklyHours: 40
      },
      {
        id: 'staff-2',
        firstName: 'Michael',
        lastName: 'Rodriguez',
        email: 'michael@sunshineafh.com',
        phone: '(206) 555-0202',
        dateOfBirth: Timestamp.fromDate(new Date('1990-07-22')),
        employeeId: 'EMP002',
        roleTitle: 'Caregiver',
        department: 'nursing',
        employmentType: 'full-time',
        hireDate: daysAgo(365),
        status: 'active',
        certifications: [
          {
            type: 'HCA License',
            number: 'HCA-345678',
            issuedDate: daysAgo(400),
            expiryDate: daysFromNow(330)
          }
        ],
        defaultShift: 'evening',
        weeklyHours: 40
      }
    ];

    for (const staff of staffMembers) {
      const { id, ...staffData } = staff;
      await setDoc(doc(db, 'staff', id), {
        ...staffData,
        tenantId,
        facilityId
      });
      console.log(`Created staff: ${staffData.firstName} ${staffData.lastName}`);
    }

    // 6. Create sample residents
    const residents = [
      {
        id: 'resident-1',
        firstName: 'Margaret',
        lastName: 'Thompson',
        preferredName: 'Maggie',
        dateOfBirth: Timestamp.fromDate(new Date('1945-06-12')),
        gender: 'female',
        admissionDate: daysAgo(180),
        status: 'active',
        roomNumber: '101',
        primaryDiagnosis: 'Mild Cognitive Impairment',
        secondaryDiagnoses: ['Type 2 Diabetes', 'Hypertension'],
        allergies: ['Penicillin'],
        dietRestrictions: ['Low Sodium', 'Diabetic'],
        mobilityLevel: 'assisted',
        cognitiveLevel: 'mild-impairment',
        primaryContact: {
          name: 'Jennifer Thompson',
          relationship: 'Daughter',
          phone: '(206) 555-0301',
          email: 'jennifer.t@email.com',
          isPowerOfAttorney: true
        },
        emergencyContacts: [
          {
            name: 'Robert Thompson',
            relationship: 'Son',
            phone: '(206) 555-0302',
            priority: 2
          }
        ],
        physician: {
          name: 'Dr. Sarah Williams',
          practice: 'Seattle Primary Care',
          phone: '(206) 555-0401',
          fax: '(206) 555-0402'
        },
        pharmacy: {
          name: 'Walgreens Pharmacy',
          phone: '(206) 555-0501',
          fax: '(206) 555-0502'
        }
      },
      {
        id: 'resident-2',
        firstName: 'George',
        lastName: 'Wilson',
        dateOfBirth: Timestamp.fromDate(new Date('1942-11-03')),
        gender: 'male',
        admissionDate: daysAgo(90),
        status: 'active',
        roomNumber: '102',
        primaryDiagnosis: 'Parkinson\'s Disease',
        secondaryDiagnoses: ['Arthritis'],
        allergies: [],
        dietRestrictions: ['Pureed Diet'],
        mobilityLevel: 'wheelchair',
        cognitiveLevel: 'alert',
        primaryContact: {
          name: 'Linda Wilson',
          relationship: 'Wife',
          phone: '(206) 555-0303',
          email: 'linda.w@email.com',
          isPowerOfAttorney: true
        },
        emergencyContacts: [],
        physician: {
          name: 'Dr. James Chen',
          practice: 'Northwest Neurology',
          phone: '(206) 555-0403'
        },
        pharmacy: {
          name: 'CVS Pharmacy',
          phone: '(206) 555-0503'
        }
      }
    ];

    for (const resident of residents) {
      const { id, ...residentData } = resident;
      await setDoc(doc(db, 'residents', id), {
        ...residentData,
        tenantId,
        facilityId
      });
      console.log(`Created resident: ${residentData.firstName} ${residentData.lastName}`);
    }

    // 7. Create sample medications for residents
    const medications = [
      {
        residentId: 'resident-1',
        drugName: 'Metformin',
        genericName: 'Metformin HCl',
        strength: '500mg',
        form: 'tablet',
        route: 'oral',
        dosage: '1 tablet',
        frequency: 'Twice daily',
        times: ['08:00', '20:00'],
        prescribedBy: 'Dr. Sarah Williams',
        prescribedDate: daysAgo(30),
        startDate: daysAgo(30),
        status: 'active',
        indication: 'Type 2 Diabetes',
        isPRN: false
      },
      {
        residentId: 'resident-1',
        drugName: 'Lisinopril',
        genericName: 'Lisinopril',
        strength: '10mg',
        form: 'tablet',
        route: 'oral',
        dosage: '1 tablet',
        frequency: 'Once daily',
        times: ['08:00'],
        prescribedBy: 'Dr. Sarah Williams',
        prescribedDate: daysAgo(60),
        startDate: daysAgo(60),
        status: 'active',
        indication: 'Hypertension',
        isPRN: false
      }
    ];

    for (const med of medications) {
      const medDoc = doc(collection(db, 'residents', med.residentId, 'medications'));
      await setDoc(medDoc, {
        ...med,
        tenantId
      });
      console.log(`Created medication: ${med.drugName} for resident`);
    }

    // 8. Create sample tasks
    const tasks = [
      {
        title: 'Morning Medication Round',
        description: 'Administer morning medications to all residents',
        category: 'medication',
        priority: 'high',
        assigneeType: 'role',
        dueDate: Timestamp.fromDate(new Date(new Date().setHours(8, 0, 0, 0))),
        dueTime: '08:00',
        recurrence: {
          pattern: 'daily',
          interval: 1
        },
        status: 'pending',
        createdBy: 'system',
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'Weekly Room Inspection - Room 101',
        description: 'Conduct weekly safety and cleanliness inspection',
        category: 'maintenance',
        priority: 'medium',
        assigneeType: 'staff',
        residentId: 'resident-1',
        dueDate: daysFromNow(2),
        status: 'pending',
        createdBy: 'staff-1',
        createdAt: now,
        updatedAt: now
      }
    ];

    for (const task of tasks) {
      const taskDoc = doc(collection(db, 'tasks'));
      await setDoc(taskDoc, {
        ...task,
        tenantId,
        facilityId
      });
      console.log(`Created task: ${task.title}`);
    }

    // 9. Create sample alerts
    const alerts = [
      {
        type: 'compliance',
        severity: 'warning',
        title: 'Fire Safety Certificate Expiring',
        message: 'The Fire Safety Certificate for Sunshine Main House will expire in 30 days',
        entityType: 'facility',
        entityId: facilityId,
        status: 'active',
        createdAt: now,
        expiresAt: daysFromNow(30)
      },
      {
        type: 'clinical',
        severity: 'info',
        title: 'Medication Review Due',
        message: 'Margaret Thompson\'s medications are due for quarterly review',
        entityType: 'resident',
        entityId: 'resident-1',
        status: 'active',
        createdAt: now,
        suggestedAction: 'Schedule appointment with Dr. Sarah Williams'
      }
    ];

    for (const alert of alerts) {
      const alertDoc = doc(collection(db, 'alerts'));
      await setDoc(alertDoc, {
        ...alert,
        tenantId
      });
      console.log(`Created alert: ${alert.title}`);
    }

    // 10. Create feature flags
    const featureFlags = [
      {
        id: 'new-dashboard',
        key: 'new_dashboard_ui',
        value: true,
        description: 'Enable new dashboard UI for all users',
        enabledForPlans: ['professional', 'enterprise'],
        updatedAt: now,
        updatedBy: 'system'
      },
      {
        id: 'ai-insights',
        key: 'ai_powered_insights',
        value: false,
        description: 'Enable AI-powered care insights (beta)',
        enabledForPlans: ['enterprise'],
        percentage: 10,
        updatedAt: now,
        updatedBy: 'system'
      }
    ];

    for (const flag of featureFlags) {
      await setDoc(doc(db, 'featureFlags', flag.id), flag);
      console.log(`Created feature flag: ${flag.key}`);
    }

    console.log('\n✅ Firestore initialization complete!');
    console.log('\nCreated:');
    console.log('- 3 subscription plans');
    console.log('- 1 demo tenant (Sunshine Adult Family Home)');
    console.log('- 1 facility');
    console.log('- 2 staff members');
    console.log('- 2 residents');
    console.log('- 2 medications');
    console.log('- 2 tasks');
    console.log('- 2 alerts');
    console.log('- 2 feature flags');

  } catch (error) {
    console.error('Error initializing Firestore:', error);
  }
}

// Run the initialization
initializeCollections(); 