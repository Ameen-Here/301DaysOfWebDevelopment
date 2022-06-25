import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, updateNotes] = useState([]);

  function addNotes(newNote) {
    updateNotes((prevNotes) => {
      return [newNote, ...prevNotes];
    });
  }

  function deleteNote(id) {
    updateNotes((prevNotes) => {
      return prevNotes.filter((note, index) => index !== id);
    });
  }
  return (
    <div>
      <Header />
      <CreateArea addNotes={addNotes} />
      {notes.map((note, index) => {
        return (
          <Note
            deleteNote={deleteNote}
            key={index}
            id={index}
            title={note[0]}
            content={note[1]}
          />
        );
      })}

      <Footer />
    </div>
  );
}

export default App;
