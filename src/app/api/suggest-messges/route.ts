// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextResponse } from 'next/server';

// const genAI = new GoogleGenerativeAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// export const runtime = 'edge';

// export async function POST(req: Request) {
//   try {
//     const prompt =
//       "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const result = await model.generateContentStream({
//       contents: [
//         {
//           role: "user",
//           parts: [{ text: prompt }],
//         },
//       ],
//     });

//     // Create a custom stream from Gemini's stream
//     const customStream = new ReadableStream({
//       async start(controller) {
//         try {
//           for await (const chunk of result.stream) {
//             const text = chunk.text();
//             if (text) {
//               controller.enqueue(new TextEncoder().encode(text));
//             }
//           }
//           controller.close();
//         } catch (error) {
//           controller.error(error);
//         }
//       },
//     });

//     return new Response(customStream, {
//       headers: {
//         "Content-Type": "text/event-stream",
//         "Cache-Control": "no-cache",
//         "Connection": "keep-alive",
//       },
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json(
//         { message: error.message },
//         { status: 500 }
//       );
//     } else {
//       console.error('An unexpected error occurred:', error);
//       return NextResponse.json(
//         { message: 'An unexpected error occurred' },
//         { status: 500 }
//       );
//     }
//   }
// }

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    messages: [
      "You can do this 💪",
      "Keep going 🚀",
      "You're learning fast 🔥",
    ],
  });
}
