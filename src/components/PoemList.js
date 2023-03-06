import React, { useEffect, useState } from "react";
import './PoemList.css';
import AddPoem from "./AddPoem";
// import { useNavigate } from "react-router-dom";


function PoemList() {
    const [poems, setPoems] = useState ([]);
    const [searchTerm, setSearchTerm] = useState('');
    // const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9292/poems")
        .then(response => response.json())
        .then((poems) => setPoems(poems))  
    }, []);

    const filteredPoems = poems.filter((poem) =>
    poem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleAddPoem(newPoem){
  const updatedPoem = [...poems, newPoem]
    setPoems(updatedPoem)
  };

  if (poems.length === 0) {
      return <div>Loading poems...</div>;
    }

  return (
      <div className="poem-list-container">
      <h1>Poems</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredPoems.map((poem) => (
      <div className="poem-card" key={poem.id}>
        <div className="poem-content">
          <h2>{poem.title}</h2>
          <p>{poem.lines}</p>
          <span>{poem.author}</span>
        </div>
      </div>
    ))}
   <AddPoem onAdd={handleAddPoem} />
    </div>
  );

}

export default PoemList;
