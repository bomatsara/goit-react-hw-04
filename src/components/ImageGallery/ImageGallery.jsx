import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard.jsx';

export default function ImageGallery({ photos, onPhotoClick, firstNewPhotoIndex, firstNewPhotoRef }) {
  return (
    <>
      <ul className={css['gallery']}>
        {photos.map((photo, index) => {
          const isFirstNewPhoto = index === firstNewPhotoIndex.current;
          return (
            <li className={css['gallery-item']} key={photo.id} ref={isFirstNewPhoto ? firstNewPhotoRef : null}>
              <ImageCard photo={photo} onPhotoClick={onPhotoClick} />
            </li>
          );
        })}
      </ul>
    </>
  );
};