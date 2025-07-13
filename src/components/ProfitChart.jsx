import React from 'react';
import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';

const ProfitChart = ({ timeRange }) => {
  const generateData = () => {
    const days = timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const staticData = [];
    const dynamicData = [];
    const labels = [];

    for (let i = 0; i < days; i++) {
      const baseProfit = 150 + Math.random() * 100;
      const dynamicMultiplier = 1.05 + Math.random() * 0.15;
      
      staticData.push(baseProfit);
      dynamicData.push(baseProfit * dynamicMultiplier);
      
      if (timeRange === '24h') {
        labels.push(`${i}:00`);
      } else {
        labels.push(`Day ${i + 1}`);
      }
    }

    return { staticData, dynamicData, labels };
  };

  const { staticData, dynamicData, labels } = generateData();

  const option = {
    title: {
      text: 'Profit Comparison Over Time',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1f2937'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      formatter: function(params) {
        let result = `${params[0].axisValue}<br/>`;
        params.forEach(param => {
          result += `${param.seriesName}: $${param.value.toFixed(2)}<br/>`;
        });
        return result;
      }
    },
    legend: {
      data: ['Static Pricing', 'Dynamic Pricing'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: labels,
      axisLabel: {
        color: '#6b7280'
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '${value}',
        color: '#6b7280'
      }
    },
    series: [
      {
        name: 'Static Pricing',
        type: 'line',
        data: staticData,
        smooth: true,
        lineStyle: {
          color: '#3b82f6',
          width: 3
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(59, 130, 246, 0.3)'
            }, {
              offset: 1, color: 'rgba(59, 130, 246, 0.1)'
            }]
          }
        }
      },
      {
        name: 'Dynamic Pricing',
        type: 'line',
        data: dynamicData,
        smooth: true,
        lineStyle: {
          color: '#10b981',
          width: 3
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(16, 185, 129, 0.3)'
            }, {
              offset: 1, color: 'rgba(16, 185, 129, 0.1)'
            }]
          }
        }
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="h-96"
    >
      <ReactECharts option={option} style={{ height: '100%' }} />
    </motion.div>
  );
};

export default ProfitChart;