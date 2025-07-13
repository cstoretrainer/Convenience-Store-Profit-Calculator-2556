import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiTrendingDown } = FiIcons;

const MetricCard = ({ title, value, change, icon, trend }) => {
  const isPositive = trend === 'up';
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            isPositive ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <SafeIcon 
              icon={icon} 
              className={`w-5 h-5 ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`} 
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          <SafeIcon 
            icon={isPositive ? FiTrendingUp : FiTrendingDown} 
            className="w-4 h-4" 
          />
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;