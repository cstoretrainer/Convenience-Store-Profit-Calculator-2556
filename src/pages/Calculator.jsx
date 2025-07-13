import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import ProductInput from '../components/ProductInput';
import PricingScenarios from '../components/PricingScenarios';
import ProfitComparison from '../components/ProfitComparison';
import * as FiIcons from 'react-icons/fi';

const { FiCalculator, FiPlus, FiMinus } = FiIcons;

const Calculator = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Energy Drink',
      cost: 1.50,
      currentPrice: 2.99,
      demandElasticity: -0.8,
      peakHours: [7, 8, 17, 18, 19],
      category: 'beverages'
    }
  ]);

  const [scenarios, setScenarios] = useState({
    static: { margin: 0.5, volume: 100 },
    dynamic: { margin: 0.6, volume: 95 },
    competitive: { margin: 0.45, volume: 110 }
  });

  const addProduct = () => {
    const newProduct = {
      id: Date.now(),
      name: '',
      cost: 0,
      currentPrice: 0,
      demandElasticity: -0.5,
      peakHours: [],
      category: 'general'
    };
    setProducts([...products, newProduct]);
  };

  const removeProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateProduct = (id, field, value) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const calculateProfits = () => {
    return products.map(product => {
      const staticProfit = (product.currentPrice - product.cost) * scenarios.static.volume;
      const dynamicProfit = (product.currentPrice * 1.1 - product.cost) * scenarios.dynamic.volume;
      const competitiveProfit = (product.currentPrice * 0.95 - product.cost) * scenarios.competitive.volume;
      
      return {
        ...product,
        staticProfit,
        dynamicProfit,
        competitiveProfit,
        dynamicAdvantage: dynamicProfit - staticProfit
      };
    });
  };

  const profitAnalysis = calculateProfits();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profit Calculator</h1>
          <p className="text-gray-600 mt-1">Analyze the impact of dynamic pricing on your products</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addProduct}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>Add Product</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <SafeIcon icon={FiCalculator} className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Product Configuration</h2>
            </div>
            
            <div className="space-y-4">
              {products.map((product, index) => (
                <ProductInput
                  key={product.id}
                  product={product}
                  onUpdate={updateProduct}
                  onRemove={removeProduct}
                  canRemove={products.length > 1}
                />
              ))}
            </div>
          </div>

          <PricingScenarios scenarios={scenarios} setScenarios={setScenarios} />
        </div>

        <div className="space-y-6">
          <ProfitComparison products={profitAnalysis} />
        </div>
      </div>
    </div>
  );
};

export default Calculator;