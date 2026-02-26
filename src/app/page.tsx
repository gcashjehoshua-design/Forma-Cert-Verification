'use client';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 1 1 0 000 2H3a1 1 0 00-1 1v10a1 1 0 001 1h14a1 1 0 001-1V6a1 1 0 00-1-1h-3a1 1 0 000-2h3a3 3 0 013 3v10a3 3 0 01-3 3H6a3 3 0 01-3-3V5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Certificate Verification
          </h1>
          <p className="text-slate-600 text-sm mb-6">
            Scan the QR code on your certificate to verify its authenticity.
          </p>
          <div className="bg-slate-50 rounded p-4 text-left text-xs text-slate-600">
            <p className="font-semibold mb-2">How it works:</p>
            <ol className="space-y-2">
              <li>1. Open your certificate PDF</li>
              <li>2. Scan the QR code with your phone camera</li>
              <li>3. Verify the certificate details</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
