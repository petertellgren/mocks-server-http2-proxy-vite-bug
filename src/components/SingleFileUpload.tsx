import React, { useState } from "react";
import { uploadFile } from "../lib/services";

const SingleFileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const data = await uploadFile(file);       
        setResponse(data);
        setFile(null)
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <h2>POST multipart/form-data return application/json</h2>
      <div>
        <label htmlFor="file">
          Choose a file
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && <button onClick={handleUpload}>Upload a file</button>}
      { response && (
        <>
          <p>Response</p>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </>
      )}
    </>
  );
};

export default SingleFileUploader;