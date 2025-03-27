// app/not-found.tsx OR app/dashboard/not-found.tsx
export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center text-center">
      <div>
        <h1 className="text-4xl font-bold text-red-600 mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600">
          Sorry, the page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
}
