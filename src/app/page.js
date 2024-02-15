"use client"
import React, { useState, useEffect, useRef } from 'react';
import GalleryGrid from './components/Gallery/page';
import ImagePopup from './components/Image/page';
import ImagePlaceholder from './components/Loader/page';

export default function Home() {
  const [images, setImages] = useState([]); // State for storing images
  const [selectedImage, setSelectedImage] = useState(null); // State for storing the selected image
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [page, setPage] = useState(1); // State for pagination
  const [fetchingPage, setFetchingPage] = useState(false); // State for fetching new page
  const scrollPositionRef = useRef(0); // Ref for storing scroll position

  // Fetch images from API when component mounts
  useEffect(() => {
    fetchImages();
  }, []);

  // Add scroll event listener when loading state changes
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  // Fetch images from API
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

  // Handle click on an image
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Close the image popup
  const handleClosePopup = () => {
    setSelectedImage(null);
  };

  const handleNextImage = () => {
    if (selectedImage && images.length > 1) { // Ensure there are images to navigate
      const currentIndex = images.findIndex(img => img.id === selectedImage.id);
      if (currentIndex !== -1 && currentIndex < images.length - 1) {
        setSelectedImage(images[currentIndex + 1]);
      } else {
        // If currentIndex is already the last index, loop back to the first image
        setSelectedImage(images[0]);
      }
    }
  };
  
  const handlePreviousImage = () => {
    if (selectedImage && images.length > 1) { // Ensure there are images to navigate
      const currentIndex = images.findIndex(img => img.id === selectedImage.id);
      if (currentIndex !== -1 && currentIndex > 0) {
        setSelectedImage(images[currentIndex - 1]);
      } else {
        // If currentIndex is already the first index, loop back to the last image
        setSelectedImage(images[images.length - 1]);
      }
    }
  };
  

  // Handle scroll event to fetch more images when reaching the bottom of the page
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !loading &&
      !fetchingPage
    ) {
      fetchImages();
    }
  };

  // Restore scroll position after fetching new images
  useEffect(() => {
    if (!fetchingPage) {
      window.scrollTo(0, scrollPositionRef.current);
    }
  }, [fetchingPage]);

  return (
    <div className="app">
      {/* Header */}
      <h1 className='heading fixed-header'>GalleryX</h1>
      {/* Loading indicator or Gallery */}
      {loading ? (
        <ImagePlaceholder />
      ) : (
        <GalleryGrid images={images} onImageClick={handleImageClick} />
      )}
      {/* Image Popup */}
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
