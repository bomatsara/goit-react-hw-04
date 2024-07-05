import Section from './layout/Section/Section';
import SearchBar from './SearchBar/SearchBar.jsx';
import { useEffect, useRef, useState } from 'react';
import getPhotos from '../js/unsplash-api.js';
import Loader from './Loader/Loader.jsx';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn.jsx';
import ImageModal from './ImageModal/ImageModal.jsx';
import toast, { Toaster } from 'react-hot-toast';
import errorMessages from '../data/error_messages.json';

export default function App() {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const firstNewPhotoRef = useRef(null);
  const firstNewPhotoIndex = useRef(0);

  useEffect(() => {
    if (!query) return;

    async function fetchPhotos() {
      try {
        setLoading(true);
        setError(false);
        setErrorMessage('');
        const response = await getPhotos(query, page);

        console.log(response);

        if (response.data.results.length === 0) {
          setError(true);
          setErrorMessage(errorMessages.no_data);
        }

        setPhotos(prevPhotos => {
          firstNewPhotoIndex.current = prevPhotos.length;
          return [...prevPhotos, ...response.data.results];
        });
        setTotalPhotos(response.data.total);
      } catch (e) {
        setError(true);
        setErrorMessage(errorMessages.error);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, [query, page]);

  useEffect(() => {
    if (firstNewPhotoRef.current) {
      const offset = 10;
      const elementPosition = firstNewPhotoRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, [photos]);

  useEffect(() => {
    if (!errorMessage) return;

    toast.error(errorMessage);
  }, [errorMessage]);

  const handleSearch = query => {
    setQuery(query);
    setPhotos([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = photo => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <>
      <Section className="section-search" container={false} gap={false}>
        <SearchBar onSubmit={handleSearch} query={query} errorHandle={setErrorMessage} />
      </Section>

      <Section style={{
        textAlign: 'center',
      }} className="section-content">
        {photos && <ImageGallery
          photos={photos}
          onPhotoClick={openModal}
          firstNewPhotoRef={firstNewPhotoRef}
          firstNewPhotoIndex={firstNewPhotoIndex}
        />}
        {loading && <Loader />}
        {error && <ErrorMessage text={errorMessage} />}
        {photos.length < totalPhotos && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
      </Section>

      <ImageModal photo={selectedPhoto} isOpen={!!selectedPhoto} closeModal={closeModal} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}