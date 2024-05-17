'use server'

import { streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { createStreamableValue } from 'ai/rsc';
import {z} from 'zod';
export async function generate(input: string) {
  'use server'

  const stream = createStreamableValue('');
  console.log("action",input);
  const groq  = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY
  });
  (async () => {
    const { textStream } = await streamText({
      model: groq("llama3-8b-8192"),
      prompt: input
    })

    for await (const delta of textStream) {
      stream.update(delta)
    }

    stream.done()
  })()

  return { output: stream.value }
}
// export async function browseMeAPI(input: string) {
//   'use server'

//   const stream = createStreamableUI(); // [!code highlight]
//   const {text,toolResults} = await generateText({
//     model:openai('gpt-3.5-turbo'),
//     system:`You are an AI-powered online search answering engine. Your role is to help users find the information they are seeking by conducting web searches on their behalf, reviewing and curating the results, and providing a synthesized answer in a clean, easy-to-read format.`,
//     prompt:input,
//     tools: {
//       showSearch: {
//         description: 'Get the search results and provide in clean component ',
//         parameters: z.object({
//           searchParam: z.string().describe('The user input'),
//         }),
//         execute: async ({ searchParam }) => {
//           stream.done(<WebCurator searchParam={searchParam}/>);  // [!code highlight]
//           return `Here's curated result for ${searchParam}!`;  // [!code highlight]
//         },
//       },
//     }
//   });

//   return {
//     messages: [
//       {
//         role: 'assistant' as const,
//         content:
//           text || toolResults.map(toolResult => toolResult.result).join(),
//         display: stream.value,
//       },
//     ],
//   };
// }

