import { RouterProvider, useRouter } from './router';
import { lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import analytics from './lib/analytics';

// Critical pages - load immediately
import HomePage from './pages/HomePage';

// Lazy load non-critical pages
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminPanel = lazy(() => import('./Admin/AdminPanel'));
const AdminLogin = lazy(() => import('./Admin/AdminLogin'));
const AdminPosts = lazy(() => import('./Admin/AdminPosts'));
const AdminCreatePost = lazy(() => import('./Admin/AdminCreatePost'));
const AdminUpdatePost = lazy(() => import('./Admin/AdminUpdate'));

function AppContent() {
  const { currentPath } = useRouter();

  useEffect(() => {
    // Initialize analytics
    const gaId = import.meta.env.VITE_GA_ID;
    if (gaId) analytics.init(gaId);
  }, []);

  useEffect(() => {
    // Track page views
    analytics.trackPageView(currentPath);
    
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [currentPath]);

  // ✅ Check if current path belongs to admin route
  const isAdminPage = currentPath.startsWith("/admin");

  // ✅ Route pages with Suspense
  const renderPage = () => {
    const routes: Record<string, JSX.Element> = {
      '/': <HomePage />,
      '/about': <Suspense fallback={<LoadingSpinner />}><AboutPage /></Suspense>,
      '/services': <Suspense fallback={<LoadingSpinner />}><ServicesPage /></Suspense>,
      '/projects': <Suspense fallback={<LoadingSpinner />}><ProjectsPage /></Suspense>,
      '/contact': <Suspense fallback={<LoadingSpinner />}><ContactPage /></Suspense>,
      '/admin/login': <Suspense fallback={<LoadingSpinner />}><AdminLogin /></Suspense>,
      '/admin': <Suspense fallback={<LoadingSpinner />}><AdminPanel /></Suspense>,
      '/admin/posts': <Suspense fallback={<LoadingSpinner />}><AdminPosts /></Suspense>,
      '/admin/create-post': <Suspense fallback={<LoadingSpinner />}><AdminCreatePost /></Suspense>,
    };

    if (currentPath.startsWith('/blog')) {
      return <Suspense fallback={<LoadingSpinner />}><BlogPage /></Suspense>;
    }
    if (currentPath.startsWith('/admin/update-post/')) {
      return <Suspense fallback={<LoadingSpinner />}><AdminUpdatePost /></Suspense>;
    }

    return routes[currentPath] || <HomePage />;
  };

  // ✅ If admin page — DO NOT show Navbar/Footer
  if (isAdminPage) {
    return <main>{renderPage()}</main>;
  }

  // ✅ Normal layout with Navbar + Footer
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </ErrorBoundary>
  );
}
