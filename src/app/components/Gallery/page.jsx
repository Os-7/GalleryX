"use client";
import styles from "../../styles/Gallery.module.css"

// GalleryGrid component to display a grid of images
const GalleryGrid = ({ images, onImageClick }) => {
  let id=0;
  return (
    // Container for the gallery grid
    <div className={styles.gallery_grid}>
      {/* Mapping through the images array to render each image */}
      {images.map(image => (
        // Each image container with a unique key
        <div className={styles.image_div} key={id++}>
          {/* Image element with onClick event handler */}
          <img
            src={image.download_url}
            alt={image.title}
            onClick={() => onImageClick(image)}
          />
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
