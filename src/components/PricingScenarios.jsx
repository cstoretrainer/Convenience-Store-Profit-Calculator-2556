import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTarget, FiTrendingUp, FiUsers } = FiIcons;

const PricingScenarios = ({ scenarios, setScenarios }) => {
  const scenarioTypes = [
    {
      key: 'static',
      title: 'Static Pricing',
      description: 'Fixed prices throughout the day',
      icon: FiTarget,
      color: 'blue'
    },
    {
      key: 'dynamic',
      title: 'Dynamic Pricing',
      description: 'Prices adjust based on demand',
      icon: FiTrendingUp,
      color: 'green'
    },
    {
      key: 'competitive',
      title: 'Competitive Pricing',
      description: 'Match or beat competitor prices',
      icon: FiUsers,
      color: 'purple'
    }
  ];

  const updateScenario = (key, field, value) => {
    setScenarios(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: parseFloat(value) || 0
      }
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <SafeIcon icon={FiTarget} className="w-5 h-5 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-900">Pricing Scenarios</h2>
      </div>

      <div className="space-y-4">
        {scenarioTypes.map((scenario) => (
          <motion.div
            key={scenario.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className={`p-2 rounded-lg bg-${scenario.color}-100`}>
                <SafeIcon 
                  icon={scenario.icon} 
                  className={`w-4 h-4 text-${scenario.color}-600`}
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{scenario.title}</h3>
                <p className="text-sm text-gray-600">{scenario.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profit Margin
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={scenarios[scenario.key].margin}
                  onChange={(e) => updateScenario(scenario.key, 'margin', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Volume
                </label>
                <input
                  type="number"
                  value={scenarios[scenario.key].volume}
                  onChange={(e) => updateScenario(scenario.key, 'volume', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PricingScenarios;