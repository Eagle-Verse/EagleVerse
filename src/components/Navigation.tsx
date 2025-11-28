import React, { useState, useEffect } from "react";
import { Sparkles, Users, BarChart3, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/results", label: "Results" },
  // { to: '/partner', label: 'Partner' },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-8 left-0 w-full z-40 transition-all duration-300 ${scrolled
          ? "border-b border-navy-800/50 bg-navy-950 shadow-lg"
          : "border-b border-navy-800/30 bg-navy-950"
        }`}
    >
      <div className="w-full py-3 sm:py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between max-w-7xl mx-auto">
        {/* Brand */}
        <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
          <div className="bg-coral-500 p-1.5 sm:p-2 rounded-xl group-hover:scale-110 transition-transform">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <span className="text-xl sm:text-2xl font-serif font-bold text-navy-50 group-hover:text-coral-400 transition-colors">
            EagleVerse
          </span>
        </Link>

        {/* Desktop Navigation - Center Links */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <div className="flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`font-medium transition-all duration-200 py-2 px-3 rounded-lg hover:bg-navy-800/50 ${currentPath === item.to
                    ? "text-coral-400 bg-coral-500/10"
                    : "text-navy-200 hover:text-coral-400"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Navigation - Right Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Try Demo */}
          <Link
            to="/demo"
            className={`font-medium flex items-center space-x-2 transition-all duration-200 py-2 px-3 rounded-lg hover:bg-navy-800/50 ${currentPath === "/demo"
                ? "text-coral-400 bg-coral-500/10"
                : "text-navy-200 hover:text-coral-400"
              }`}
          >
            <span>Try Demo</span>
          </Link>
          {/* Partner With US */}
          <Link
            to="/partner"
            className="btn-secondary flex items-center space-x-2 text-sm font-medium py-2 px-4 hover:scale-105 transition-transform"
          >
            <span>Partner With Us</span>
          </Link>
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="lg:hidden">
          <button
            className="text-navy-200 hover:text-coral-400 transition-colors p-2 hover:bg-navy-800/50 rounded-lg"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 animate-fade-in"
            onClick={() => setMobileOpen(false)}
          ></div>

          {/* Drawer Content */}
          <div className="fixed top-0 right-0 h-full w-[90vw] max-w-sm bg-navy-900 shadow-2xl p-4 sm:p-6 flex flex-col animate-slide-in">
            <button
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-coral-400 hover:bg-navy-800/50 rounded-lg transition-colors"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
            >
              <X className="h-6 w-6 sm:h-8 sm:w-8" />
            </button>

            <div className="flex flex-col space-y-2 sm:space-y-4 w-full items-start mt-12 sm:mt-16">
              <div className="flex items-center space-x-2 sm:space-x-3 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-navy-800 w-full">
                <div className="bg-coral-500 p-1.5 sm:p-2 rounded-xl">
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-serif font-bold text-navy-50">
                  EagleVerse
                </span>
              </div>

              {navLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-left py-3 sm:py-4 px-3 sm:px-4 rounded-lg font-medium transition-colors text-lg sm:text-xl w-full ${currentPath === item.to
                      ? "text-coral-400 bg-coral-500/10 border border-coral-500/20"
                      : "text-navy-200 hover:text-coral-400 hover:bg-navy-800"
                    }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                to="/demo"
                className={`text-left py-3 sm:py-4 px-3 sm:px-4 rounded-lg font-medium flex items-center space-x-2 sm:space-x-3 transition-colors text-lg sm:text-xl w-full ${currentPath === "/demo"
                    ? "text-coral-400 bg-coral-500/10 border border-coral-500/20"
                    : "text-navy-200 hover:text-coral-400 hover:bg-navy-800"
                  }`}
                onClick={() => setMobileOpen(false)}
              >
                <span>Try Demo</span>
              </Link>

              <Link
                to="/partner"
                className="btn-secondary flex items-center space-x-2 text-sm font-medium py-2 px-4 hover:scale-105 transition-transform"
              >
                <span>Partner With Us</span>
              </Link>
            </div>
          </div>

          <style>
            {`
              @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
              }
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              .animate-slide-in {
                animation: slideIn 0.3s ease-out;
              }
              .animate-fade-in {
                animation: fadeIn 0.3s ease-out;
              }
            `}
          </style>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
