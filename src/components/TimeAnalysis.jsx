import React from 'react';
import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';

const TimeAnalysis = ({ timeRange }) => {
  const generateTimeData = () => {
    const categories = ['Energy Drinks', 'Coffee', 'Snacks', 'Soft Drinks', 'Cigarettes'];
    const timeSlots = ['6-9 AM', '9-12 PM', '12-3 PM', '3-6 PM', '6-9 PM', '9-12 AM'];
    
    const data = categories.map(category => {
      return timeSlots.map(slot => {
        let baseValue = 50;
        
        // Category-specific patterns
        if (category === 'Coffee' && (slot === '6-9 AM' || slot === '9-12 PM')) {
          baseValue += 40;
        } else if (category === 'Energy Drinks' && (slot === '6-9 AM' || slot === '3-6 PM')) {
          baseValue += 30;
        } else if (category === 'Snacks' && (slot === '12-3 PM' || slot === '6-9 PM')) {
          baseValue += 25;
        } else if (category === 'Soft Drinks' && (slot === '12-3 PM' || slot === '6-9 PM')) {
          baseValue += 35;
        } else if (category === 'Cigarettes' && (slot === '6-9 AM' || slot === '6-9 PM')) {
          baseValue += 20;
        }
        
        return Math.round(baseValue + Math.random() * 20);
      });
    });

    return { categories, timeSlots, data };
  };

  const { categories, timeSlots, data } = generateTimeData();

  const option = {
    title: {
      text: 'Sales Performance by Time and Category',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1f2937'
      }
    },
    tooltip: {
      position: 'top',
      formatter: function(params) {
        return `${categories[params.data[1]]}<br/>${timeSlots[params.data[0]]}<br/>Sales: ${params.data[2]} units`;
      }
    },
    grid: {
      height: '60%',
      top: '10%',
      left: '3%',
      right: '4%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: timeSlots,
      splitArea: {
        show: true
      },
      axisLabel: {
        color: '#6b7280'
      }
    },
    yAxis: {
      type: 'category',
      data: categories,
      splitArea: {
        show: true
      },
      axisLabel: {
        color: '#6b7280'
      }
    },
    visualMap: {
      min: 0,
      max: 120,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '5%',
      inRange: {
        color: ['#e0f2fe', '#0369a1', '#1e40af']
      }
    },
    series: [{
      name: 'Sales',
      type: 'heatmap',
      data: data.flatMap((categoryData, categoryIndex) =>
        categoryData.map((value, timeIndex) => [timeIndex, categoryIndex, value])
      ),
      label: {
        show: true,
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold'
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
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

export default TimeAnalysis;