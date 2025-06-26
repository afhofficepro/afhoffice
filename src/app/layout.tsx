import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AFH Office - Residential Care Software",
  description: "Professional software designed specifically for adult family homes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // For static export, we'll use a default tenant configuration
  const initialTenant = {
    id: 'default',
    name: 'AFH Office',
    slug: 'default',
    status: 'active' as const,
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
  };

  return (
    <html lang="en">
      <head>
        <meta name="x-tenant-id" content="default" />
        <meta name="x-tenant-name" content="AFH Office" />
      </head>
      <body className={inter.className}>
        <AuthProvider initialTenant={initialTenant}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
