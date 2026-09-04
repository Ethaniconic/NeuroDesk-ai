import React from "react";

const ProcessButton = ({ onProcess, loading, disabled }) => {
  return (
    <button
      onClick={onProcess}
      disabled={disabled || loading}
      className={`w-full py-3 px-4 rounded-xl font-medium text-sm text-white transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg ${
        loading
          ? "bg-gradient-to-r from-indigo-600 to-violet-600 opacity-90 cursor-wait shadow-indigo-950/60"
          : "bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-950/50 hover:shadow-indigo-900/60 hover:scale-[1.01] active:scale-[0.99]"
      } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-90"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="font-semibold tracking-wide">Processing...</span>
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4 text-indigo-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span className="font-semibold">Process Document</span>
        </>
      )}
    </button>
  );
};

export default ProcessButton;
