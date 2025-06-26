export default function PendingPage() {
  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Account Setup Pending
        </h1>
        <p className="text-gray-600 mb-6 max-w-md">
          Your workspace is being set up. This usually takes just a few minutes.
          You'll receive an email notification when it's ready.
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
            <span className="text-sm text-gray-600">Setting up your workspace...</span>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="inline-block bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
} 