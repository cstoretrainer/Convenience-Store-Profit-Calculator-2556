import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import ProfitChart from '../components/ProfitChart';
import DemandChart from '../components/DemandChart';
import TimeAnalysis from '../components/TimeAnalysis';
import * as FiIcons from 'react-icons/fi';

const { FiBarChart3, FiTrendingUp, FiClock } = FiIcons;

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('profit');

  const timeRanges = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const metrics = [
    { value: 'profit', label: 'Profit', icon: FiTrendingUp },
    { value: 'demand', label: 'Demand', icon: FiBarChart3 },
    { value: 'time', label: 'Time Analysis', icon: FiClock }
  ];

  const renderChart = () => {
    switch (selectedMetric) {
      case 'profit':
        return <ProfitChart timeRange={timeRange} />;
      case 'demand':
        return <DemandChart timeRange={timeRange} />;
      case 'time':
        return <TimeAnalysis timeRange={timeRange} />;
      default:
        return <ProfitChart timeRange={timeRange} />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Deep dive into your pricing performance</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-1 mb-6">
          {metrics.map(metric => (
            <motion.button
              key={metric.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMetric(metric.value)}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                selectedMetric === metric.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <SafeIcon icon={metric.icon} className="w-4 h-4" />
              <span className="text-sm font-medium">{metric.label}</span>
            </motion.button>
          ))}
        </div>

        <motion.div
          key={selectedMetric}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderChart()}
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;