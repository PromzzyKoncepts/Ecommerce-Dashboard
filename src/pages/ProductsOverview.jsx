import axios from "axios";
import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { display } from "@mui/system";

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
  const [displayImageInput, setDisplayImageInput] = useState(null);
  const [displayQuantityInput, setDisplayQuantityInput] = useState(null);
  const [displayPriceInput, setDisplayPriceInput] = useState(null);
  const [showIcon, setShowIcon] = useState(null);
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
      console.log(targetRes);
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
    setLoading(true);
    axios
      .get(`https://aphia-dev.onrender.com/api/products/${productId}`)
      .then((res) => {
        setLoading(false);
        console.log(res);
        setProduct(res.data.message);
      })
      .catch((error) => console.error("Error fetching images:", error));
  };

  const closeDisplayEdit = (productId) => {
    setDisplayEdit(null);
  };

  const saveUpdate = (productId) => {
    const updatedQtyPrice = {
      price: newPrice,
      quantity: newQty,
    };

    const formData = new FormData();
    formData.append("product_image", newImage);

    axios
      .put(
        `https://aphia-dev.onrender.com/api/products/${productId}/add_image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: token,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          handleEdit(productId);
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
        if (res.status === 200) {
          handleEdit(productId);
        } else {
          console.error("Error updating product:", response.status);
        }
      })
      .catch((error) => console.error("Error updating product:", error));
    setNewImage(null);
  };

  const handleRemoveImage = (productId, imageIndex) => {
    axios
      .put(
        `https://aphia-dev.onrender.com/api/products/${productId}/remove_image`,
        { delete_index: imageIndex },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.message);
          handleEdit(productId);
        } else {
          console.error("Error removing image:", res.status);
        }
      })
      .catch((error) => console.error("Error removing image:", error));
  };

  const handleShowIcon = (productId) => {
    setShowIcon(productId);
  };

  const handleDisplayImageInput = (productId) => {
    setDisplayImageInput(productId);
  };

  const handleDisplayQuantityInput = (productId) => {
    setDisplayQuantityInput(productId);
  };

  const handleDisplayPriceInput = (productId) => {
    setDisplayPriceInput(productId);
  };

  const closeAllInput = (productId) => {
    setDisplayPriceInput(null);
    setDisplayImageInput(null);
    setDisplayQuantityInput(null);
  };

  const getCategoryName = (categoryId) => {
    switch (categoryId) {
      case "654114fe0d9aa0b704cd2caa":
        return "Footwears";
      case "6541163f0d9aa0b704cd2cae":
        return "Male Wear";
      case "654116ae0d9aa0b704cd2cb0":
        return "Female Wear";
      case "6543ebbe63d73dadba4d7ccc":
        return "Accessories";
      case "654113f70d9aa0b704cd2ca8":
        return "Devices";
      case "654116000d9aa0b704cd2cac":
        return "Electronics";
      default:
        return "Others";
    }
  };
  return (
    <>
      {loading ? (
        <div className="p-8 w-10/12 mx-auto flex items-center justify-center h-[70vh]">
          <p className=" animate-spin h-5 w-5 border-2 border-zinc-800 border-x-transparent rounded-full p-4 "></p>
        </div>
      ) : (
        <div className="w-10/12 mx-auto mt-4 bg-slate-100 pt-6 p-4 rounded-t-lg">
          <h2 className="pb-4 text-3xl mx-auto w-fit mb-4">My Products</h2>
          <div className="flex flex-wrap flex-grow justify-center md:grid md:grid-cols-4 gap-[0.6rem]">
            {products?.map((item) => (
              <div
                href={""}
                key={item._id}
                className="bg-white pb-2 px-2 pt-6 rounded no-underline hover:scale-[1.02] duration-1000 hover:drop-shadow-lg relative"
                onMouseEnter={() => handleShowIcon(item._id)}
                onMouseLeave={() => handleShowIcon(null)}
              >
                <div className="">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="basis-80  object-contain "
                  />
                </div>
                <div className="">
                  <div>
                    <p className=" mt-5 font-bold">{item.name}</p>
                    <div className="flex justify-between mt-5">
                      <p className="text-amber-600">
                        {getCategoryName(item.category_id)}
                      </p>
                      <p className="font-bold">
                        &#8358;
                        {Intl.NumberFormat("en-US", {
                          maximumFractionDigits: 0,
                        }).format(item.price)}
                      </p>
                    </div>
                  </div>
                  {showIcon === item._id && (
                    <div className="">
                      <div className="absolute top-1 left-0   bg-white opacity-80 hover:opacity-100 h-fit w-fit p-2 rounded-full ">
                        <EditIcon
                          className="text-amber-600"
                          onClick={() => handleEdit(item._id)}
                        />
                      </div>
                      <div className=" absolute top-1 right-0  opacity-80 hover:opacity-100 h-fit w-fit p-2 rounded-full bg-white">
                        <CancelIcon
                          className=" text-red-600"
                          onClick={() => handleDisplayDelete(item._id)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {displayDelete && (
        <div className="inset-0 bg-white bg-opacity-50 fixed flex justify-center items-center">
          <div
            className="inset-0 fixed"
            onClick={() => closeDisplayDelete()}
          ></div>
          <div className="bg-amber-600 w-1/3 h-1/6 text-white p-7 rounded shadow-lg fixed">
            <div className="flex ">
              <p className="text-lg">Delete selected item?</p>
            </div>
            <div className="flex justify-end gap-16 mt-4">
              <p
                className="cursor-pointer"
                onClick={() => closeDisplayDelete()}
              >
                CANCEL
              </p>
              <p
                className="hover:text-red-700 ml-3 cursor-pointer"
                onClick={() => handleDelete(displayDelete)}
              >
                DELETE
              </p>
            </div>
          </div>
        </div>
      )}
      {displayEdit &&
        (loading ? (
          <div className="p-8 w-10/12 mx-auto flex items-center justify-center h-[70vh]">
            <p className=" animate-spin h-5 w-5 border-2 border-zinc-800 border-x-transparent rounded-full p-4 "></p>
          </div>
        ) : (
          <div className="fixed inset-0 flex justify-center items-center">
            <div
              className="fixed inset-0 bg-white opacity-50 cursor-pointer"
              onClick={() => closeDisplayEdit(displayEdit)}
            ></div>
            <div className="bg-amber-600 fixed text-white p-5 rounded shadow-lg min-w-[42%]">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold text-lg">Edit Product</p>
                </div>
                <div>
                  <button
                    className="text-black hover:bg-green-600 hover:border-none p-2 text-sm focus:outline-none"
                    onClick={() => {
                      saveUpdate(displayEdit);
                      closeAllInput(displayEdit);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="">
                <div className="mt-3">
                  <div className="flex justify-between">
                    <p>Quantity</p>
                    {displayQuantityInput && (
                      <input
                        type="number"
                        value={newQty}
                        onChange={(e) => setNewQty(e.target.value)}
                        className="text-white bg-white border-b outline-none ml-3  rounded  pl-2"
                      />
                    )}
                    <EditIcon
                      onClick={() => handleDisplayQuantityInput(displayEdit)}
                      fontSize="small"
                      className="hover:text-green-600"
                    />
                  </div>
                  <div className="flex ">
                    <p>{product.quantity}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex gap-2 justify-between">
                    <p>Price</p>
                    {displayPriceInput && (
                      <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="text-white bg-white border-b outline-none ml-3 pl-2 rounded"
                      />
                    )}
                    <EditIcon
                      onClick={() => handleDisplayPriceInput(displayEdit)}
                      fontSize="small"
                      className="hover:text-green-600"
                    />
                  </div>
                  <div className="flex ">
                    <p>
                      &#8358;
                      {Intl.NumberFormat("en-US", {
                        maximumFractionDigits: 0,
                      }).format(product.price)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-2 ">
                  <div className="flex gap-2 ">
                    <AddPhotoAlternateIcon
                      onClick={() => handleDisplayImageInput(displayEdit)}
                      fontSize="small"
                      className="hover:text-green-600"
                    />
                    <small>Add Image</small>
                  </div>
                  {displayImageInput && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewImage(e.target.files[0])}
                      className="text-white w-20 border-b outline-none ml-3  rounded"
                    />
                  )}
                </div>
                {product.images && product.images.length > 0 ? (
                  product.images.map((image, index) => (
                    <div className="relative" key={index}>
                      <CancelIcon
                        className="text-red-600 absolute top-0 right-0 opacity-80 hover:opacity-100"
                        onClick={() => handleRemoveImage(displayEdit, index)}
                      />
                      <img
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </div>
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </div>
            </div>
          </div>
        ))}

      <div className="mx-auto w-fit flex gap-5 shadow-md p-2 mt-2 rounded-sm bg-orange-400 h-14 active:bg-orange-500">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="disabled:opacity-40 focus:outline-0 hover:border-none"
        >
          {<ArrowBackIosIcon />}
        </button>
        <p className="">
          {currentPage} of {totalPages.current}
        </p>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages.current}
          className=" disabled:opacity-40 focus:outline-0 hover:border-none"
        >
          {<ArrowForwardIosIcon />}
        </button>
      </div>
    </>
  );
};

export default ProductOverview;
