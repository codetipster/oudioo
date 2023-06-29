import React, { useState } from "react";
import "../../styles/createPodcast.scss";

const CreatePodcast = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // Making a POST request to the server
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/podcasts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Add the 'Authorization' header here
        },
        body: formData,
      }
    );

    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
    } else {
      console.log("Error: ", response.statusText);
    }
  };

  return (
    <div className="create-podcast">
      <h2>Create Podcast</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="description"
          />
        </label>
        <label>
          Cover Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePodcast;
