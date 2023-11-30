import React, { useState, useEffect } from 'react';
import ImageUploading from 'react-images-uploading';
import "../stylesheets/addProducts.css"
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';

function AddProducts() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [numError, setNumError] = useState('')
  const [allCats, setAllCats] = useState([])
  const [description, setDescription] = useState('');
  const [category_id, setCategory_id] = useState('');
  const [images, setImages] = useState([]);
  const maxNumber = 5;
  const token = localStorage.getItem('authToken')

  useEffect(() => {
    axios.get('https://aphia-dev.onrender.com/api/categories')
      .then(res => {
        console.log(res.data.message, 'categ');
        setAllCats(res.data.message)
      })
  }, [])

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  
  // const handlePriceChange = (e)=>{
  //   if(typeof e.target.value === "number"){
  //     setPrice(e.target.value)
  //   }else{
  //     setNumError('Value must be a number')
  //   }
  // };

  // const handleQuantityChange = (e)=>{
  //   if(typeof e === "number"){
  //     setQuantity(e.target.value)
  //   }else{
  //     setNumError('Value must be a number')
  //   }
  // };
  const notify = (message)=>toast(`${message}`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

    const errorNote = (message)=>toast.error(`${message}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

  const handleRemove = (index) => {
    const newImages = images.slice();
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !price || !quantity || !category_id || !images.length) {
      errorNote('All fields are required');
      return;
    }
    
    setLoading(true);
    
    const imagesData = images.map((image, index) => ({
        product_image: image.data_url,
        // You can add other properties if needed, like 'order' or 'description'
      }));
      
      // let imagesData = {};
      
      // images.forEach((image, index) => {
      //   imagesData[`product_image`] = image.data_url;
      // });
      
      
      
      console.log(images,'imasge');
    console.log(imagesData,'imagesdata');
    const body = {
      name,
      price,
      quantity,
      description,
      category_id,
      ...imagesData,
    };
    console.log(imagesData,'iggdata after body');
    console.log(body,'body');
    const headers ={
      authorization : token
    }
    try {
      const response = await axios.post('https://aphia-dev.onrender.com/api/products/create', body,{headers});
      
      if(response.data.success === true){

        console.log('Product created successfully:', response.data);
        notify(response.data.message)
        setLoading(false)
        setName('');
        setPrice('');
        setQuantity('');
        setDescription('');
        setCategory_id('');
        setImages([]);
      }else{
        errorNote(response.data.message)
        setLoading(false)
      }
      
    } catch (error) {
      console.error('Error creating product:', error);
      errorNote(error.message);
    }
  };


  return (
    <>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
      <ToastContainer />
      <h1 className="text-3xl text-white bg-amber-500 rounded font-bold mb-6 p-3">Add Products to Your Store <AddBusinessOutlinedIcon style={{ fontSize: '2rem' }} /></h1>
      <div className="container mx-auto my-8 p-8 bg-gray-300 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price (₦)
            </label>
            <input
              type="number"
              id="price"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter price"
              value={price}
              onChange={(e) =>setPrice(e.target.value)}
              required
            />
          </div>
            <small className='text-red-500'>{numError}</small>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) =>setQuantity(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={category_id}
              onChange={(e) => setCategory_id(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {allCats.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ArrowDropDownOutlinedIcon />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Product Description
            </label>
            <textarea
              id="description"
              className="resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
              Product Images ({images.length}){images.length === 5 && (<small className='text-red-500'>Maximum number reached</small>)}
            </label>
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({ imageList, onImageUpload, onImageRemoveAll, isDragging, dragProps, onImageUpdate }) => (
                <div className="flex-col flex-wrap justify-center items-center">
                  <div className='flex flex-wrap justify-center items-center'>
                    {imageList.map((image, index) => (
                      <div key={index} className=" flex-col items-center image-item rounded-md m-2 overflow-hidden">
                        <img src={image['data_url']} alt="" className="w-20 h-20 object-cover m-auto" />
                        <div className="image-item__btn-wrapper mt-2 flex justify-center">
                          <button
                            type="button"
                            className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-1 px-2 rounded-md"
                            onClick={() => onImageUpdate(index)}
                          >
                            <EditOutlinedIcon />
                          </button>
                          <button
                            type="button"
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md ml-2"
                            onClick={() => handleRemove(index)}
                          >
                            <DeleteOutlineOutlinedIcon />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                      onClick={onImageUpload}
                      disabled={images.length === 5}
                      {...dragProps}
                    >
                      Upload Images <AddPhotoAlternateOutlinedIcon />
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
                      onClick={onImageRemoveAll}
                    >
                      Remove All <RemoveCircleOutlineOutlinedIcon />
                    </button>
                  </div>
                </div>
              )}
            </ImageUploading>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading} 
          >
            {loading ? 'Creating Product...' : 'Create Product'}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProducts;
