// app/error.tsx
'use client'; // Error components must be client components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error captured by error.tsx:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-red-50 px-4 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Something went wrong!
      </h1>
      <p className="text-gray-700 mb-6">
        {error.message || 'An unexpected error has occurred. Please try again.'}
      </p>
      <button
        onClick={() => reset()}
        className="rounded bg-red-600 px-5 py-2 text-white hover:bg-red-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}
