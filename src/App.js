import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { createWorker } from "tesseract.js";
import lodimg from "./image/index.svg";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("");
  const [loading, setLoading] = useState();
  const worker = createWorker();

  const convertImageToText = useCallback(async () => {
    if (!selectedImage) return;
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const { data } = await worker.recognize(selectedImage);
    setTextResult(data.text);
    await worker.terminate();
    setLoading(false);
  }, [worker, selectedImage]);

  useEffect(() => {
    convertImageToText();
  }, [selectedImage, convertImageToText]);

  const handelChangeImage = (e) => {
    setSelectedImage(e.target.files[0]);
    setLoading(true);
  };
  return (
    <div className="App">
      <h1>
        Im<span className="logo-color">Text</span>
      </h1>
      <h1 className="title-hero">Upload an image to convert text </h1>

      <div className="input-wrapper">
        <label htmlFor="upload">
          <i class="fa-solid fa-upload"></i>
          Upload Image
        </label>
        <input
          type="file"
          id="upload"
          accept="image/*"
          onChange={handelChangeImage}
        />
      </div>
      <div className="loading">
        {loading && (
          <div className="loader-wrapper">
            <img src={lodimg} alt="img-loader" />
            <h3>Loading.....</h3>
          </div>
        )}
      </div>

      <div className="result">
        {selectedImage && (
          <div className="box-image">
            <img src={URL.createObjectURL(selectedImage)} alt="thumb" />
          </div>
        )}
        {textResult && (
          <div className="box-p">
            <p>{textResult}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
