import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

const ReviewContext = createContext();

export const useReviews = () => useContext(ReviewContext);

export const ReviewProvider = ({ children }) => {
  const baseUrl = 'https://aphia-dev.onrender.com/api';
  const token = localStorage.getItem('authToken');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/reviews/review/vendor`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        if (response.data.success === true) {
          setLoading(false);
          const recievedReviews = response.data.message;
          setAllReviews(recievedReviews);
          setTotalPages(Math.ceil(recievedReviews.length / itemsPerPage));
          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = currentPage * itemsPerPage;
          setReviews(recievedReviews.slice(startIndex, endIndex));
          // setReviews(response.data.message);
          calculateAverageRating(response.data.message);
        } else if (response.data.message === 'jwt expired') {
          setLoading(false);
          setErrors('Login expired, kindly log in again!');
        } else if (response.data.message === 'You have no order for your products') {
          setLoading(false);
          setErrors('You do not have any orders yet!');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        setErrors('Network failure!.. Try again');
      });
  }, [currentPage, itemsPerPage, token]);

  const handleNextPage = () => {
    
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      
      const startIndex = (nextPage - 1) * itemsPerPage;
      const endIndex = nextPage * itemsPerPage;
      setReviews(allReviews.slice(startIndex, endIndex)); // Use allProducts for pagination
    }
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      setCurrentPage(previousPage);

      const startIndex = (previousPage - 1) * itemsPerPage;
      const endIndex = previousPage * itemsPerPage;
      setReviews(allReviews.slice(startIndex, endIndex)); // Use allProducts for pagination
    }
  };

  function calculateAverageRating(myReviews) {
    if (myReviews.length > 0) {
      const totalRatings = myReviews.reduce((acc, review) => acc + review.rating, 0);
      const average = totalRatings / myReviews.length;
      setAverageRating(average.toFixed(1));
    }
  }

  console.log(averageRating);

  const contextValue = {
    loading,
    reviews,
    errors,
    averageRating,
    totalPages,
    allReviews,
    currentPage,
    itemsPerPage,
    handleNextPage,
    handlePreviousPage,
  };

  return <ReviewContext.Provider value={contextValue}>{children}</ReviewContext.Provider>;
};