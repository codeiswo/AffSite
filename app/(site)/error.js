'use client';

import Link from 'next/link';

export default function SiteError({ error, reset }) {
  return (
    <div className="pt-28 pb-20 bg-surface dark:bg-surface-dark min-h-screen flex items-center justify-center">
      <div className="text-center px-4 max-w-lg">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-3">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
          An unexpected error occurred. Please try refreshing the page.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-500 transition-all"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
