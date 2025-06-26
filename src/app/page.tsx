'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Shield, 
  Home,
  Pill,
  Calendar,
  UserCheck,
  ClipboardCheck,
  Link,
  Phone,
  Mail,
  Clock,
  Star,
  CheckCircle,
  Play,
  Menu,
  X,
  Lock,
  Globe,
  Award,
  Zap,
  TrendingUp,
  Heart,
  ChevronDown,
  Users,
  Activity,
  Building2,
  Info
} from 'lucide-react';

export default function HomePage() {
  const { user, tenant } = useAuth();
  const router = useRouter();
  const [workspaceName, setWorkspaceName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect authenticated users with tenant to dashboard
  useEffect(() => {
    if (user && tenant) {
      router.push('/dashboard');
    }
  }, [user, tenant, router]);

  const features = [
    {
      icon: Home,
      title: 'Resident Care Management',
      description: 'Track health alerts, care plans, vitals, and logs from intake to discharge.',
      color: 'text-blue-700'
    },
    {
      icon: Pill,
      title: 'eMAR & MedPass',
      description: 'Reduce errors with smart med tracking, PRN logs, and pharmacy integration.',
      color: 'text-blue-700'
    },
    {
      icon: Calendar,
      title: 'Task Automation',
      description: 'Assign, schedule, and monitor daily care tasks with real-time updates.',
      color: 'text-blue-700'
    },
    {
      icon: UserCheck,
      title: 'Staff Oversight',
      description: 'Clock-ins, permissions, and KPIs—designed for small teams or multiple homes.',
      color: 'text-blue-700'
    },
    {
      icon: ClipboardCheck,
      title: 'Compliance Monitoring',
      description: 'Get alerts for expired licenses, missed assessments, or overdue drills.',
      color: 'text-blue-700'
    },
    {
      icon: Link,
      title: 'System Integrations',
      description: 'Sync with Medicaid, pharmacy systems, and digital tools (fax, SMS, e-sign).',
      color: 'text-blue-700'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Care Director',
      company: 'Sunrise Family Home',
      content: 'AFH Office transformed our daily operations. Med tracking is now error-free and state inspections are a breeze.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Administrator',
      company: 'Golden Years Care',
      content: 'The compliance alerts alone saved us from potential violations. Our staff loves the intuitive interface.',
      rating: 5
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Owner/Operator',
      company: 'Caring Hearts AFH',
      content: 'Finally, software built specifically for adult family homes. The ROI was immediate through time savings.',
      rating: 5
    }
  ];

  const trustBadges = [
    { label: 'HIPAA Ready', icon: Shield },
    { label: 'SOC 2 Type II', icon: Award },
    { label: '99.9% Uptime SLA', icon: Clock }
  ];

  const handleCreateWorkspace = async () => {
    if (!workspaceName || workspaceName.length < 3) return;
    
    setLoading(true);
    try {
      sessionStorage.setItem('pendingWorkspaceName', workspaceName);
      window.location.href = `/signin?intent=create&workspace=${encodeURIComponent(workspaceName)}`;
    } catch (error) {
      console.error('Error initiating workspace creation:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToWorkspace = () => {
    document.getElementById('workspace-creation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Header with Clickable Logo */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Clickable Logo */}
            <a 
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                const heroSection = document.getElementById('hero');
                if (heroSection) {
                  heroSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AFH Office</h1>
                <p className="text-xs text-gray-600 uppercase tracking-wider">Residential Care Software</p>
              </div>
            </a>
            
            {/* Center Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#pricing" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Reviews</a>
              <a href="#resources" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Resources</a>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.push('/signin')}
                className="hidden md:block px-5 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Sign In
              </button>
              <Button 
                onClick={scrollToWorkspace}
                className="px-5 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Start Free Trial
              </Button>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-3">
                <a href="#features" className="text-sm font-medium text-gray-700 hover:text-blue-600">Features</a>
                <a href="#pricing" className="text-sm font-medium text-gray-700 hover:text-blue-600">Pricing</a>
                <a href="#testimonials" className="text-sm font-medium text-gray-700 hover:text-blue-600">Reviews</a>
                <a href="#resources" className="text-sm font-medium text-gray-700 hover:text-blue-600">Resources</a>
                <button 
                  onClick={() => router.push('/signin')}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 text-left"
                >
                  Sign In
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Professional Hero Section with Light Background */}
      <section id="hero" className="relative min-h-[85vh] overflow-hidden bg-gradient-to-b from-blue-50 via-white to-gray-50">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="relative max-w-screen-xl mx-auto px-4 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                Trusted by 500+ care facilities nationwide
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Care Operations
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
                The all-in-one platform that revolutionizes adult family home management. 
                Streamline compliance, automate workflows, and deliver exceptional care.
              </p>
              
              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 mb-10 justify-center lg:justify-start">
                <div className="flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  HIPAA Compliant
                </div>
                <div className="flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium">
                  <Shield className="w-4 h-4 mr-2" />
                  Bank-Level Security
                </div>
                <div className="flex items-center px-4 py-2 bg-purple-50 border border-purple-200 rounded-full text-purple-700 text-sm font-medium">
                  <Clock className="w-4 h-4 mr-2" />
                  24/7 Support
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  onClick={scrollToWorkspace}
                  size="lg" 
                  className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto transform hover:-translate-y-1"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                </Button>
                <button 
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-semibold text-lg w-full sm:w-auto justify-center px-6 py-4 border-2 border-gray-300 hover:border-blue-300 rounded-xl transition-all bg-white shadow-md hover:shadow-lg"
                >
                  <div className="p-3 bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors">
                    <Info className="w-5 h-5" />
                  </div>
                  <span>Learn More</span>
                </button>
              </div>
            </div>

            {/* Right Column - Interactive Dashboard Preview */}
            <div className="relative lg:block animate-float">
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-xl opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-green-200 to-blue-200 rounded-full blur-xl opacity-60 animate-pulse animation-delay-2000"></div>
              
              {/* Dashboard Card */}
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-white text-sm font-medium">AFH Office Dashboard</div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Welcome Message */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h3 className="text-gray-900 font-semibold mb-1">Welcome back, Sarah</h3>
                    <p className="text-gray-600 text-sm">Here's your facility overview</p>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                      <Users className="w-5 h-5 text-blue-600 mb-2" />
                      <div className="text-2xl font-bold text-gray-900">6</div>
                      <div className="text-xs text-gray-600">Active Residents</div>
                      <div className="text-xs text-green-600 mt-1">Full Capacity</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                      <Activity className="w-5 h-5 text-purple-600 mb-2" />
                      <div className="text-2xl font-bold text-gray-900">18</div>
                      <div className="text-xs text-gray-600">Tasks Completed</div>
                      <div className="text-xs text-green-600 mt-1">100% ✓</div>
                    </div>
                  </div>
                  
                  {/* Recent Activity */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-900">Medication administered</div>
                        <div className="text-xs text-gray-500">John D. - 2 mins ago</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-900">Care plan updated</div>
                        <div className="text-xs text-gray-500">Mary S. - 15 mins ago</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-900">New admission scheduled</div>
                        <div className="text-xs text-gray-500">Tomorrow at 10:00 AM</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>Live Demo</span>
                </div>
              </div>
              
              {/* Scroll Indicator */}
              <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-gray-400 animate-bounce">
                <ChevronDown className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/50" />
        </div>
      </section>

      {/* Modern Workspace Creation Section */}
      <section id="workspace-creation" className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative max-w-screen-xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-4">
              <Zap className="w-4 h-4 mr-2" />
              Get Started in Under 3 Minutes
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Create Your Secure Workspace
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of care providers who've transformed their operations with our enterprise-grade platform
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left Column - Benefits */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise Security</h3>
                  <p className="text-gray-600">Bank-level encryption, HIPAA compliance, and SOC 2 Type II certification protect your sensitive data.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Unlimited Team Members</h3>
                  <p className="text-gray-600">Add your entire care team with role-based permissions and activity tracking.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Scalability</h3>
                  <p className="text-gray-600">Start with one facility and scale to multiple locations seamlessly as you grow.</p>
                </div>
              </div>
            </div>

            {/* Right Column - Workspace Form */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-10"></div>
              
              <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Start Your Free Trial</h3>
                  <p className="text-gray-600">No credit card required • 14 days free</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="workspaceName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Choose Your Workspace URL
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        id="workspaceName"
                        type="text"
                        value={workspaceName}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        className="w-full pl-10 pr-32 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition-all"
                        placeholder="your-company"
                      />
                      <div className="absolute right-3 top-4 text-sm text-gray-500 font-medium">
                        .afhoffice.com
                      </div>
                    </div>
                    {workspaceName && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">
                          Your workspace will be available at:{' '}
                          <span className="font-semibold">
                            {workspaceName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.afhoffice.com
                          </span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Trust Indicators */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">500+</div>
                      <div className="text-xs text-gray-600">Active Facilities</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">99.9%</div>
                      <div className="text-xs text-gray-600">Uptime SLA</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">24/7</div>
                      <div className="text-xs text-gray-600">Support</div>
                    </div>
                  </div>

                  <Button
                    onClick={handleCreateWorkspace}
                    disabled={!workspaceName || workspaceName.length < 3 || loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02]"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Workspace...
                      </span>
                    ) : (
                      'Create My Workspace →'
                    )}
                  </Button>

                  <p className="text-center text-xs text-gray-500">
                    By creating a workspace, you agree to our{' '}
                    <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Features Section */}
      <section id="features" className="relative py-24 bg-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-50 to-blue-50 rounded-full filter blur-3xl opacity-30"></div>

        <div className="relative max-w-screen-xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-700 text-sm font-medium mb-4">
              <Award className="w-4 h-4 mr-2" />
              Purpose-Built for Healthcare
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed specifically for adult family homes, backed by industry expertise
            </p>
          </div>

          {/* Features Grid with Hover Effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-100 hover:-translate-y-1"
              >
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  {/* Icon Container */}
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  
                  {/* Learn More Link */}
                  <a href="#" className="inline-flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Features Banner */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full filter blur-3xl"></div>
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">Plus Advanced Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    <span>Real-time collaboration tools</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    <span>Advanced analytics and reporting</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    <span>Custom integrations and API access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    <span>White-label options available</span>
                  </li>
                </ul>
              </div>
              <div className="text-center lg:text-right">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
                  Explore All Features →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Testimonials Section */}
      <section id="testimonials" className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400 to-purple-400 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative max-w-screen-xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full text-green-700 text-sm font-medium mb-4">
              <Star className="w-4 h-4 mr-2" />
              Loved by Care Providers
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See why hundreds of facilities choose AFH Office to transform their operations
            </p>
          </div>

          {/* Trust Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { value: '500+', label: 'Active Facilities', icon: Building2 },
              { value: '50k+', label: 'Residents Served', icon: Users },
              { value: '4.9/5', label: 'Average Rating', icon: Star },
              { value: '99.9%', label: 'Uptime SLA', icon: Shield }
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-4">
                  <metric.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonials Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-6xl text-blue-100 font-serif">"</div>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                {/* Content */}
                <blockquote className="relative text-gray-700 text-lg leading-relaxed mb-6 italic">
                  {testimonial.content}
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-blue-600">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-600 mb-6">Certified and Compliant</p>
            <div className="flex flex-wrap items-center justify-center gap-12">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center space-x-3 px-6 py-3 bg-white rounded-xl shadow-md">
                  <badge.icon className="w-8 h-8 text-blue-600" />
                  <span className="font-semibold text-gray-900">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-screen-xl mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to Transform Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                Care Operations?
              </span>
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Join the digital revolution in residential care. Start your free trial today and experience the difference.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <Button 
                onClick={scrollToWorkspace}
                size="lg" 
                className="group bg-white text-purple-600 hover:bg-gray-100 px-10 py-5 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
              >
                Start Your Free Trial
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
              <button className="group flex items-center space-x-3 text-white font-bold text-lg px-8 py-5 border-2 border-white/30 rounded-2xl hover:bg-white/10 backdrop-blur-sm transition-all">
                <Phone className="w-6 h-6" />
                <span>Schedule a Demo</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-white/80 text-sm">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-gray-900 text-gray-300">
        {/* Main Footer Content */}
        <div className="max-w-screen-xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">AFH Office</h3>
                  <p className="text-xs text-gray-400">Residential Care Software</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-sm">
                Empowering adult family homes with modern software solutions that streamline operations and improve resident care.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="border-t border-gray-800 pt-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-white font-semibold mb-2">Stay Updated</h4>
                <p className="text-gray-400">Get the latest updates on features and industry insights.</p>
              </div>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-screen-xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} AFH Office. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                <a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
