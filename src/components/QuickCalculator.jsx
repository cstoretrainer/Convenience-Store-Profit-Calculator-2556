import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCalculator, FiArrowRight } = FiIcons;

const QuickCalculator = () => {
  const [inputs, setInputs] = useState({
    cost: 1.50,
    currentPrice: 2.99,
    volume: 100,
    priceIncrease: 10
  });

  const [result, setResult] = useState(null);

  const calculate = () => {
    const currentProfit = (inputs.currentPrice - inputs.cost) * inputs.volume;
    const newPrice = inputs.currentPrice * (1 + inputs.priceIncrease / 100);
    const estimatedVolumeDecrease = inputs.priceIncrease * 0.5; // Simple elasticity
    const newVolume = inputs.volume * (1 - estimatedVolumeDecrease / 100);
    const newProfit = (newPrice - inputs.cost) * newVolume;
    const profitChange = newProfit - currentProfit;

    setResult({
      currentProfit: currentProfit.toFixed(2),
      newProfit: newProfit.toFixed(2),
      profitChange: profitChange.toFixed(2),
      newPrice: newPrice.toFixed(2),
      newVolume: Math.round(newVolume),
      isPositive: profitChange > 0
    });
  };

  const updateInput = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <SafeIcon icon={FiCalculator} className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Quick Calculator</h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Cost ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={inputs.cost}
              onChange={(e) => updateInput('cost', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={inputs.currentPrice}
              onChange={(e) => updateInput('currentPrice', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Daily Volume
            </label>
            <input
              type="number"
              value={inputs.volume}
              onChange={(e) => updateInput('volume', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Increase (%)
            </label>
            <input
              type="number"
              value={inputs.priceIncrease}
              onChange={(e) => updateInput('priceIncrease', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={calculate}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <span>Calculate Impact</span>
          <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
        </motion.button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
              result.isPositive ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}
          >
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Current Profit</p>
                <p className="font-semibold">${result.currentProfit}</p>
              </div>
              <div>
                <p className="text-gray-600">New Profit</p>
                <p className="font-semibold">${result.newProfit}</p>
              </div>
              <div>
                <p className="text-gray-600">Profit Change</p>
                <p className={`font-semibold ${
                  result.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {result.isPositive ? '+' : ''}${result.profitChange}
                </p>
              </div>
              <div>
                <p className="text-gray-600">New Price</p>
                <p className="font-semibold">${result.newPrice}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuickCalculator;