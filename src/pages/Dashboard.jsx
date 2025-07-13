import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import MetricCard from '../components/MetricCard';
import QuickCalculator from '../components/QuickCalculator';
import RecentAnalyses from '../components/RecentAnalyses';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiDollarSign, FiPercent, FiShoppingCart } = FiIcons;

const Dashboard = () => {
  const [metrics] = useState({
    totalRevenue: 45680,
    profitMargin: 18.5,
    avgTransaction: 12.30,
    dynamicPricingImpact: 8.2
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor your store's performance and pricing strategies</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Monthly Revenue"
          value={`$${metrics.totalRevenue.toLocaleString()}`}
          change="+12.5%"
          icon={FiDollarSign}
          trend="up"
        />
        <MetricCard
          title="Profit Margin"
          value={`${metrics.profitMargin}%`}
          change="+2.3%"
          icon={FiPercent}
          trend="up"
        />
        <MetricCard
          title="Avg Transaction"
          value={`$${metrics.avgTransaction}`}
          change="+5.1%"
          icon={FiShoppingCart}
          trend="up"
        />
        <MetricCard
          title="Dynamic Pricing Impact"
          value={`+${metrics.dynamicPricingImpact}%`}
          change="+1.8%"
          icon={FiTrendingUp}
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <QuickCalculator />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <RecentAnalyses />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;