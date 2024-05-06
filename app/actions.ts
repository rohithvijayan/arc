'use server'

import { streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { createStreamableValue } from 'ai/rsc'

export async function generate(input: string) {
  'use server'

  const stream = createStreamableValue('');
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