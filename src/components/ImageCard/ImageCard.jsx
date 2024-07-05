import css from './ImageCard.module.css';
import { FaMagnifyingGlass } from 'react-icons/fa6';

export default function ImageCard({ photo, onPhotoClick }) {
  const imageUrl = photo.urls.small ?? photo.urls.regular;
  const alt = photo.alt_description;

  return (
    <>
      <div onClick={() => {
        onPhotoClick(photo);
      }} className={css['image-card']}>
        <img src={imageUrl} alt={alt} />

        <div className={css['image-card-overlay']}>
          <FaMagnifyingGlass className={css['icon']} />
        </div>
      </div>
    </>
  );
};