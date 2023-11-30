import React, { useState, useEffect } from "react";
import axios from "axios";
import "../stylesheets/orderSummary.css";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { formatDistanceToNow } from "date-fns";


const OrderSummary = () => {
  const token = localStorage.getItem("authToken");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
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
      .get("https://aphia-dev.onrender.com/api/orders/vendor", {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          console.log(res.data.message, "res");
          setOrders(res.data.message);
          setLoading(false);
        } else {
          console.log(res.data.message, "error");
          setError(res.data.message);
          setLoading(false);
        }
      });
  }, []);

  const totalSales = orders.reduce((total, order) => {
    return (
      total +
      order.products.reduce(
        (productTotal, product) => productTotal + product.price * product.quantity,
        0
      )
    );
  }, 0);

  const totalOrders = orders.length;

  return (
    <>
      {loading ? (
        <div className="p-8 w-10/12 mx-auto flex items-center justify-center h-[50vh]">
          <p className="animate-spin h-[5rem] w-[5rem] border-2 border-zinc-800 border-x-transparent rounded-full p-4" />
        </div>
      ) : (
        <>
          <div className="md:max-w-[50rem] mx-auto">
            <h2 className="text-lg text-center font-bold mb-2">
              Order Summary
            </h2>
            <div className="flex justify-between mb-4 text-lg text-center font-bold">
              <div>Total Order: {totalOrders}</div>
              <div>Total Sales: ${totalSales.toFixed(2)}</div>
            </div>
            {orders.length === 0 ? (
              <p className="text-center font-bold text-2xl flex items-center justify-center h-[80vh]">
                You have no Orders.
              </p>
            ) : (
              orders.map((order) => (
                <div
                  key={order.order_id}
                  className="border rounded shadow-lg mb-8 "
                >
                  {/* Order Information Section */}
                  <div className="mb-4 p-5 border-b border-slate-500 md:overflow-x-visible overflow-x-scroll w-full">
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
                          {expandedOrderId === order.order_id ? (
                            <ArrowDropUp />
                          ) : (
                            <ArrowDropDown />
                          )}
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
                      <h2 className="text-lg text-center font-bold mb-2">
                        Products
                      </h2>
                      <div className="contentsdiv p-7 ">
                        {order.products.map((product, index) => (
                          <div
                            key={index}
                            className="mb-4 bg-slate-300  p-3 rounded-lg overlay md:overflow-x-visible overflow-x-scroll md:w-full "
                          >
                            <div className="md:grid md:grid-cols-4 flex justify-between gap-4 ">
                              <div>
                                <img
                                  className="w-[90px] h-[80px] object-cover"
                                  src={product.image}
                                  alt="Product"
                                />
                              </div>
                              <div>
                                <p className="font-semibold">Product</p>
                                <p className="line-clamp-2">
                                  {product.product_name}
                                </p>
                              </div>

                              <div>
                                <p className="font-semibold">Quantity</p>
                                <p>{product.quantity}</p>
                              </div>
                              <div>
                                <p className="font-semibold">Price</p>
                                <p>${product.price.toFixed(2)}</p>
                              </div>
                              <div>{/* Additional product details */}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      )}
    </>
  );
};

export default OrderSummary;
