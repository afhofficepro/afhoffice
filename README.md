# AFH Office - Multi-Tenant Healthcare SaaS Platform

A comprehensive healthcare management system designed specifically for Adult Family Homes (AFH), providing multi-tenant capabilities, resident management, staff scheduling, medication tracking, and compliance reporting.

## 🚀 Features

- **Multi-Tenant Architecture**: Secure, isolated environments for multiple facilities
- **Resident Management**: Complete resident profiles, health records, and care plans
- **Staff Management**: Scheduling, role-based access control, and activity tracking
- **Medication Tracking**: Medication administration records (MAR) with alerts
- **Compliance Reporting**: Generate reports for state compliance and audits
- **Real-time Updates**: Live synchronization across all users
- **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.3.4, React, TypeScript, Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication, Functions)
- **Hosting**: Firebase Hosting
- **Development**: Turbopack for fast builds

## 📋 Prerequisites

- Node.js 18+ and npm
- Firebase CLI (`npm install -g firebase-tools`)
- Git

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/afhofficepro/afh.git
   cd afh
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.template .env.local
   # Edit .env.local with your Firebase configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
afhoffice/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── contexts/         # React contexts
│   └── lib/             # Utilities and configurations
├── public/              # Static assets
├── scripts/             # Utility scripts
├── docs/                # Documentation
└── firebase/            # Firebase configuration files
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to Firebase Hosting

## 🚀 Deployment

### Firebase Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

Or use the convenience scripts:
- Windows: `.\deploy.bat`
- PowerShell: `.\deploy.ps1`

## 🔐 Security

- Multi-tenant data isolation with Firestore security rules
- Role-based access control (Owner, Admin, Manager, Caregiver, Viewer)
- HIPAA-compliant data handling
- Secure authentication with Firebase Auth

## 📚 Documentation

- [Multi-Tenant Architecture](docs/MULTI_TENANT_ARCHITECTURE.md)
- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [GitHub Setup Guide](GITHUB_SETUP_GUIDE.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For support, email support@afhoffice.com or create an issue in this repository.

## 🏗️ Roadmap

- [ ] Advanced reporting dashboard
- [ ] Mobile app (React Native)
- [ ] Integration with medical devices
- [ ] AI-powered care insights
- [ ] Telehealth integration

---

Built with ❤️ for Adult Family Homes
