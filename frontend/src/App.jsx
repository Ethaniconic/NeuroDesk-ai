import { useState } from "react";
import { uploadFile, processDocument } from "./services/api";
import Header from "./components/Header";
import UploadBox from "./components/UploadBox";
import UploadButton from "./components/UploadButton";
import FileCard from "./components/FileCard";
import ProcessButton from "./components/ProcessButton";
import ProcessingSummary from "./components/ProcessingSummary";

const App = () => {
  const [file, setFile] = useState(null);
  const [uploadedDoc, setUploadedDoc] = useState(null);
  const [processedResult, setProcessedResult] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async () => {
    if (!file || uploading) return;
    setUploading(true);
    setError(null);

    try {
      const res = await uploadFile(file);
      if (res.status === "success") {
        setUploadedDoc(res.data);
        setFile(null);
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleProcess = async () => {
    if (!uploadedDoc || processing) return;
    setProcessing(true);
    setError(null);

    try {
      const docId = uploadedDoc.stored_name || uploadedDoc.filename;
      const res = await processDocument(docId);
      setProcessedResult(res);
    } catch (err) {
      setError(err.response?.data?.detail || "Processing failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setUploadedDoc(null);
    setProcessedResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#182234] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#0a0f1d] border border-slate-800/80 rounded-2xl p-6 shadow-2xl space-y-4">
        {/* Header */}
        <Header />

        {/* Show Processing Summary Target UI if processing finished */}
        {processedResult ? (
          <ProcessingSummary
            data={processedResult}
            filename={uploadedDoc?.filename}
            onReset={handleReset}
          />
        ) : (
          <>
            {/* 1. Upload box (shown when not uploaded yet) */}
            {!uploadedDoc && (
              <UploadBox
                onFileSelect={(f) => {
                  setFile(f);
                  setUploadedDoc(null);
                  setError(null);
                }}
                onError={(msg) => {
                  setError(msg);
                  setFile(null);
                }}
              />
            )}

            {/* Error Card */}
            {error && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{error}</span>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-rose-400 hover:text-rose-200 p-0.5 cursor-pointer"
                  title="Dismiss"
                >
                  ✕
                </button>
              </div>
            )}

            {/* 2. Selected file preview before upload */}
            {file && !uploadedDoc && (
              <FileCard doc={file} onRemove={() => setFile(null)} />
            )}

            {/* 3. Upload button */}
            {!uploadedDoc && (
              <UploadButton onUpload={handleUpload} loading={uploading} disabled={!file} />
            )}

            {/* 4. Upload Success card + Process Document button */}
            {uploadedDoc && (
              <div className="space-y-3 pt-1">
                <FileCard
                  doc={uploadedDoc}
                  isSuccess={true}
                  onRemove={handleReset}
                />
                <ProcessButton
                  onProcess={handleProcess}
                  loading={processing}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;