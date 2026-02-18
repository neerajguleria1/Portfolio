import { RouterProvider, useRouter } from './router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';



// Admin Pages
import AdminPanel from './Admin/AdminPanel';
import AdminLogin from "./Admin/AdminLogin";
import AdminPosts from "./Admin/AdminPosts";
import AdminCreatePost from "./Admin/AdminCreatePost";
import AdminUpdatePost from "./Admin/AdminUpdate";

function AppContent() {
  const { currentPath } = useRouter();

  // ✅ Check if current path belongs to admin route
  const isAdminPage = currentPath.startsWith("/admin");

  // ✅ Route pages
  const renderPage = () => {
    if (currentPath === '/') return <HomePage />;
    if (currentPath === '/about') return <AboutPage />;
    if (currentPath === '/services') return <ServicesPage />;
    if (currentPath === '/projects') return <ProjectsPage />;
    if (currentPath === '/blog' || currentPath.startsWith('/blog/')) return <BlogPage />;
    if (currentPath === '/contact') return <ContactPage />;

    // ✅ Admin Routes
    if (currentPath === '/admin/login') return <AdminLogin />;
    if (currentPath === '/admin') return <AdminPanel />;
    if (currentPath === '/admin/posts') return <AdminPosts />;
    if(currentPath === '/admin/create-post') return <AdminCreatePost />;
    // ✅ Dynamic route for edit page
    if (currentPath.startsWith("/admin/update-post/")) return <AdminUpdatePost />;

    return <HomePage />; // fallback
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
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
