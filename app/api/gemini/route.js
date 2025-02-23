import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  const { prompt } = await request.json();

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Extract the generated text from the response
    const generatedText = response.data.candidates[0].content.parts[0].text;
    return NextResponse.json({ response: generatedText });
  } catch (error) {
    console.error("Error fetching Gemini response:", error.message);
    console.error("Error details:", error.response?.data || error);
    return NextResponse.json(
      { response: "Sorry, something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
