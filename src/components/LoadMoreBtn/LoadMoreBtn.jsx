import css from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onClick }) {
  return (
    <button className={css['btn-load-more']} onClick={onClick}>
      Load More
    </button>
  );
}