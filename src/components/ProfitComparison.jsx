import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBarChart3, FiTrendingUp, FiTrendingDown } = FiIcons;

const ProfitComparison = ({ products }) => {
  const totalStaticProfit = products.reduce((sum, p) => sum + p.staticProfit, 0);
  const totalDynamicProfit = products.reduce((sum, p) => sum + p.dynamicProfit, 0);
  const totalAdvantage = totalDynamicProfit - totalStaticProfit;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <SafeIcon icon={FiBarChart3} className="w-5 h-5 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-900">Profit Comparison</h2>
      </div>

      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">
              ${totalStaticProfit.toFixed(2)}
            </div>
            <div className="text-sm text-blue-800">Static Pricing</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">
              ${totalDynamicProfit.toFixed(2)}
            </div>
            <div className="text-sm text-green-800">Dynamic Pricing</div>
          </div>
          <div className={`rounded-lg p-4 ${
            totalAdvantage > 0 ? 'bg-emerald-50' : 'bg-red-50'
          }`}>
            <div className={`text-2xl font-bold flex items-center space-x-1 ${
              totalAdvantage > 0 ? 'text-emerald-600' : 'text-red-600'
            }`}>
              <SafeIcon 
                icon={totalAdvantage > 0 ? FiTrendingUp : FiTrendingDown}
                className="w-5 h-5"
              />
              <span>
                {totalAdvantage > 0 ? '+' : ''}${totalAdvantage.toFixed(2)}
              </span>
            </div>
            <div className={`text-sm ${
              totalAdvantage > 0 ? 'text-emerald-800' : 'text-red-800'
            }`}>
              Daily Difference
            </div>
          </div>
        </div>

        {/* Product Breakdown */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Product Breakdown</h3>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600">
                    Cost: ${product.cost} | Price: ${product.currentPrice}
                  </p>
                </div>
                <div className={`text-right ${
                  product.dynamicAdvantage > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  <div className="font-semibold">
                    {product.dynamicAdvantage > 0 ? '+' : ''}${product.dynamicAdvantage.toFixed(2)}
                  </div>
                  <div className="text-sm">advantage</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Static</div>
                  <div className="font-medium">${product.staticProfit.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-gray-600">Dynamic</div>
                  <div className="font-medium">${product.dynamicProfit.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-gray-600">Competitive</div>
                  <div className="font-medium">${product.competitiveProfit.toFixed(2)}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recommendation */}
        <div className={`rounded-lg p-4 ${
          totalAdvantage > 0 ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
        }`}>
          <div className="flex items-start space-x-3">
            <SafeIcon 
              icon={totalAdvantage > 0 ? FiTrendingUp : FiTrendingDown}
              className={`w-5 h-5 mt-0.5 ${
                totalAdvantage > 0 ? 'text-green-600' : 'text-yellow-600'
              }`}
            />
            <div>
              <h4 className={`font-medium ${
                totalAdvantage > 0 ? 'text-green-900' : 'text-yellow-900'
              }`}>
                {totalAdvantage > 0 ? 'Recommendation: Implement Dynamic Pricing' : 'Consider Market Conditions'}
              </h4>
              <p className={`text-sm mt-1 ${
                totalAdvantage > 0 ? 'text-green-800' : 'text-yellow-800'
              }`}>
                {totalAdvantage > 0 
                  ? `Dynamic pricing could increase your daily profit by $${totalAdvantage.toFixed(2)}. This represents a ${((totalAdvantage / totalStaticProfit) * 100).toFixed(1)}% improvement.`
                  : 'Static pricing might be more suitable for your current product mix and market conditions. Consider adjusting your elasticity estimates or exploring different pricing strategies.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitComparison;