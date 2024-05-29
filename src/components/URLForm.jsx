import React, { useState, useEffect } from 'react';

function URLForm() {
  const [url, setUrl] = useState('');
  const [metadata, setMetadata] = useState(null);

  const fetchMetadata = async (inputUrl) => {
    try {
      console.log(`Fetching metadata for URL: ${inputUrl}`);
      const response = await fetch(`http://localhost:5001/fetch-metadata?url=${encodeURIComponent(inputUrl)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMetadata(data);
      console.log('Metadata fetched:', data);
    } catch (error) {
      console.error('Error fetching metadata:', error);
    }
  };

  useEffect(() => {
    console.log(`URL changed to: ${url}`);
    if (url && url.startsWith('http')) {
      fetchMetadata(url);
    } else {
      setMetadata(null);
    }
  }, [url]);

  return (
    <div className="url-form">
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
          console.log(`Input changed to: ${e.target.value}`);
        }}
      />
      {metadata && (
        <div className="metadata">
          <h2>{metadata.title}</h2>
          {metadata.ogImage && <img src={metadata.ogImage} alt="OG Image" />}
        </div>
      )}
    </div>
  );
}

export default URLForm;
