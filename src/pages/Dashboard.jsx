import React, { useState } from 'react';
import { HiArrowTrendingUp, HiArrowTrendingDown } from "react-icons/hi2";
import { SalesData } from '../data/SalesData';
import { Table } from 'antd';
import BarChart from '../components/BarChart';



const Dashboard = () => {
  const [salesData, setSalesData] = useState({
    labels: SalesData.map((data) => data.month),
    datasets: [{
      label: "Total Sales",
      data: SalesData.map((data) => data.sales),

    }]
  })
  
  const columns = [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];
  
  const pageSize = 5;

  const data2 = [];
  for (let i = 1; i < 15; i++) {
    data2.push({
      key: i,
      name: `Edward King ${i}`,
      product: 32,
      status: 'pending',
    });
  }
 
  const pagination = {
    pageSize,
  };

  return (
    <div>
      <h3 className='mb-6 font-semibold text-3xl text-slate-300'> Dashboard </h3>
      <p className='mb-6 font-semibold text-xl'> Good Afternoon, Vendor Name </p>
      <div className='flex justify-between items-center gap-3'>

        <div className='flex justify-between items-center grow bg-white p-8 rounded'>
          <div>
            <p className='mb-2'>Total</p>
            <h4 className='mb-0 text-xl font-medium'>₦478,020</h4>
          </div>
          <div className='flex flex-col items-end'>
          <h6 className='flex mb-2'><HiArrowTrendingUp className='text-green-500 pt-1 pr-1' />72%</h6>
            <h4 className='mb-0'>Compared to August 2023</h4>
          </div>
        </div>
        <div className='flex justify-between items-center grow bg-white p-8 rounded'>
          <div>
            <p className='mb-2'>Total</p>
            <h4 className='mb-0 text-xl font-medium'>₦478,020</h4>
          </div>
          <div className='flex flex-col items-end'>
          <h6 className='flex mb-2'><HiArrowTrendingDown className='text-red-500 pt-1 pr-1' />41%</h6>
            <h4 className='mb-0'>Compared to Semptember 2023</h4>
          </div>
        </div>
        <div className='flex justify-between items-center grow bg-white p-8 rounded'>
          <div>
            <p className='mb-2'>Total</p>
            <h4 className='mb-0 text-xl font-medium'>₦478,020</h4>
          </div>
          <div className='flex flex-col items-end'>
            <h6 className='flex mb-2'><HiArrowTrendingUp className='text-green-500 pt-1 pr-1' />65%</h6>
            <h4 className='mb-0'>Compared to October 2023</h4>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <h3 className='mb-8 font-semibold text-2xl mt-10'>Income Statics</h3>
        <div>
          <BarChart chartData={salesData} />
        </div>
      </div>
      <div className='mt-4'>
        <h3 className='mb-8 font-semibold text-2xl mt-10'>Recent Orders</h3>
        <div>
        <Table columns={columns} dataSource={data2} pagination={pagination} />
        </div>
      </div>
        
      <div className='mt-4'>
        <h3 className='mb-8 font-semibold text-2xl mt-10'>Recent Reviews</h3>
        <div>
        </div>
      </div>
      

    </div>
  )
}

export default Dashboard