# AFH Office Deployment Guide

## Prerequisites

1. **Node.js** (v18 or higher)
2. **Firebase CLI** installed globally
3. **Firebase project** created
4. **Git** (optional, for version control)

## Step 1: Install Firebase CLI

If you haven't installed Firebase CLI yet:

```bash
npm install -g firebase-tools
```

## Step 2: Firebase Authentication

Login to Firebase:

```bash
firebase login
```

## Step 3: Initialize Firebase Project

If you haven't already initialized Firebase in your project:

```bash
firebase init
```

Select the following services:
- Firestore
- Hosting
- Functions (if using Cloud Functions)

## Step 4: Update Firebase Configuration

1. Get your Firebase config from the Firebase Console
2. Update `src/lib/firebase.ts` with your config:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## Step 5: Build the Application

Build the Next.js application for production:

```bash
npm run build
```

This will create an `out` directory with the static files.

## Step 6: Deploy to Firebase

### Deploy Everything

Deploy all services (hosting, firestore rules, indexes):

```bash
firebase deploy
```

### Deploy Specific Services

Deploy only hosting:
```bash
firebase deploy --only hosting
```

Deploy only Firestore rules:
```bash
firebase deploy --only firestore:rules
```

Deploy only Firestore indexes:
```bash
firebase deploy --only firestore:indexes
```

## Step 7: Initialize Firestore Data (Optional)

If you want to populate your database with sample data:

1. Update the Firebase config in `scripts/initializeFirestore.mjs`
2. Run the initialization script:

```bash
node scripts/initializeFirestore.mjs
```

## Step 8: Set Up Custom Domain (Optional)

1. In Firebase Console, go to Hosting
2. Click "Add custom domain"
3. Follow the instructions to verify domain ownership
4. Update DNS records as instructed

For multi-tenant subdomains:
- Add a wildcard domain: `*.afhoffice.com`
- Point CNAME to your Firebase hosting domain

## Step 9: Environment Variables

For production, set up environment variables in Firebase:

```bash
firebase functions:config:set stripe.secret_key="your-stripe-secret-key"
firebase functions:config:set stripe.webhook_secret="your-webhook-secret"
```

## Step 10: Post-Deployment Checklist

- [ ] Test the live site
- [ ] Verify Firestore security rules are working
- [ ] Check that authentication is functioning
- [ ] Test multi-tenant functionality
- [ ] Monitor Firebase Console for any errors
- [ ] Set up monitoring and alerts
- [ ] Configure backup policies

## Troubleshooting

### Build Errors

If the build fails:
1. Clear the cache: `rm -rf .next out`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Try building again: `npm run build`

### Deployment Errors

If deployment fails:
1. Check Firebase project settings
2. Ensure you're logged in: `firebase login`
3. Verify project selection: `firebase use --add`
4. Check Firebase status: https://status.firebase.google.com/

### 404 Errors After Deployment

If you get 404 errors:
1. Ensure the `out` directory exists and contains files
2. Check `firebase.json` hosting configuration
3. Verify rewrites are configured correctly

## Continuous Deployment (Optional)

### Using GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Firebase
      uses: w9jds/firebase-action@master
      with:
        args: deploy --only hosting
      env:
        FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

To get the Firebase token:
```bash
firebase login:ci
```

Add the token to GitHub Secrets as `FIREBASE_TOKEN`.

## Monitoring

After deployment, monitor your application:

1. **Firebase Console**: Check for errors and usage
2. **Google Cloud Console**: Monitor functions and performance
3. **Firestore Usage**: Track read/write operations
4. **Error Reporting**: Set up alerts for critical errors

## Security Considerations

1. **Review Firestore Rules**: Ensure proper access control
2. **Enable App Check**: Protect your backend from abuse
3. **Set up Budget Alerts**: Prevent unexpected charges
4. **Regular Security Audits**: Review dependencies and configurations

## Rollback Procedure

If you need to rollback to a previous version:

1. View hosting releases:
```bash
firebase hosting:releases:list
```

2. Rollback to a specific version:
```bash
firebase hosting:rollback
```

## Support

For issues:
1. Check Firebase documentation: https://firebase.google.com/docs
2. Review Next.js deployment guides: https://nextjs.org/docs/deployment
3. Check the project's GitHub issues (if applicable)
4. Contact Firebase support for platform-specific issues 