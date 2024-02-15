"use client";
import styles from "../../styles/Gallery.module.css";

const GalleryGrid = ({ images, onImageClick }) => {
  return (
    <div className={styles.gallery_grid}>
      {images.map(image => (
        <div className={styles.image_div} key={image.id}>
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
