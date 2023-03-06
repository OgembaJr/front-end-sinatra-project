import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AddPoem.css';

const AddPoem = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [lines, setLines] = useState('');
  const [author, setAuthor] = useState('');

  const onSubmit =async (e) => {
    e.preventDefault();

    if (!title || !lines) {
      alert('Please enter a title and poem lines');
      return;
    }

    const newPoem = {
      title,
      lines,
      author,
    };

    try {
      const response = await fetch('http://localhost:9292/poems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPoem),
      });
      if (response.ok) {
        onAdd(newPoem);
        setTitle('');
        setLines('');
        setAuthor('');
      } else {
        alert('Failed to add poem');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to add poem');
    }
  };

  return (
    <div className="add-poem-container">
      <h2>Add a new poem</h2>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Lines</label>
          <textarea
            placeholder="Enter poem lines (one per line)"
            value={lines}
            onChange={(e) => setLines(e.target.value)}
          ></textarea>
        </div>
        <div className="form-control">
          <label>Author</label>
          <input
            type="text"
            placeholder="Enter author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button className="btn add-btn">Add Poem</button>
      </form>
    </div>
  );
};

AddPoem.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddPoem;