"use client"
/* Home.js */

import React, { useState, useEffect, useRef } from 'react';
import GalleryGrid from './components/Gallery/page';
import ImagePopup from './components/Image/page';
import ImagePlaceholder from './components/Loader/page';

export default function Home() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [fetchingPage, setFetchingPage] = useState(false);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  const fetchImages = async () => {
    try {
      setFetchingPage(true);
      scrollPositionRef.current = window.scrollY;
      const response = await fetch(`https://picsum.photos/v2/list?page=${page}`);
      const data = await response.json();
      setImages(prevImages => [...prevImages, ...data]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setFetchingPage(false);
      setLoading(false);
    }
  }; 

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
  };

  const handleNextImage = () => {
    // Implement logic to show the next image
    // For example:
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    if (currentIndex !== -1 && currentIndex < images.length - 1) {
      setSelectedImage(images[currentIndex + 1]);
    }
  };

  const handlePreviousImage = () => {
    // Implement logic to show the previous image
    // For example:
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    if (currentIndex !== -1 && currentIndex > 0) {
      setSelectedImage(images[currentIndex - 1]);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !loading &&
      !fetchingPage
    ) {
      fetchImages();
    }
  };

  useEffect(() => {
    if (!fetchingPage) {
      window.scrollTo(0, scrollPositionRef.current);
    }
  }, [fetchingPage]);

  return (
    <div className="app">
      <h1 className='heading fixed-header'>GalleryX</h1>
      {loading ? (
        <ImagePlaceholder />
      ) : (
        <GalleryGrid images={images} onImageClick={handleImageClick} />
      )}
      {selectedImage && (
        <ImagePopup
          image={selectedImage}
          onClose={handleClosePopup}
          onNext={handleNextImage}
          onPrevious={handlePreviousImage}
        />
      )}
    </div>
  );
}
