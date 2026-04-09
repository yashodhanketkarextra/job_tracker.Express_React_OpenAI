import { useState } from "react";

import { generateResume } from "@/api/ai";

interface ResumeSuggestionsProps {
  role: string;
  skills: string[];
}

export const ResumeSuggestions = ({ role, skills }: ResumeSuggestionsProps) => {
  const [bullets, setBullets] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!role) return;

    const res = await generateResume(role, skills);
    setBullets(res.bullets || []);
  };

  return (
    <div className="my-2">
      <button type="button" onClick={handleGenerate} className="w-full">
        Generate Resume Points
      </button>
      <ul className="flex flex-col gap-2 mt-2">
        {bullets.map((b, i) => (
          <li key={i}>
            <span>{b}</span>
            <button
              className="p-1! mx-2!"
              onClick={() => navigator.clipboard.writeText(b)}
            >
              Copy
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
