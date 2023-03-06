import React, { useEffect, useState } from "react";
import "./PoemList.css";
import AddPoem from "./AddPoem";

function PoemList() {
  const [poems, setPoems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPoem, setEditingPoem] = useState(null);

  useEffect(() => {
    fetch("http://localhost:9292/poems")
      .then((response) => response.json())
      .then((poems) => setPoems(poems));
  }, []);

  const filteredPoems = poems.filter((poem) =>
    poem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleAddPoem(newPoem) {
    const updatedPoem = [...poems, newPoem];
    setPoems(updatedPoem);
  }

  function handleDeletePoem(id) {
    fetch(`http://localhost:9292/poems/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete poem");
        }
        setPoems(poems.filter((poem) => poem.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleEditPoem(poem) {
    setEditingPoem(poem);
  }

  function handleUpdatePoem(updatedPoem) {
    const updatedPoems = poems.map((poem) =>
      poem.id === updatedPoem.id ? updatedPoem : poem
    );
    setPoems(updatedPoems);
    setEditingPoem(null);

    fetch(`http://localhost:9292/poems/${updatedPoem.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPoem),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update poem");
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
      {editingPoem && (
        <AddPoem
          onAdd={handleUpdatePoem}
          onCancel={() => setEditingPoem(null)}
          poem={editingPoem}
        />
      )}
      {filteredPoems.map((poem) => (
        <div className="poem-card" key={poem.id}>
          <div className="poem-content">
            <h2>{poem.title}</h2>
            <p>{poem.lines}</p>
            <span>{poem.author}</span>
          </div>
          <div className="poem-buttons">
            <button onClick={() => handleEditPoem(poem)}>Edit</button>
            <button onClick={() => handleDeletePoem(poem.id)}>Delete</button>
          </div>
        </div>
      ))}
      <AddPoem onAdd={handleAddPoem} />
    </div>
  );
}

export default PoemList;
