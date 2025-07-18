export default function SuspendedPage() {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 18.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Account Suspended
        </h1>
        <p className="text-gray-600 mb-6 max-w-md">
          Your account has been temporarily suspended. This may be due to payment issues 
          or terms of service violations.
        </p>
        <div className="space-y-3">
          <p className="text-sm text-gray-500">
            Please contact support to resolve this issue:
          </p>
          <a 
            href="mailto:support@afhoffice.com" 
            className="inline-block bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
} 