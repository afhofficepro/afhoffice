# AFH Office Multi-Tenant Architecture

## Overview

AFH Office is a multi-tenant healthcare SaaS platform designed specifically for Adult Family Homes. Each tenant (workspace) represents a separate care organization with complete data isolation and customizable features.

## Architecture Components

### 1. Authentication & Authorization

- **Firebase Auth**: Handles user authentication
- **Custom Claims**: Each user has `tenantId` and `role` claims set via Cloud Functions
- **Roles**: 
  - `owner`: Full access, billing management
  - `admin`: Full operational access
  - `manager`: Facility and staff management
  - `caregiver`: Resident care access
  - `viewer`: Read-only access

### 2. Data Model

#### Core Collections

1. **tenants** (workspaces)
   - One document per organization
   - Contains billing, settings, and feature flags
   - Subdomain mapping (e.g., `sunshine.afhoffice.com`)

2. **users**
   - Mirrors Firebase Auth users
   - Contains profile and preferences
   - Links to tenant memberships

3. **facilities**
   - Physical care home locations
   - Licensing and compliance tracking
   - Capacity management

4. **residents**
   - Primary care recipients
   - Medical history and care plans
   - Document management

5. **staff**
   - Employee records
   - Certifications and scheduling
   - Timesheet tracking

6. **tasks**
   - Care and administrative tasks
   - Recurring schedules
   - Assignment tracking

7. **emars** (Electronic Medication Administration Records)
   - Medication schedules
   - Administration tracking
   - Compliance reporting

### 3. Multi-Tenancy Implementation

#### URL Structure
```
https://[tenant-slug].afhoffice.com
```

#### Data Isolation
- All documents include `tenantId` field
- Firestore Security Rules enforce tenant isolation
- Custom claims prevent cross-tenant access

#### Example Security Rule
```javascript
function belongsToTenant(docTenantId) {
  return isAuthenticated() && 
         request.auth.token.tenantId == docTenantId;
}
```

### 4. Billing & Subscriptions

#### Plans
- **Starter**: Single facility, up to 6 residents
- **Professional**: Up to 3 facilities, 50 residents
- **Enterprise**: Unlimited scale, custom features

#### Stripe Integration
- Webhook handling for subscription events
- Automatic feature flag updates
- Seat management

### 5. Storage Architecture

#### Buckets
- `tenant-files`: Document uploads (`/tenants/{tenantId}/docs/`)
- `tenant-exports`: Generated reports
- `public-assets`: Marketing materials

### 6. Key Cloud Functions

1. **onMembershipCreate**
   - Sets custom claims
   - Sends invitation emails
   - Creates audit log

2. **onSubscriptionChange**
   - Updates tenant features
   - Manages seat limits
   - Triggers notifications

3. **nightlyComplianceSweep**
   - Checks expiring documents
   - Creates compliance alerts
   - Generates reports

4. **onResidentVitalsWrite**
   - Monitors thresholds
   - Creates clinical alerts
   - Notifies caregivers

## Setup Instructions

### 1. Initialize Firebase Project

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and init
firebase login
firebase init
```

### 2. Deploy Security Rules

```bash
firebase deploy --only firestore:rules
```

### 3. Create Composite Indexes

Key indexes needed:
- `(tenantId, status)`
- `(tenantId, createdAt DESC)`
- `(tenantId, dueDate)`
- `(assigneeId, status)`

### 4. Initialize Sample Data

```bash
# Update Firebase config in scripts/initializeFirestore.mjs
node scripts/initializeFirestore.mjs
```

### 5. Set Up Custom Domain Mapping

1. Add domain to Firebase Hosting
2. Create CNAME record: `*.afhoffice.com → afhoffice.web.app`
3. Update `customDomains` collection

## Development Workflow

### Creating a New Tenant

1. User fills workspace form on landing page
2. Cloud Function creates:
   - Tenant document
   - Owner user account
   - Initial membership
   - Stripe customer

### Adding Users to Tenant

1. Admin invites via email
2. Cloud Function creates pending membership
3. User accepts and gets custom claims
4. Access granted to tenant data

### Feature Flag Management

```javascript
// Check feature availability
const hasFeature = (feature) => {
  const tenant = getCurrentTenant();
  const plan = getplan(tenant.planId);
  return plan.features.includes(feature);
};
```

## Security Best Practices

1. **Always validate tenantId** in security rules
2. **Use subcollections** for sensitive data
3. **Encrypt PII** (SSN, medical records)
4. **Audit all write operations**
5. **Implement rate limiting** on API calls
6. **Regular security scans** of dependencies

## Monitoring & Compliance

### Key Metrics
- Active tenants by plan
- Storage usage per tenant
- API calls per tenant
- Error rates by function

### Compliance Features
- HIPAA audit logs
- Data retention policies
- Automated backups
- Encryption at rest

## Scaling Considerations

### Performance
- Enable Firestore offline persistence
- Implement query cursors for pagination
- Use composite indexes for complex queries
- Cache frequently accessed data

### Cost Optimization
- TTL policies on logs
- Lifecycle rules on storage
- Reserved capacity for predictable workloads
- Monitor and optimize Cloud Function execution

## Migration Guide

### From Single to Multi-Tenant

1. Add `tenantId` to all collections
2. Update security rules
3. Migrate existing data with tenant assignment
4. Update application code for tenant context
5. Test thoroughly in staging environment

## Support & Maintenance

### Regular Tasks
- Review expiring certificates
- Update dependencies
- Monitor error logs
- Backup critical data
- Review security rules

### Emergency Procedures
- Tenant data recovery
- Security incident response
- Service degradation handling
- Communication protocols 