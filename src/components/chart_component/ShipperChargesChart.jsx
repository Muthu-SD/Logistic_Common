import React from 'react';
import ApexCharts from 'react-apexcharts';

const ShipperChargesChart = ({ chartTitle }) => {
  const chartData = {
    series: [
      {
        name: 'Gross Weight (GR. WT.)',
        type: 'column',
        data: [2472, 14715, 790.7, 13092, 1455, 2770, 171.39, 22614, 50307, 260, 1822, 315, 6433, 13429, 840, 840, 51300, 600, 2476, 1615, 840, 76838, 6444, 1260, 791, 6465, 970, 25246, 51804, 260, 3802, 1135, 840, 1050, 11237, 1088.81, 6452, 1297, 1200, 49988, 970, 51003, 1971.2, 16100, 342.78, 1186, 12922, 12684, 1061],
      },
      {
        name: 'Storage/Demurrage (USD)',
        type: 'line',
        data: [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
      },
      {
        name: 'Detention Charges (USD)',
        type: 'line',
        data: Array(49).fill(59), // All detention charges are 59 USD
      },
    ],
    options: {
      chart: {
        stacked: false,
        toolbar: { show: false },
      },
      xaxis: {
        categories: [
          'BAUMANN', 'ZAPP PRECISION', 'SAINT GOBAIN', 'TMD FRICTIONS', 'VALSFAN', 'FEDERAL MOGUL',
          'HONSEL', 'EURAL GNUTTI', 'HYDRO ALUMINIUM', 'CIMAP', 'KS GLEITLAGER', 'SHIJIAZHUANG',
          'FEDERAL MOGUL', 'TMD FRICTION', 'THE HARBORO', 'THE HARBORO', 'HYDRO ALUMINIUM', 'VALSFAN',
          'BAUMANN', 'WESTLEY', 'THE HARBORO', 'HYDRO ALUMINIUM', 'FEDERAL MOGUL', 'THE HARBORO',
          'SAINT GOBAIN', 'FEDERAL MOGUL', 'VALSFAN', 'EURAL GNUTTI', 'HYDRO ALUMINIUM', 'CIMAP',
          'MERITOR HVBS', 'WESTLEY', 'THE HARBORO', 'THE HARBORO', 'KS GLEITLAGER', 'HONSEL',
          'FEDERAL MOGUL', 'FREUDENBERG', 'THE HARBORO', 'HYDRO ALUMINIUM', 'VALSFAN',
          'HYDRO ALUMINIUM', 'BAUMANN', 'ZAPP PRECISION', 'HONSEL', 'FREUDENBERG', 'FEDERAL MOGUL',
          'TMD FRICTION', 'KS GLEITLAGER',
        ],
        labels: {
          rotate: -45,
        },
      },
      yaxis: [
        {
          title: { text: 'Gross Weight (kg)' },
        },
        {
          opposite: true,
          title: { text: 'Charges (USD)' },
        },
      ],
      plotOptions: {
        bar: {
          columnWidth: '50%',
        },
      },
      colors: ['#FF4560', '#00E396', '#008FFB'],
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        offsetY: 10  // Increase space between legend and chart
      },
      grid: {
        padding: {
          bottom: 60  // Adjust bottom padding to create space between the legend and the chart
        }
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
    },
  };

  return (
    <div>
      <h3>{chartTitle}</h3>
      <ApexCharts
        options={chartData.options}
        series={chartData.series}
        type="line"
        height="400px"
      />
    </div>
  );
};

export default ShipperChargesChart;
