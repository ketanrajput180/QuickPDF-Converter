import React, { useState } from "react";
import { FaCloudUploadAlt, FaCheckCircle } from "react-icons/fa";
import axios from "axios";

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convertStatus, setConvertStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [isConverting, setIsConverting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = [".doc", ".docx", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (!validTypes.includes(`.${fileExtension}`) && !validTypes.includes(file.type)) {
        setConvertStatus("❌ Please upload a valid Word document (.doc or .docx)");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setConvertStatus("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange({ target: { files: [file] } });
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsConverting(true);
    setProgress(30);
    setConvertStatus("");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("https://quickpdf-backend.onrender.com", formData, { responseType: "blob", timeout: 30000 });
      setProgress(80);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setProgress(100);
      setTimeout(() => {
        setIsConverting(false);
        setProgress(0);
        setSelectedFile(null);
      }, 1000);

      setConvertStatus("File Converted Successfully");

      import("canvas-confetti").then((confetti) => {
        confetti.default({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      });
    } catch (error) {
      console.error(error);
      setConvertStatus("❌ Something went wrong");
      setIsConverting(false);
      setProgress(0);
    }
  };

  return (
    <div className="w-full px-4">
      <div className="backdrop-blur-xl bg-white/40 border border-white/50 shadow-2xl rounded-2xl p-8 w-full max-w-lg transition-all duration-500 hover:shadow-green-300/50 mx-auto">

        <h1 className="text-3xl font-extrabold text-center mb-4 tracking-tight">
          Word <span className="text-green-600">To</span> PDF Converter
        </h1>

        <p className="text-sm text-center text-gray-600 mb-6">
          Drag & Drop or Upload Word Files — Fast, Secure & Free
        </p>

        <label
          htmlFor="fileInput"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-green-400 rounded-xl p-8 bg-white/60 hover:bg-green-50 transition-all duration-300"
        >
          <FaCloudUploadAlt className="text-4xl mb-3 text-green-500" />
          <span className="text-lg font-semibold text-center">
            {selectedFile ? selectedFile.name : "Upload or Drag File Here"}
          </span>
          {selectedFile && (
            <span className="text-xs mt-1 text-gray-600">
              {(selectedFile.size / 1024).toFixed(1)} KB
            </span>
          )}
          <input
            type="file"
            id="fileInput"
            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <button
          onClick={handleSubmit}
          disabled={!selectedFile || isConverting}
          className="mt-6 w-full py-3 bg-green-500 text-white font-bold rounded-xl text-lg transition-all duration-300 hover:bg-green-600 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed active:scale-95"
        >
          {isConverting ? "Converting..." : "Convert to PDF"}
        </button>

        {isConverting && (
          <div className="w-full bg-gray-200 h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-green-500 h-2 transition-all duration-300 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        )}

        {convertStatus && (
          <div className={`flex justify-center items-center gap-2 font-semibold mt-4 text-center ${
            convertStatus.includes("❌") ? "text-red-600" : "text-green-600"
          }`}>
            {convertStatus.includes("Successfully") && <FaCheckCircle />} 
            {convertStatus}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
