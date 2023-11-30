import React,{useContext} from 'react';
import { HiArrowTrendingUp, HiArrowTrendingDown } from "react-icons/hi2";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { SalesData } from '../data/SalesData';
import { Table } from 'antd';
import userContext from "../context/userContext"





const Dashboard = () => {

  const { authUser } = useContext(userContext)
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];



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
      status: 'Completed',
    });
  }

  const pagination = {
    pageSize,
  };

  return (
    <div>
      <h3 className="mb-6 font-semibold text-3xl text-slate-300">
        {" "}
        Dashboard{" "}
      </h3>
      <p className="mb-6 font-semibold text-xl">
        {" "}
        Good Afternoon, {authUser.business_name}{" "}
      </p>
      <p className="text-sm font-light">
        Logged in as: {authUser.first_name} {authUser.last_name}
      </p>
      <div className="flex justify-between items-center gap-3">
        <div className="flex justify-between items-center grow bg-white p-8 rounded">
          <div>
            <p className="mb-2">Total</p>
            <h4 className="mb-0 text-xl font-medium">₦478,020</h4>
          </div>
          <div className="flex flex-col items-end">
            <h6 className="flex mb-2">
              <HiArrowTrendingUp className="text-green-500 pt-1 pr-1" />
              72%
            </h6>
            <h4 className="mb-0">Compared to August 2023</h4>
          </div>
        </div>
        <div className="flex justify-between items-center grow bg-white p-8 rounded">
          <div>
            <p className="mb-2">Total</p>
            <h4 className="mb-0 text-xl font-medium">₦478,020</h4>
          </div>
          <div className="flex flex-col items-end">
            <h6 className="flex mb-2">
              <HiArrowTrendingDown className="text-red-500 pt-1 pr-1" />
              41%
            </h6>
            <h4 className="mb-0">Compared to Semptember 2023</h4>
          </div>
        </div>
        <div className="flex justify-between items-center grow bg-white p-8 rounded">
          <div>
            <p className="mb-2">Total</p>
            <h4 className="mb-0 text-xl font-medium">₦478,020</h4>
          </div>
          <div className="flex flex-col items-end">
            <h6 className="flex mb-2">
              <HiArrowTrendingUp className="text-green-500 pt-1 pr-1" />
              65%
            </h6>
            <h4 className="mb-0">Compared to October 2023</h4>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-8 font-semibold text-2xl mt-10 mr-10">
          Income Statics
        </h3>
        <div className="container mx-auto p-4">
          <BarChart width={1100} height={300} data={SalesData} className="  ">
            <XAxis dataKey="month" stroke="#C89E0E" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="sales" fill="#C89E0E" barSize={50} />
          </BarChart>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-8 font-semibold text-2xl mt-10">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data2} pagination={pagination} />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-8 font-semibold text-2xl mt-10">Recent Reviews</h3>
        <div></div>
      </div>
    </div>
  );
}

export default Dashboard