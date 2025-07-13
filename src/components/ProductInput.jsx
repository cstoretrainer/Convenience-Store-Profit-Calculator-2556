import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrash2, FiPackage } = FiIcons;

const ProductInput = ({ product, onUpdate, onRemove, canRemove }) => {
  const categories = [
    { value: 'beverages', label: 'Beverages' },
    { value: 'snacks', label: 'Snacks' },
    { value: 'tobacco', label: 'Tobacco' },
    { value: 'general', label: 'General' },
    { value: 'fresh', label: 'Fresh Food' }
  ];

  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiPackage} className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Product Configuration</span>
        </div>
        {canRemove && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onRemove(product.id)}
            className="text-red-500 hover:text-red-700 p-1"
          >
            <SafeIcon icon={FiTrash2} className="w-4 h-4" />
          </motion.button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => onUpdate(product.id, 'name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Energy Drink"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={product.category}
            onChange={(e) => onUpdate(product.id, 'category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cost ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={product.cost}
            onChange={(e) => onUpdate(product.id, 'cost', parseFloat(e.target.value) || 0)}
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
            value={product.currentPrice}
            onChange={(e) => onUpdate(product.id, 'currentPrice', parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Demand Elasticity
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="-2"
            max="0"
            step="0.1"
            value={product.demandElasticity}
            onChange={(e) => onUpdate(product.id, 'demandElasticity', parseFloat(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm text-gray-600 w-12">
            {product.demandElasticity}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          How sensitive is demand to price changes? (-2 = very sensitive, 0 = not sensitive)
        </p>
      </div>
    </motion.div>
  );
};

export default ProductInput;