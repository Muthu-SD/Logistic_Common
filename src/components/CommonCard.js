// CommonCard.js
import React from 'react';
import { Card } from 'antd';

const CommonCard = ({ title, children }) => {
  return (
    <Card title={title} bordered={false} style={{ width: '100%', marginBottom: 16 }}>
      {children}
    </Card>
  );
};

export default CommonCard;
