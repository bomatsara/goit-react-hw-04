import css from './ErrorMessage.module.css';

export default function ErrorMessage({ text }) {
  return (
    <>
      <div style={{
        marginBottom: 15,
      }}>{text}</div>
    </>
  );
};