import { useState } from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

function ContactForm({ onSubmit, arr }) {
  const [name, SetName] = useState('');
  const [number, SetNumber] = useState('');

  const handleNumberChange = e => {
    const currentTarget = e.currentTarget.name;
    const value = e.currentTarget.value;
    if (currentTarget === 'name') {
      SetName(value);
    }
    if (currentTarget === 'number') {
      SetNumber(value);
    }
  };

  const checkName = () => {
    const nameArray = arr.map(arr => arr.name.toLowerCase());
    if (nameArray.includes(name.toLowerCase())) {
      alert(`${name} is alredy in contacts`);
    } else {
      onSubmit(name, number);
      SetName('');
      SetNumber('');
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    checkName();
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <label className={styles.label}>
        Name
        <input
          value={name}
          onChange={handleNumberChange}
          className={styles.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={styles.label}>
        Number
        <input
          value={number}
          onChange={handleNumberChange}
          className={styles.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button className={styles.btn} type="submit">
        Add Contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  arr: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default ContactForm;
