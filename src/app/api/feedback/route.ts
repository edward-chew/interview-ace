import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Prompt = {
  prompt: string;
};

export async function POST(req: Request) {
  console.log("feedback route called");
  const prompt: Prompt = await req.json();
  const promptText = prompt.prompt;

  // createChatCompletion (get response from GPT-4)
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a tech hiring manager. You are to only provide feedback on the interview candidate's transcript. If it is not relevant and does not answer the question, make sure to say that. Do not be overly verbose and focus on the candidate's response.",
      },
      { role: "user", content: promptText },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 450,
    n: 1,
  });

  return NextResponse.json({ res: response.choices[0].message });
}
