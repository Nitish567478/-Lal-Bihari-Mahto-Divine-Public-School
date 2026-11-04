import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory, useLocation } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import MissionVision from "./pages/MissionVision";
import DirectorsMessage from "./pages/DirectorsMessage";
import RulesRegulations from "./pages/RulesRegulations";
import HostelFacility from "./pages/HostelFacility";
import Transportation from "./pages/Transportation";
import CCTVSecurity from "./pages/CCTVSecurity";
import FeeStructure from "./pages/FeeStructure";
import SmartClassrooms from "./pages/SmartClassrooms";
import Library from "./pages/Library";
import ComputerLabs from "./pages/ComputerLabs";
import ScienceLaboratories from "./pages/ScienceLaboratories";
import Playground from "./pages/Playground";
import ArtRoom from "./pages/ArtRoom";
import StaffRoom from "./pages/StaffRoom";

// Academic Wing Pages
import Academic from "./pages/Academic";
import PrePrimaryWing from "./pages/PrePrimaryWing";
import PrimaryWing from "./pages/PrimaryWing";
import MiddleWing from "./pages/MiddleWing";
import SeniorSecondaryWing from "./pages/SeniorSecondaryWing";
import Examinations from "./pages/Examinations";

import Admission from "./pages/Admission";
import Blog from "./pages/Blog";
import Facility from "./pages/Facility";
import Gallery from "./pages/Gallery";
import Music from "./pages/Music";
import Video from "./pages/Video";
import Hotel from "./pages/Hotel";
import Notices from "./pages/Notices";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AccountantDashboard from "./pages/AccountantDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import NotFound from "./pages/NotFound";
import WelcomePopup from "./components/WelcomePopup";
import AIAssistant from "./components/AIAssistant";
import WhatsAppWidget from "./components/WhatsAppWidget";

import "./App.css";

// Secret Keyboard Shortcut Listener for Staff Portal (Alt + L or Ctrl + Shift + L)
const SecretPortalShortcutListener = () => {
  const history = useHistory();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Shortcut: Alt + L or Ctrl + Shift + L
      if ((e.altKey && e.key.toLowerCase() === 'l') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l')) {
        e.preventDefault();
        history.push('/login');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history]);

  return null;
};

// Scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

// Helper to resolve authenticated role with Super Admin priority
const getAuthUserRole = () => {
  try {
    const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
    if (authUser.role === 'super_admin') return 'super_admin';
    if (authUser.role) return authUser.role;
  } catch (e) {}
  return localStorage.getItem('userRole') || '';
};

// Protected Admin Route (Strictly Admin or Super Admin)
const AdminRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('adminToken');
  const role = getAuthUserRole();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!token) return <Redirect to="/login?role=admin" />;
        // Only super_admin or admin can access admin portal
        if (role === 'super_admin' || role === 'admin') {
          return <Component {...props} />;
        }
        if (role === 'accountant') return <Redirect to="/accountant/dashboard" />;
        if (role === 'teacher') return <Redirect to="/teacher/dashboard" />;
        if (role === 'student') return <Redirect to="/student/dashboard" />;
        if (role === 'parent') return <Redirect to="/parent/dashboard" />;
        return <Redirect to="/login?role=admin" />;
      }}
    />
  );
};

// Protected Accountant Route (Strictly Accountant or Super Admin)
const AccountantRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('adminToken');
  const role = getAuthUserRole();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!token) return <Redirect to="/login?role=accountant" />;
        // Only super_admin or accountant can access accountant portal
        if (role === 'super_admin' || role === 'accountant') {
          return <Component {...props} />;
        }
        if (role === 'admin') return <Redirect to="/admin/dashboard" />;
        if (role === 'teacher') return <Redirect to="/teacher/dashboard" />;
        if (role === 'student') return <Redirect to="/student/dashboard" />;
        if (role === 'parent') return <Redirect to="/parent/dashboard" />;
        return <Redirect to="/login?role=accountant" />;
      }}
    />
  );
};

// Protected Teacher Route (Strictly Teacher or Super Admin)
const TeacherRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('adminToken');
  const role = getAuthUserRole();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!token) return <Redirect to="/login?role=teacher" />;
        // Only super_admin or teacher can access teacher portal
        if (role === 'super_admin' || role === 'teacher') {
          return <Component {...props} />;
        }
        if (role === 'admin') return <Redirect to="/admin/dashboard" />;
        if (role === 'accountant') return <Redirect to="/accountant/dashboard" />;
        if (role === 'student') return <Redirect to="/student/dashboard" />;
        if (role === 'parent') return <Redirect to="/parent/dashboard" />;
        return <Redirect to="/login?role=teacher" />;
      }}
    />
  );
};

// Protected Student Route (Must login to access)
const StudentRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('adminToken');
  const role = getAuthUserRole();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!token) return <Redirect to="/login?role=student" />;
        // Only super_admin or student can access student portal
        if (role === 'super_admin' || role === 'student') {
          return <Component {...props} isDemoMode={false} />;
        }
        if (role === 'admin') return <Redirect to="/admin/dashboard" />;
        if (role === 'accountant') return <Redirect to="/accountant/dashboard" />;
        if (role === 'teacher') return <Redirect to="/teacher/dashboard" />;
        if (role === 'parent') return <Redirect to="/parent/dashboard" />;
        return <Redirect to="/login?role=student" />;
      }}
    />
  );
};

// Protected Parent Route (Must login to access)
const ParentRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('adminToken');
  const role = getAuthUserRole();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!token) return <Redirect to="/login?role=parent" />;
        // Only super_admin or parent can access parent portal
        if (role === 'super_admin' || role === 'parent') {
          return <Component {...props} isDemoMode={false} />;
        }
        if (role === 'admin') return <Redirect to="/admin/dashboard" />;
        if (role === 'accountant') return <Redirect to="/accountant/dashboard" />;
        if (role === 'teacher') return <Redirect to="/teacher/dashboard" />;
        if (role === 'student') return <Redirect to="/student/dashboard" />;
        return <Redirect to="/login?role=parent" />;
      }}
    />
  );
};

// Login Route (if logged in, redirects to respective dashboard)
const LoginRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('adminToken');
  const role = getAuthUserRole();

  let targetPath = '/admin/dashboard';
  if (role === 'accountant') targetPath = '/accountant/dashboard';
  if (role === 'teacher') targetPath = '/teacher/dashboard';
  if (role === 'student') targetPath = '/student/dashboard';
  if (role === 'parent') targetPath = '/parent/dashboard';

  return (
    <Route
      {...rest}
      render={(props) =>
        !token ? <Component {...props} /> : <Redirect to={targetPath} />
      }
    />
  );
};

const AppContent = () => {
  const location = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const isPortalRoute = [
    '/admin',
    '/accountant',
    '/teacher',
    '/student',
    '/parent',
    '/login',
  ].some((path) => location.pathname.startsWith(path));

  useEffect(() => {
    setIsPageLoading(true);
    const loadingTimer = window.setTimeout(() => setIsPageLoading(false), 450);
    return () => window.clearTimeout(loadingTimer);
  }, [location.pathname, location.search]);

  return (
    <div
      className={`app-root ${isPortalRoute ? 'portal-route-root' : ''}`}
      aria-busy={isPageLoading}
    >
      {isPageLoading && (
        <div className="site-loader" role="status" aria-live="polite" aria-label="Loading page">
          <div className="site-loader-card">
            <img src="/school-logo.png" alt="" className="site-loader-logo" />
            <span className="site-loader-spinner" aria-hidden="true"></span>
            <strong>LBMDPS</strong>
            <span className="site-loader-caption">Preparing your school experience</span>
          </div>
        </div>
      )}
      <ScrollToTop />
      <SecretPortalShortcutListener />
      {/* Global Welcome & Admission Popup (Displays only on public website pages) */}
      {!isPortalRoute && <WelcomePopup />}
      {/* 24/7 AI-Powered Interactive Admission Assistant Chatbot & Real-Time CRM Sync */}
      {!isPortalRoute && <AIAssistant />}
      {/* Fixed WhatsApp & Direct Call Widget (9162789001) */}
      {!isPortalRoute && <WhatsAppWidget />}
      <Switch>
        {/* Public Website Routes */}
        <Route exact path="/" component={Home} />
        
        {/* About Dropdown Pages */}
        <Route exact path="/about" component={About} />
        <Route exact path="/about-us" render={() => <Redirect to="/about" />} />
        <Route exact path="/mission-vision" component={MissionVision} />
        <Route exact path="/directors-message" component={DirectorsMessage} />
        <Route exact path="/rules-regulations" component={RulesRegulations} />

        {/* Infrastructure / Facilities Dropdown Pages */}
        <Route exact path="/infrastructure" component={Facility} />
        <Route exact path="/facility" component={Facility} />
        <Route exact path="/facilities" render={() => <Redirect to="/facility" />} />
        <Route exact path="/campus" render={() => <Redirect to="/facility" />} />
        <Route exact path="/campus-facilities" render={() => <Redirect to="/facility" />} />
        <Route exact path="/smart-classrooms" component={SmartClassrooms} />
        <Route exact path="/library" component={Library} />
        <Route exact path="/computer-labs" component={ComputerLabs} />
        <Route exact path="/science-laboratories" component={ScienceLaboratories} />
        <Route exact path="/playground-sports" component={Playground} />
        <Route exact path="/sports" render={() => <Redirect to="/playground-sports" />} />
        <Route exact path="/playground" render={() => <Redirect to="/playground-sports" />} />
        <Route exact path="/art-room" component={ArtRoom} />
        <Route exact path="/staff-room" component={StaffRoom} />
        <Route exact path="/hostel-facility" component={HostelFacility} />
        <Route exact path="/transportation" component={Transportation} />
        <Route exact path="/cctv-security" component={CCTVSecurity} />

        {/* Admissions Dropdown & Aliases */}
        <Route exact path="/admissions" component={Admission} />
        <Route exact path="/admission" render={() => <Redirect to="/admissions" />} />
        <Route exact path="/apply" render={() => <Redirect to="/admissions" />} />
        <Route exact path="/apply-online" render={() => <Redirect to="/admissions" />} />
        <Route exact path="/online-admission" render={() => <Redirect to="/admissions" />} />
        <Route exact path="/admissions-2026-27" render={() => <Redirect to="/admissions" />} />
        <Route exact path="/fee-structure" component={FeeStructure} />
        <Route exact path="/fees" render={() => <Redirect to="/fee-structure" />} />
        <Route exact path="/fee" render={() => <Redirect to="/fee-structure" />} />

        {/* Academics Dropdown & Dedicated Wings */}
        <Route exact path="/academic" component={Academic} />
        <Route exact path="/academics" render={() => <Redirect to="/academic" />} />
        <Route exact path="/curriculum" render={() => <Redirect to="/academic" />} />
        <Route exact path="/syllabus" render={() => <Redirect to="/academic" />} />
        <Route exact path="/pre-primary-wing" component={PrePrimaryWing} />
        <Route exact path="/primary-wing" component={PrimaryWing} />
        <Route exact path="/middle-wing" component={MiddleWing} />
        <Route exact path="/senior-secondary-wing" component={SeniorSecondaryWing} />
        <Route exact path="/secondary-wing" component={SeniorSecondaryWing} />
        <Route exact path="/examinations" component={Examinations} />
        <Route exact path="/examination" render={() => <Redirect to="/examinations" />} />
        <Route exact path="/exams" render={() => <Redirect to="/examinations" />} />
        <Route exact path="/results" render={() => <Redirect to="/examinations" />} />
        <Route exact path="/faculty" render={() => <Redirect to="/about" />} />

        {/* Media & Other Pages */}
        <Route exact path="/gallery" component={Gallery} />
        <Route exact path="/photos" render={() => <Redirect to="/gallery" />} />
        <Route exact path="/music" component={Music} />
        <Route exact path="/videos" component={Video} />
        <Route exact path="/video" render={() => <Redirect to="/videos" />} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/hotels" component={Hotel} />
        <Route exact path="/notices" component={Notices} />
        <Route exact path="/notice" render={() => <Redirect to="/notices" />} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/contact-us" render={() => <Redirect to="/contact" />} />

        {/* Legal & Compliance Routes */}
        <Route exact path="/privacy-policy" component={PrivacyPolicy} />
        <Route exact path="/privacy" render={() => <Redirect to="/privacy-policy" />} />
        <Route exact path="/privacypolicy" render={() => <Redirect to="/privacy-policy" />} />
        <Route exact path="/terms-of-service" component={TermsOfService} />
        <Route exact path="/terms" render={() => <Redirect to="/terms-of-service" />} />
        <Route exact path="/termsofservice" render={() => <Redirect to="/terms-of-service" />} />
        <Route exact path="/terms-and-conditions" render={() => <Redirect to="/terms-of-service" />} />
        <Route exact path="/terms-conditions" render={() => <Redirect to="/terms-of-service" />} />
        
        {/* Multi-Role Auth Routes */}
        <LoginRoute exact path="/login" component={Login} />
        <Route exact path="/admin/login" render={() => <Redirect to="/login?role=admin" />} />
        <Route exact path="/portal" render={() => <Redirect to="/login" />} />
        <Route exact path="/portal-login" render={() => <Redirect to="/login" />} />
        <Route exact path="/staff-login" render={() => <Redirect to="/login" />} />
        <Route exact path="/teacher-login" render={() => <Redirect to="/login?role=teacher" />} />
        <Route exact path="/student-login" render={() => <Redirect to="/login?role=student" />} />
        <Route exact path="/parent-login" render={() => <Redirect to="/login?role=parent" />} />
        
        {/* Role-Protected Portals */}
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/portal" component={AdminDashboard} />
        <AdminRoute exact path="/admin" render={() => <Redirect to="/admin/dashboard" />} />
        
        <AccountantRoute exact path="/accountant/dashboard" component={AccountantDashboard} />
        <AccountantRoute exact path="/accountant" render={() => <Redirect to="/accountant/dashboard" />} />
        
        <TeacherRoute exact path="/teacher/dashboard" component={TeacherDashboard} />
        <TeacherRoute exact path="/teacher" render={() => <Redirect to="/teacher/dashboard" />} />
        
        <StudentRoute exact path="/student/dashboard" component={StudentDashboard} />
        <StudentRoute exact path="/student/portal" render={() => <Redirect to="/student/dashboard" />} />
        <StudentRoute exact path="/student" render={() => <Redirect to="/student/dashboard" />} />
        
        <ParentRoute exact path="/parent/dashboard" component={ParentDashboard} />
        <ParentRoute exact path="/parent/portal" render={() => <Redirect to="/parent/dashboard" />} />
        <ParentRoute exact path="/parent" render={() => <Redirect to="/parent/dashboard" />} />

        {/* Generic /dashboard redirect (Must login first) */}
        <Route exact path="/dashboard" render={() => {
          const token = localStorage.getItem('adminToken');
          if (!token) return <Redirect to="/login" />;
          const role = getAuthUserRole();
          if (role === 'accountant') return <Redirect to="/accountant/dashboard" />;
          if (role === 'teacher') return <Redirect to="/teacher/dashboard" />;
          if (role === 'student') return <Redirect to="/student/dashboard" />;
          if (role === 'parent') return <Redirect to="/parent/dashboard" />;
          return <Redirect to="/admin/dashboard" />;
        }} />
        
        {/* 404 Handling */}
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router> 
);

export default App;
