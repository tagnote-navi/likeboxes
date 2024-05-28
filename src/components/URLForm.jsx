import React, { useState } from 'react';

function URLForm() {
  const [url, setUrl] = useState('');
  const [metadata, setMetadata] = useState(null);

  const fetchMetadata = async () => {
    try {
      const response = await fetch(`http://localhost:5000/fetch-metadata?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      setMetadata(data);
    } catch (error) {
      console.error('Error fetching metadata:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMetadata();
  };

  return (
    <div className="url-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Fetch Metadata</button>
      </form>
      {metadata && (
        <div className="metadata">
          <h2>{metadata.title}</h2>
          <p>{metadata.description}</p>
          {metadata.ogImage && <img src={metadata.ogImage} alt="OG Image" />}
        </div>
      )}
    </div>
  );
}

export default URLForm;