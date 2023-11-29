import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylesheets/orderSummary.css';
import Data from '../data/OrderData';
import { ArrowDropDown, ArrowDropUp, ArrowUpward } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

const OrderSummary = () => {
  const [orders, setOrder] = useState([]);
  const [error, setError] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  function convertDate(date) {
    
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  }
  

  const toggleDetails = (_id) => {
    setExpandedOrderId((prevId) => (prevId === _id ? null : _id));
  };

  useEffect(() => {
    axios
      .get('https://aphia-dev.onrender.com/api/orders/vendor', {
        headers: {
          authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDIzZWJjMzE2MjdiODUzNzZmZjhlNiIsImVtYWlsIjoiYm9sb3d5czQ0QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYm9sb3d5czMzIiwiZmlyc3RfbmFtZSI6Ik9sdWJvZHVuIiwibGFzdF9uYW1lIjoiVGFpd28iLCJyb2xlIjoidmVuZG9yIiwiYnVzaW5lc3NfbmFtZSI6Ik9sdWJvZHVuIFZlbnR1cmVzIiwiaWF0IjoxNzAwNzQyNDcxLCJleHAiOjE3MDA3NDk2NzF9.h9JT8cjlSPhBT-oCu02RBp9WBgl3pijKXNMYNfloB_Q',
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          console.log(res.data.message, 'res');
          setOrder(res.data.message);
        } else {
          console.log(res.data.message, 'error');
          setError(res.data.message);
        }
      });
  }, []);

  return (
    <>
      <h2 className="text-lg text-center font-bold mb-2 ">Order Summary</h2>
      {orders.map((order) => (
        <div className="md:max-w-[50rem] mx-auto border rounded shadow-lg md:overflow-x-visible  overflow-x-scroll w-full " key={order.order_id}>
          {/* Order Information Section */}
          <div className="mb-4  p-5 w-  border-b  border-slate-500">
            <div className=" gap-7 flex place-content-between">
              <div>
                <p className="font-semibold">Order ID</p>
                <p>{order.order_id}</p>
              </div>
              <div>
                <p className="font-semibold">Order Date</p>
                <p>{convertDate(order.date)}</p>
              </div>
              <div>
                <p className="font-semibold">Items Purchased</p>
                <p>{order.products.length}</p>
              </div>
              <div>
                <button onClick={() => toggleDetails(order.order_id)}>
                  {expandedOrderId === order.order_id ? <ArrowDropUp />  :<ArrowDropDown /> }
                </button>
              </div>
            </div>
          </div>

          {/* Details Section */}
          {expandedOrderId === order.order_id && (
            <div className="details-section">
              {/* <div>
                <p className="font-semibold">Order Date</p>
                <p>{order.date}</p>
              </div> */}
              {/* <div>
                <p className="font-semibold">Items Purchased</p>
                <p>{order.products.length}</p>
              </div> */}
            </div>
          )}

          {/* Products Section */}
          {expandedOrderId === order.order_id && (
            <div>
              <h2 className="text-lg text-center font-bold mb-2">Products</h2>
              <div className='p-7'>
              {order.products.map((product, index) => (
                <div key={index} className="mb-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="font-semibold">Product</p>
                      <p>{product.product_name}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Quantity</p>
                      <p>{product.quantity}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Price</p>
                      <p>${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default OrderSummary;
