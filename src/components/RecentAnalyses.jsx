import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiClock, FiTrendingUp, FiTrendingDown } = FiIcons;

const RecentAnalyses = () => {
  const analyses = [
    {
      id: 1,
      product: 'Energy Drinks',
      date: '2024-01-15',
      profitChange: '+$45.30',
      trend: 'up',
      scenario: 'Peak Hours +15%'
    },
    {
      id: 2,
      product: 'Coffee',
      date: '2024-01-14',
      profitChange: '+$23.80',
      trend: 'up',
      scenario: 'Morning Rush +10%'
    },
    {
      id: 3,
      product: 'Snacks',
      date: '2024-01-13',
      profitChange: '-$12.50',
      trend: 'down',
      scenario: 'Competitor Match -5%'
    },
    {
      id: 4,
      product: 'Soft Drinks',
      date: '2024-01-12',
      profitChange: '+$67.20',
      trend: 'up',
      scenario: 'Hot Weather +20%'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <SafeIcon icon={FiClock} className="w-5 h-5 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-900">Recent Analyses</h2>
      </div>

      <div className="space-y-4">
        {analyses.map((analysis, index) => (
          <motion.div
            key={analysis.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                analysis.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <SafeIcon 
                  icon={analysis.trend === 'up' ? FiTrendingUp : FiTrendingDown}
                  className={`w-4 h-4 ${
                    analysis.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}
                />
              </div>
              <div>
                <p className="font-medium text-gray-900">{analysis.product}</p>
                <p className="text-sm text-gray-500">{analysis.scenario}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${
                analysis.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {analysis.profitChange}
              </p>
              <p className="text-sm text-gray-500">{analysis.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentAnalyses;