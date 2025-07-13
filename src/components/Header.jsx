import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiDollarSign, FiCalculator, FiBarChart3, FiSettings, FiHelpCircle } = FiIcons;

const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: FiBarChart3 },
    { path: '/calculator', label: 'Calculator', icon: FiCalculator },
    { path: '/analytics', label: 'Analytics', icon: FiBarChart3 },
    { path: '/settings', label: 'Settings', icon: FiSettings },
  ];

  const openHelp = () => {
    // Trigger help hub programmatically if needed
    const helpButton = document.querySelector('[data-quest-help-trigger]');
    if (helpButton) {
      helpButton.click();
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200" style={{ zIndex: 1000 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <SafeIcon icon={FiDollarSign} className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ProfitMax</h1>
              <p className="text-sm text-gray-500">Dynamic Pricing Calculator</p>
            </div>
          </div>
          
          <nav className="flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <div className={`flex items-center space-x-2 ${
                  location.pathname === item.path
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}>
                  <SafeIcon icon={item.icon} className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-50 rounded-lg -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
            
            <button
              onClick={openHelp}
              className="px-4 py-2 rounded-lg transition-colors duration-200 text-gray-600 hover:text-blue-600"
              title="Get Help"
            >
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiHelpCircle} className="w-4 h-4" />
                <span className="text-sm font-medium">Help</span>
              </div>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;