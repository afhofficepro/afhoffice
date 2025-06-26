# AFH Office - Multi-Tenant SaaS Platform

A complete multi-tenant SaaS application built with Next.js, Firebase, and Stripe for Adult Family Home management. This platform provides workspace-per-subdomain architecture with comprehensive tenant isolation.

## 🏗️ Architecture Overview

### Core Components

- **Multi-tenant Routing**: Subdomain-based tenant isolation (`tenant.afhoffice.com`)
- **Firebase Authentication**: User management with custom tenant claims
- **Firestore Database**: Tenant-scoped data with security rules
- **Stripe Integration**: Subscription billing and automatic tenant provisioning
- **Next.js Middleware**: Edge-based tenant resolution
- **TypeScript**: Full type safety across the application

### Tenant Isolation Strategy

- **Pooled Database**: Single Firestore database with tenant-scoped collections
- **Custom Claims**: Firebase Auth tokens include `tenantId` and `role`
- **Security Rules**: Firestore rules enforce tenant data isolation
- **Middleware**: Request-level tenant context injection

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18+
- Firebase CLI
- Stripe account
- Domain with DNS management

### 2. Installation

```bash
# Clone and install dependencies
npm install

# Copy environment template
cp env.template .env.local

# Install Firebase CLI globally
npm install -g firebase-tools
```

### 3. Firebase Setup

```bash
# Login to Firebase
firebase login

# Initialize Firebase project
firebase init

# Deploy Firestore rules and indexes
firebase deploy --only firestore:rules,firestore:indexes
```

### 4. Environment Configuration

Update `.env.local` with your credentials:

```env
# Firebase Configuration (from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id

# Firebase Admin SDK
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key\n-----END PRIVATE KEY-----\n"

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Stripe Price IDs (create in Stripe Dashboard)
STRIPE_STARTER_PRICE_ID=price_starter_id
STRIPE_PROFESSIONAL_PRICE_ID=price_professional_id
STRIPE_ENTERPRISE_PRICE_ID=price_enterprise_id

# Domain Configuration
NEXT_PUBLIC_BASE_DOMAIN=yourdomain.com
```

### 5. Domain Setup

1. **Wildcard DNS**: Add DNS records for `*.yourdomain.com` pointing to your hosting
2. **Firebase App Hosting**: Enable App Hosting and add wildcard domain
3. **SSL Certificate**: Automatic via Firebase App Hosting

### 6. Stripe Configuration

1. Create products and prices in Stripe Dashboard
2. Set up webhook endpoint: `https://yourdomain.com/api/stripe-webhook`
3. Add webhook events: `checkout.session.completed`, `customer.subscription.updated`, etc.

## 🛠️ Development

```bash
# Start development server
npm run dev

# Start Firebase emulators
firebase emulators:start

# Build for production
npm run build
```

### 🌐 Testing the Multi-Tenant Flow

The application now includes a professional onboarding flow:

1. **Landing Page**: `http://localhost:3001/landing`
   - Complete workspace setup with 4-step wizard
   - Workspace name selection with live preview
   - Account creation
   - Plan selection (Starter, Professional, Enterprise)
   - Payment summary and Stripe integration

2. **Sign In Page**: `http://localhost:3001/signin`
   - For users with existing workspaces
   - Enter workspace name + credentials
   - Redirects to workspace subdomain

3. **Main App**: `http://localhost:3001`
   - Redirects to landing page if no tenant found
   - Shows login form for valid tenant subdomains
   - Multi-tenant dashboard after authentication

### 📱 User Journey

1. **New Users**: Visit any URL → Redirected to `/landing` → Complete setup → Stripe checkout
2. **Existing Users**: Visit `/signin` → Enter workspace + credentials → Redirected to `{workspace}.afhoffice.com`
3. **Tenant Users**: Visit `{workspace}.afhoffice.com` → Login form → Dashboard

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── create-checkout/
│   │   └── stripe-webhook/
│   ├── setup/             # Tenant onboarding
│   ├── suspended/         # Suspended tenant page
│   ├── pending/           # Pending tenant page
│   └── page.tsx           # Main dashboard
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── ui/               # Reusable UI components
│   ├── DashboardHeader.tsx
│   └── DashboardContent.tsx
├── contexts/             # React contexts  
│   └── AuthContext.tsx   # Auth & tenant context
├── lib/                  # Utilities
│   ├── firebase.ts       # Firebase configuration
│   ├── types.ts          # TypeScript interfaces
│   ├── utils.ts          # Utility functions
│   └── getTenantConfig.ts # Tenant resolution
└── middleware.ts         # Multi-tenant routing
```

## 🔒 Security Features

### Firestore Security Rules

- **Tenant Isolation**: Users can only access their tenant's data
- **Role-Based Access**: Owner/Admin/Member role enforcement
- **Custom Claims**: Firebase Auth tokens carry tenant context
- **Admin SDK Only**: Tenant metadata managed server-side

### Authentication Flow

1. User signs in → Firebase Auth
2. Cloud Function sets custom claims (`tenantId`, `role`)
3. Client receives token with tenant context
4. Firestore rules enforce tenant isolation

## 💳 Billing & Provisioning

### Subscription Plans

- **Starter**: $29/month - 5 users, basic features
- **Professional**: $79/month - 25 users, advanced features, custom domain
- **Enterprise**: $199/month - 100 users, API access, priority support

### Automatic Provisioning

1. Customer completes Stripe checkout
2. Webhook creates tenant in Firestore
3. Sets custom claims for owner user
4. Sends workspace ready notification

## 🌐 Multi-Tenant Features

### Subdomain Routing

- `tenant1.afhoffice.com` → Tenant 1 workspace
- `tenant2.afhoffice.com` → Tenant 2 workspace
- Middleware resolves tenant from subdomain

### Custom Domains (Professional+)

- `customdomain.com` → Maps to tenant workspace
- Automatic SSL certificate provisioning
- DNS verification process

### Tenant States

- **Active**: Full access to workspace
- **Pending**: Setup in progress
- **Suspended**: Payment issues or violations

## 🔧 Customization

### Adding New Features

1. Update `src/lib/types.ts` for new interfaces
2. Add Firestore collections under `tenantData/{tenantId}/`
3. Update security rules in `firestore.rules`
4. Create UI components and API routes

### Plan Features

Update `getPlanFeatures()` in `src/app/api/stripe-webhook/route.ts`:

```typescript
function getPlanFeatures(plan: string) {
  switch (plan) {
    case 'enterprise':
      return {
        customDomain: true,
        advancedReporting: true,
        apiAccess: true,
        prioritySupport: true,
      };
    // ... other plans
  }
}
```

## 🚀 Deployment

### Firebase App Hosting

```bash
# Deploy to staging
firebase deploy --project staging

# Deploy to production  
firebase deploy --project production
```

### Environment Variables

Set production environment variables in Firebase Functions:

```bash
firebase functions:config:set stripe.secret_key="sk_live_..." \
  stripe.webhook_secret="whsec_..." \
  --project production
```

## 📊 Monitoring

### Firebase Analytics

- User engagement tracking
- Tenant usage metrics
- Feature adoption rates

### Error Handling

- Comprehensive error boundaries
- Firebase Crashlytics integration
- User-friendly error messages

## 🔄 Development Workflow

### Local Development

1. Start Firebase emulators
2. Use `localhost:3000` with default tenant
3. Test tenant isolation with different subdomains

### Testing

```bash
# Run tests
npm test

# Test with different tenant contexts
TENANT_ID=test-tenant npm test
```

## 📈 Scaling Considerations

### Database Scaling

- Monitor Firestore usage and costs
- Consider schema-per-tenant for large tenants
- Implement data archiving strategies

### Performance Optimization

- Implement tenant config caching (Redis)
- Use CDN for static assets
- Optimize Firestore queries with indexes

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Update tests and documentation
4. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- Documentation: [Wiki](link-to-wiki)
- Issues: [GitHub Issues](link-to-issues)
- Email: support@afhoffice.com

---

Built with ❤️ for Adult Family Home providers worldwide.
