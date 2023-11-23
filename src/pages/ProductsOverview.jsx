import axios from "axios";
import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ProductOverview = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayDelete, setDisplayDelete] = useState(null);
  const [displayEdit, setDisplayEdit] = useState(null);
  const [product, setProduct] = useState([]);
  const [newPrice, setNewPrice] = useState(product.price);
  const [newQty, setNewQty] = useState(product.quantity);
  const [newImage, setNewImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(
    product.images && product.images.length > 0 ? product.images[0] : ""
  );
  const itemsPerPage = 8;
  let totalPages = useRef();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const url = "https://aphia-dev.onrender.com/api/products/vendor";
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await axios.get(url, {
        headers: {
          authorization: token,
        },
      });
      setLoading(false);
      const targetRes = res.data.message;
      totalPages.current = Math.ceil(targetRes.length / itemsPerPage);
      const productstoDisplay = targetRes.slice(startIndex, endIndex);
      setProducts(productstoDisplay);
    };
    fetchData();
  }, [currentPage]);
  const handlePrev = () => setCurrentPage((prev) => prev - 1);
  const handleNext = () => setCurrentPage((prev) => prev + 1);

  const handleDelete = (productId) => {
    fetch(`https://aphia-dev.onrender.com/api/products/${productId}/delete`, {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    })
      .then((response) => {
        if (response.ok) {
          setProducts((prevProducts) =>
            prevProducts.filter((item) => item._id !== productId)
          );
          setDisplayDelete(null);
          fetchData();
        } else {
          console.error("Error deleting product:", response.status);
        }
      })
      .catch((error) => console.error("Error deleting product:", error));
  };
  const handleDisplayDelete = (productId) => {
    setDisplayDelete(productId);
  };
  const closeDisplayDelete = (productId) => {
    setDisplayDelete(null);
  };

  const handleEdit = (productId) => {
    setDisplayEdit(productId);
    axios
      .get(`https://aphia-dev.onrender.com/api/products/${productId}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data.message);
      })
      .catch((error) => console.error("Error fetching images:", error));
  };

  const closeDisplayEdit = (productId) => {
    setDisplayEdit(null);
  };

  // const handleQtyPriceUpdate = (productId) => {
  //   const updatedQtyPrice = {
  //     "price": newPrice,
  //     "quantity": newQty,
  //   };
  //   axios
  //     .put(
  //       `https://aphia-dev.onrender.com/api/products/${productId}/update`,
  //       updatedQtyPrice,
  //       {
  //         headers: {
  //           authorization: token,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       if (res.status===200) {
          
  //       } else {
  //         console.error("Error updating product:", response.status);
  //       }
  //     })
  //     .catch((error) => console.error("Error updating product:", error));
  // };

  const saveUpdate = (productId) => {
    const updatedQtyPrice = {
      "price": newPrice,
      "quantity": newQty,
    };
  
    const formData = new FormData();
    formData.append("product_image", newImage);
  
    axios
      .put(`https://aphia-dev.onrender.com/api/products/${productId}/add_image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          handleEdit(productId)
        } else {
          console.error("Error updating image:", res.status);
        }
      })
      .catch((error) => console.error("Error updating image:", error));

      
      axios
        .put(
          `https://aphia-dev.onrender.com/api/products/${productId}/update`,
          updatedQtyPrice,
          {
            headers: {
              authorization: token,
            },
          }
        )
        .then((res) => {
          if (res.status===200) {
            
          } else {
            console.error("Error updating product:", response.status);
          }
        })
        .catch((error) => console.error("Error updating product:", error));
  };
  
  const handleRemoveImage = (productId, imageIndex) => {
    console.log(imageIndex);
    console.log(productId);
    
    axios
      .put(
        `https://aphia-dev.onrender.com/api/products/${productId}/remove_image`,
        { "delete_index": imageIndex},
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.message);
          handleEdit(productId)
        } else {
          console.error('Error removing image:', res.status);
        }
      })
      .catch((error) => console.error('Error removing image:', error));
  };
  

  return (
    <>
      {loading ? (
        <div className="p-8 w-10/12 mx-auto flex items-center justify-center h-[70vh]">
          <p className=" animate-spin h-5 w-5 border-2 border-zinc-800 border-x-transparent rounded-full p-4 "></p>
        </div>
      ) : (
        <div className="w-10/12 mx-auto mt-4 bg-slate-100 pt-6 p-4 rounded-t-lg">
          <h2 className="pb-4 text-3xl mx-auto w-fit mb-4">Your Products</h2>
          <div className="flex flex-wrap flex-grow justify-center md:grid md:grid-cols-4 gap-[0.6rem]">
            {products?.map((item) => (
              <div
                href={""}
                key={item._id}
                className="bg-white pb-2 px-2 pt-6 rounded no-underline hover:scale-[1.02] duration-1000 hover:drop-shadow-lg"
              >
                <div>
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="basis-80  object-contain"
                  />
                </div>
                <div>
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <div>
                    <EditIcon onClick={() => handleEdit(item._id)} />
                    <DeleteIcon onClick={() => handleDisplayDelete(item._id)} />
                  </div>
                </div>
              </div>
            ))}
            {displayDelete && (
              <div
                className=" bg-black bg-opacity-50 w-full h-full fixed top-0 left-0 flex justify-center items-center"
                onClick={() => closeDisplayDelete()}
              >
                <div className="bg-gray-800 w-2/4 h-1/6 text-white p-5 rounded shadow-lg fixed z-50">
                  <p>Delete selected item?</p>
                  <small onClick={() => closeDisplayDelete()}>CANCEL</small>
                  <small
                    className="text-red-600 ml-3"
                    onClick={() => handleDelete(displayDelete)}
                  >
                    DELETE
                  </small>
                </div>
              </div>
            )}
            {displayEdit && (
              <div
                className="bg-black bg-opacity-50 w-full h-full fixed top-0 left-0 flex justify-center items-center"
              >
                <div className="bg-gray-800 text-white p-5 rounded shadow-lg  ">
                  <div>
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                    <p>{product.quantity}</p>
                  </div>
                  <div className="flex justify-center gap-[0.6rem] ">
                    {product.images && product.images.length > 0 ? (
                      product.images.map((image, index) => (
                        <div key={index}>
                          <button className="text-black" onClick={()=>handleRemoveImage(displayEdit, index)}>remove</button>
                          <img
                            src={image}
                            alt={`Image ${index + 1}`}
                            className="w-80"
                          />
                        </div>
                      ))
                    ) : (
                      <p>No images available</p>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    placeholder="+"
                    onChange={(e) => setNewImage(e.target.files[0])}
                  />
                  <button
                    className="text-black"
                    onClick={() => saveUpdate(displayEdit)}
                  >
                    Save
                  </button>
                  <label htmlFor="">price</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="text-black"
                    /> 
                  <label htmlFor="">qty</label>
                  <input
                    type="number"
                    value={newQty}
                    onChange={(e) => setNewQty(e.target.value)}
                    className="text-black"
                  /> 
                </div>
              </div>
            )}
          </div>
          <div className="mx-auto w-fit flex gap-5 shadow-md p-2 mt-2 rounded-sm bg-orange-400 h-14 active:bg-orange-500">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="disabled:opacity-40"
            >
              {<ArrowBackIosIcon />}
            </button>
            <p className="">
              {currentPage} of {totalPages.current}
            </p>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages.current}
              className=" disabled:opacity-40"
            >
              {<ArrowForwardIosIcon />}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductOverview;
