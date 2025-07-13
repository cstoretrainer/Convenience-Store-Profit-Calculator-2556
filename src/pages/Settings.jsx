import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSettings, FiStore, FiDollarSign, FiClock, FiUsers } = FiIcons;

const Settings = () => {
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'QuickMart Downtown',
    location: 'Downtown District',
    operatingHours: {
      open: '06:00',
      close: '23:00'
    },
    peakHours: [7, 8, 12, 17, 18, 19],
    customerDemographics: {
      students: 30,
      workers: 45,
      residents: 25
    }
  });

  const [pricingSettings, setPricingSettings] = useState({
    maxPriceIncrease: 20,
    minPriceDecrease: 10,
    updateFrequency: 'hourly',
    competitorTracking: true,
    demandBasedPricing: true
  });

  const updateStoreSettings = (field, value) => {
    setStoreSettings(prev => ({ ...prev, [field]: value }));
  };

  const updatePricingSettings = (field, value) => {
    setPricingSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Configure your store parameters and pricing rules</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <SafeIcon icon={FiStore} className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Store Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Name
              </label>
              <input
                type="text"
                value={storeSettings.storeName}
                onChange={(e) => updateStoreSettings('storeName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={storeSettings.location}
                onChange={(e) => updateStoreSettings('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opening Time
                </label>
                <input
                  type="time"
                  value={storeSettings.operatingHours.open}
                  onChange={(e) => updateStoreSettings('operatingHours', {
                    ...storeSettings.operatingHours,
                    open: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Closing Time
                </label>
                <input
                  type="time"
                  value={storeSettings.operatingHours.close}
                  onChange={(e) => updateStoreSettings('operatingHours', {
                    ...storeSettings.operatingHours,
                    close: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <SafeIcon icon={FiDollarSign} className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Pricing Rules</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price Increase (%)
              </label>
              <input
                type="number"
                value={pricingSettings.maxPriceIncrease}
                onChange={(e) => updatePricingSettings('maxPriceIncrease', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                max="50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price Decrease (%)
              </label>
              <input
                type="number"
                value={pricingSettings.minPriceDecrease}
                onChange={(e) => updatePricingSettings('minPriceDecrease', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                max="30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Update Frequency
              </label>
              <select
                value={pricingSettings.updateFrequency}
                onChange={(e) => updatePricingSettings('updateFrequency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="realtime">Real-time</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
              </select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Competitor Tracking
                </label>
                <button
                  onClick={() => updatePricingSettings('competitorTracking', !pricingSettings.competitorTracking)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    pricingSettings.competitorTracking ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      pricingSettings.competitorTracking ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Demand-Based Pricing
                </label>
                <button
                  onClick={() => updatePricingSettings('demandBasedPricing', !pricingSettings.demandBasedPricing)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    pricingSettings.demandBasedPricing ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      pricingSettings.demandBasedPricing ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <SafeIcon icon={FiUsers} className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">Customer Demographics</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {storeSettings.customerDemographics.students}%
            </div>
            <div className="text-sm text-gray-600">Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {storeSettings.customerDemographics.workers}%
            </div>
            <div className="text-sm text-gray-600">Office Workers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {storeSettings.customerDemographics.residents}%
            </div>
            <div className="text-sm text-gray-600">Residents</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;