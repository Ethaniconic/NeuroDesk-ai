import React, { useRef, useState } from "react";

const UploadBox = ({ onFileSelect, onError }) => {
  const [isDrag, setIsDrag] = useState(false);
  const inputRef = useRef(null);

  const validateAndSelect = (file) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      onError?.("Invalid file type. Only .pdf files are supported.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      onError?.("File too large. Maximum size is 20MB.");
      return;
    }
    onFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDrag(false);
    validateAndSelect(e.dataTransfer.files?.[0]);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setIsDrag(true); }}
      onDragLeave={() => setIsDrag(false)}
      onDrop={handleDrop}
      className={`border border-dashed rounded-2xl p-7 text-center cursor-pointer transition-all duration-300 ${
        isDrag ? "border-cyan-400 bg-cyan-950/30 scale-[1.01]" : "border-slate-800 bg-[#0d1527]/70 hover:border-cyan-500/60"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => validateAndSelect(e.target.files?.[0])}
      />
      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-sm font-semibold text-slate-200">Drop your files here or browse</h3>
      <p className="text-xs text-slate-400 mt-1">Support files: PDF</p>
      <p className="text-[11px] text-slate-500 mt-0.5">Max file size: 20MB</p>
    </div>
  );
};

export default UploadBox;