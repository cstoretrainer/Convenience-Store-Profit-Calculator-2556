import React from 'react';
import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';

const DemandChart = ({ timeRange }) => {
  const generateDemandData = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const demandData = hours.map(hour => {
      // Simulate demand patterns for a convenience store
      let demand = 20; // Base demand
      
      // Morning rush (6-9 AM)
      if (hour >= 6 && hour <= 9) {
        demand += 30 + Math.random() * 20;
      }
      // Lunch time (11 AM - 2 PM)
      else if (hour >= 11 && hour <= 14) {
        demand += 25 + Math.random() * 15;
      }
      // Evening rush (5-8 PM)
      else if (hour >= 17 && hour <= 20) {
        demand += 35 + Math.random() * 25;
      }
      // Late night (10 PM - 2 AM)
      else if (hour >= 22 || hour <= 2) {
        demand += 15 + Math.random() * 10;
      }
      // Regular hours
      else {
        demand += Math.random() * 10;
      }
      
      return Math.round(demand);
    });

    const priceData = demandData.map(demand => {
      // Price elasticity: higher demand = slightly higher optimal price
      const basePrice = 2.99;
      const priceMultiplier = 1 + (demand - 30) * 0.005;
      return Math.max(basePrice * priceMultiplier, basePrice * 0.9);
    });

    return { demandData, priceData, hours };
  };

  const { demandData, priceData, hours } = generateDemandData();

  const option = {
    title: {
      text: 'Demand Patterns Throughout the Day',
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
        let result = `${params[0].axisValue}:00<br/>`;
        params.forEach(param => {
          if (param.seriesName === 'Demand') {
            result += `${param.seriesName}: ${param.value} units<br/>`;
          } else {
            result += `${param.seriesName}: $${param.value.toFixed(2)}<br/>`;
          }
        });
        return result;
      }
    },
    legend: {
      data: ['Demand', 'Optimal Price'],
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
      data: hours.map(h => `${h}:00`),
      axisLabel: {
        color: '#6b7280',
        interval: 2
      }
    },
    yAxis: [
      {
        type: 'value',
        name: 'Demand (units)',
        position: 'left',
        axisLabel: {
          formatter: '{value}',
          color: '#6b7280'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#8b5cf6'
          }
        }
      },
      {
        type: 'value',
        name: 'Price ($)',
        position: 'right',
        axisLabel: {
          formatter: '${value}',
          color: '#6b7280'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#f59e0b'
          }
        }
      }
    ],
    series: [
      {
        name: 'Demand',
        type: 'bar',
        data: demandData,
        yAxisIndex: 0,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#8b5cf6'
            }, {
              offset: 1, color: '#a78bfa'
            }]
          }
        }
      },
      {
        name: 'Optimal Price',
        type: 'line',
        data: priceData,
        yAxisIndex: 1,
        smooth: true,
        lineStyle: {
          color: '#f59e0b',
          width: 3
        },
        symbol: 'circle',
        symbolSize: 6
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

export default DemandChart;