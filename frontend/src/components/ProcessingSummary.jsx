import React from "react";

const ProcessingSummary = ({ data, filename, onReset }) => {
  if (!data) return null;

  const displayFilename = filename || data.document_id || "document.pdf";
  const pages = data.pages ?? "—";
  const chunksCreated = data.chunks_created ?? "—";
  const status = "Ready for Embeddings";

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Target Details Card */}
      <div className="bg-[#0d1527] border border-slate-800 rounded-xl p-4 space-y-3.5 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-slate-200 tracking-wide uppercase">
              Processing Complete
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {status}
          </span>
        </div>

        {/* Detailed Metadata Grid */}
        <div className="space-y-2.5 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-slate-800/40">
            <span className="text-slate-400 font-medium">Filename</span>
            <span className="font-semibold text-slate-200 truncate max-w-[190px]" title={displayFilename}>
              {displayFilename}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-800/40">
            <span className="text-slate-400 font-medium">Pages</span>
            <span className="font-semibold text-indigo-300 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-800/30">
              {pages}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-800/40">
            <span className="text-slate-400 font-medium">Chunks Created</span>
            <span className="font-semibold text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/30">
              {chunksCreated}
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-400 font-medium">Status</span>
            <span className="font-semibold text-emerald-400">
              {status}
            </span>
          </div>
        </div>

        {/* Success summary note */}
        <div className="pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 flex items-start gap-2 bg-slate-900/40 p-2.5 rounded-lg">
          <svg className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            Successfully extracted {pages} pages and created {chunksCreated} chunks with 100-character overlap. Metadata ready for indexing.
          </span>
        </div>
      </div>

      {/* Action to process another file */}
      {onReset && (
        <button
          onClick={onReset}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Upload Another Document</span>
        </button>
      )}
    </div>
  );
};

export default ProcessingSummary;
