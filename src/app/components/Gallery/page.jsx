
"use client";
import styles from "../../styles/Gallery.module.css"

const GalleryGrid = ({ images, onImageClick }) => {
  let id=0;
  return (
    <div className={styles.gallery_grid}>
      {images ? images.map(image => (
        <div className={styles.image_div} key={id++}><img
          src={image.download_url}
          alt={image.title}
          onClick={() => onImageClick(image)}
        /></div>
      )): null}
    </div>
  );
};

export default GalleryGrid;