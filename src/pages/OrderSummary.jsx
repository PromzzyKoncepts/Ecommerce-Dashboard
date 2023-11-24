import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylesheets/orderSummary.css';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

const OrderSummary = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);

  const category = (categoryid) => {
    // Your category switch logic remains the same
  };

  function convertDate(date) {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  }

  const toggleDetails = (_id) => {
    setExpandedOrderId((prevId) => (prevId === _id ? null : _id));
  };

  useEffect(() => {
    axios
      .get('https://aphia-dev.onrender.com/api/orders/vendor', {
        headers: {
          authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDIzZWJjMzE2MjdiODUzNzZmZjhlNiIsImVtYWlsIjoiYm9sb3d5czQ0QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYm9sb3d5czMzIiwiZmlyc3RfbmFtZSI6Ik9sdWJvZHVuIiwibGFzdF9uYW1lIjoiVGFpd28iLCJyb2xlIjoidmVuZG9yIiwiYnVzaW5lc3NfbmFtZSI6Ik9sdWJvZHVuIFZlbnR1cmVzIiwiaWF0IjoxNzAwODMyNDkxLCJleHAiOjE3MDA4Mzk2OTF9.LQUcXHMSqislIAu6YwWeTA2ZAYUiSrAYVxybhPAlWEU'
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          console.log(res.data.message, 'res');
          setOrders(res.data.message);
          setLoading(false);
        } else {
          console.log(res.data.message, 'error');
          setError(res.data.message);
          setLoading(false);
        }
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className="p-8 w-10/12 mx-auto flex items-center justify-center h-[50vh]">
          <p className="animate-spin h-[5rem] w-[5rem] border-2 border-zinc-800 border-x-transparent rounded-full p-4" />
        </div>
      ) : (
        <h2 className="text-lg text-center font-bold mb-2">Order Summary</h2>
      )}

      {orders.map((order) => (
        <div key={order.order_id} className="md:max-w-[50rem] mx-auto border rounded shadow-lg md:overflow-x-visible overflow-x-scroll w-full">
          {/* Order Information Section */}
          <div className="mb-4 p-5 w- border-b border-slate-500">
            <div className="gap-7 flex place-content-between">
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
                  {expandedOrderId === order.order_id ? <ArrowDropUp /> : <ArrowDropDown />}
                </button>
              </div>
            </div>
          </div>

          {/* Details Section */}
          {expandedOrderId === order.order_id && (
            <div className="details-section">
              {/* Include details here */}
            </div>
          )}

          {/* Products Section */}
          {expandedOrderId === order.order_id && (
            <div>
              <h2 className="text-lg text-center font-bold mb-2">Products</h2>
              <div className="p-7">
                {order.products.map((product, index) => (
                  <div key={index} className="mb-4 bg-slate-300 p-3 rounded-lg overlay">
                    <div className="grid grid-cols-4 gap-4">
                    <div>
                        {/* <p className="font-semibold">Image</p> */}
                        <img className='w-[90px] h-[80px] object-cover' src={product.image} alt="Product" />
                      </div>
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
                      {/* <div>
                        <p className="font-semibold">Image</p>
                        <img className='w-[80px] h-[60px] object-cover' src={product.image} alt="Product" />
                      </div> */}
                      <div>
                        {/* Additional product details */}
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
