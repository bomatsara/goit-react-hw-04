import css from './SearchBar.module.css';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import errorMessages from '../../data/error_messages.json';

export default function SearchBar({ onSubmit, query, errorHandle }) {
  const handleSubmit = e => {
    e.preventDefault();
    const value = e.target.elements.search.value;

    if (query === value) {
      return;
    }

    if (value.trim() === '') {
      errorHandle(errorMessages.empty_query);
      return;
    }

    onSubmit(value);
    e.target.reset();
  };

  return (
    <>
      <header className={css['header']}>
        <form onSubmit={handleSubmit} className={css['form']}>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="search"
            className={css['form-input']}
          />
          <button className={css['form-btn']} type="submit" title="search"><FaMagnifyingGlass /></button>
        </form>
      </header>
    </>
  );
};