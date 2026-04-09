import { useState } from "react";

import { parseJD } from "@/api/ai";
import { type IAiParseResponse } from "@/types/ai";

interface AISectionProps {
  onFill: (data: IAiParseResponse) => void;
}

export const AISection = ({ onFill }: AISectionProps) => {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);

  const handleParse = async () => {
    if (!jd.trim()) return;

    setLoading(true);
    try {
      const data = await parseJD(jd);
      onFill(data);
    } catch {
      console.error("AI parse failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <textarea
        onChange={(e) => setJd(e.target.value)}
        rows={3}
        className="p-2 shadow bg-white rounded"
      />
      <button
        type="button"
        onClick={handleParse}
        className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded"
      >
        {loading ? "Parsing..." : "Autofill"}
      </button>
    </div>
  );
};
