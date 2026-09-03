import React from "react";

const UploadButton = ({ onUpload, loading, disabled }) => {
  return (
    <button
      onClick={onUpload}
      disabled={disabled || loading}
      className="w-full py-2.5 px-4 rounded-xl font-medium text-sm text-white bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-950/40 flex items-center justify-center gap-2 cursor-pointer"
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Uploading...</span>
        </>
      ) : (
        <span>Upload File</span>
      )}
    </button>
  );
};

export default UploadButton;