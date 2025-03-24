import React from 'react';
import Chart from 'react-apexcharts';

const PolarChart = ({ chartTitle, chartData }) => {
  // The chartData prop will be dynamic, containing labels and values for the chart

  // Extract labels and values from the data
  const labels = chartData ? chartData.map(item => item.label) : [];
  const series = chartData ? chartData.map(item => item.value) : [];

  const chartOptions = {
    chart: {
      type: 'polarArea', // Polar area chart
    },
    labels: labels, // Set labels dynamically
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    fill: {
      opacity: 0.8,
    },
    yaxis: {
      show: true,
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0,
        },
        spokes: {
          strokeWidth: 1,
        },
      },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
    },
  };

  return (
    <div>
      <h3>{chartTitle}</h3>
      <Chart options={chartOptions} series={series} type="polarArea" height="300px" />
    </div>
  );
};

export default PolarChart;
