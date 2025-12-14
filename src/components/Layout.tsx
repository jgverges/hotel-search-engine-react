import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Hotel } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Hotel className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">StayFinder </span>
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 StayFinder . All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

