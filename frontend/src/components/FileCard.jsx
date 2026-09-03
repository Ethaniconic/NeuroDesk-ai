import React from "react";

const FileCard = ({ doc, isSuccess = false, onRemove }) => {
  if (!doc) return null;
  const name = doc.filename || doc.name;
  const size = doc.size_kb ? `${doc.size_kb} KB` : `${(doc.size / (1024 * 1024)).toFixed(1)} MB`;

  return (
    <div className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
      isSuccess ? "bg-emerald-950/20 border-emerald-500/40" : "bg-[#0d1527] border-slate-800"
    }`}>
      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
          isSuccess ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-400" : "bg-cyan-950/60 border-cyan-800/40 text-cyan-400"
        }`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="truncate">
          <p className="text-sm font-medium text-slate-200 truncate">{name}</p>
          <p className="text-xs text-slate-400">{size} • PDF</p>
        </div>
      </div>
      {isSuccess ? (
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
            ✓ Complete
          </span>
          {onRemove && (
            <button onClick={onRemove} className="text-slate-500 hover:text-slate-300 text-xs p-1" title="Dismiss">✕</button>
          )}
        </div>
      ) : onRemove && (
        <button onClick={onRemove} className="text-slate-500 hover:text-rose-400 p-1 text-sm cursor-pointer" title="Remove">
          ✕
        </button>
      )}
    </div>
  );
};

export default FileCard;
