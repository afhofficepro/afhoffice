# Setting Up Firebase Service Account for GitHub

To fix the deployment error, you need to add a Firebase service account to your GitHub repository secrets.

## Steps:

### 1. Generate Firebase Service Account Key

1. Go to Firebase Console: https://console.firebase.google.com/project/afhoffice-c50a4/settings/serviceaccounts/adminsdk
2. Click on "Generate new private key"
3. Click "Generate key" in the popup
4. Save the downloaded JSON file

### 2. Add to GitHub Secrets

1. Go to your GitHub repository: https://github.com/afhofficepro/afhoffice
2. Click on "Settings" tab
3. In the left sidebar, click "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Name: `FIREBASE_SERVICE_ACCOUNT_AFHOFFICE_C50A4`
6. Value: Copy and paste the ENTIRE content of the JSON file you downloaded
7. Click "Add secret"

### 3. Verify

After adding the secret, GitHub Actions will be able to deploy to Firebase Hosting automatically when you push to the main branch.

## Alternative: Disable GitHub Actions

If you don't want to use GitHub Actions for deployment, you can disable the workflows:

1. Delete the `.github/workflows` folder, or
2. Rename the workflow files to have `.disabled` extension

Then use Firebase CLI directly: `firebase deploy` 