"use client";
import styles from "../../styles/Image.module.css";

// ImagePopup component to display an image popup with navigation buttons
const ImagePopup = ({ image, onClose, onNext, onPrevious }) => {
  return (
    // Outer container for the popup, clicking on it closes the popup
    <div className={styles.image_popup} onClick={onClose}>
      {/* Inner container for the popup content */}
      <div className={styles.popup_content} onClick={e => e.stopPropagation()}>
        {/* Close button to close the popup */}
        <button className={styles.close_btn} onClick={onClose}>Close</button>
        {/* Container for next and previous navigation buttons */}
        <div className={styles.next_prev}>
          {/* Previous button */}
          <button className={styles.prev_btn} onClick={onPrevious}>{`<`}</button>
          {/* Image to display */}
          <img src={image.download_url} alt={image.title} />
          {/* Next button */}
          <button className={styles.next_btn} onClick={onNext}>{`>`}</button>
        </div>
        {/* Details section */}
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
