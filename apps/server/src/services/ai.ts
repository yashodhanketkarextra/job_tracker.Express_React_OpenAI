import OpenAI from "openai";
import { GROQ_API_KEY } from "../secrets";

const client = new OpenAI({
  apiKey: GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const parseJD = async (jd: string) => {
  const res = await client.chat.completions.create({
    model: "openai/gpt-oss-120b",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You are a strict JSON generator. Always return valid JSON only. No text outside JSON.",
      },
      {
        role: "user",
        content: `Extract structured job data in JSON format: { company: string, role: string, required_skills: string[], nice_to_have_skills: string[], seniority: string, location: string }. Job Description: ${jd}`,
      },
    ],
  });

  const content = res.choices[0].message.content || "{}";
  let parsed;

  try {
    parsed = JSON.parse(content);
  } catch (err) {
    const match = content.match(/\{[\s\S]*\}/);
    parsed = match ? JSON.parse(match[0]) : {};
  }

  return parsed;
};

export const generateResumeBulletes = async (
  role: string,
  skills: string[],
) => {
  const res = await client.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "system",
        content:
          "You are a plain text generator. No JSON. No markdown. No headers. Just the bullet points.",
      },
      {
        role: "user",
        content: `Generate 3-5 short, professional resume bullet points for:
      Role: ${role}
      Skills: ${skills.join(", ")}

      Output rules:
      - One bullet point per line
      - No JSON formatting
      - No symbols or dots at the start
      - Just the sentences`,
      },
    ],
    temperature: 0.2,
  });

  return res.choices[0].message.content;
};
