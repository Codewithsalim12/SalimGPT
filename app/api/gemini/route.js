import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  const { prompt } = await request.json();

  try {
    // Use the recommended model: gemini-1.5-flash
    const modelName = "models/gemini-1.5-flash";

    console.log("Using model:", modelName);

    // Generate content using the model
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
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

    if (!response.data.candidates || !response.data.candidates[0]) {
      throw new Error("Invalid response format from Gemini API");
    }

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
