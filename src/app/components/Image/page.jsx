"use client";
import styles from "../../styles/Image.module.css";

const ImagePopup = ({ image, onClose, onNext, onPrevious }) => {
  return (
    <div className={styles.image_popup} onClick={onClose}>
      <div className={styles.popup_content} onClick={e => e.stopPropagation()}>
        <button className={styles.close_btn} onClick={onClose}>Close</button>
        <div className={styles.next_prev}>
        <button className={styles.prev_btn} onClick={onPrevious}>{`<`}</button>
        <img src={image.download_url} alt={image.title} />
        <button className={styles.next_btn} onClick={onNext}>{`>`}</button>
        </div>
        <div className={styles.details}>
          <p><b>Author: </b> {image.author}</p>
          <p><b>Download URL: </b><a href={image.download_url} target="_blank">Download</a></p>
          <p><b>URL: </b> <a href={image.url} target="_blank">Source</a></p>
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;
