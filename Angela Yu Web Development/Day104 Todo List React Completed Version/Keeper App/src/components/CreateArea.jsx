import React, { useState } from "react";

function CreateArea(props) {
  const [title, updateTitle] = useState("");
  const [content, updateContent] = useState("");
  function titleUpdate(e) {
    updateTitle(e.target.value);
  }

  function contentUpdate(e) {
    updateContent(e.target.value);
  }

  function submitNote(e) {
    e.preventDefault();
    props.addNotes([title, content]);
    updateContent("");
    updateTitle("");
  }

  return (
    <div>
      <form onSubmit={submitNote}>
        <input
          onChange={titleUpdate}
          name="title"
          placeholder="Title"
          value={title}
        />
        <textarea
          onChange={contentUpdate}
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={content}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
