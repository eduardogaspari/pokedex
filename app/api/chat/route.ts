import { streamText, Message } from 'ai'
import { groq } from '@ai-sdk/groq'

export async function POST(req: Request) {
  try {
    const { messages }: { messages: Message[] } = await req.json()

    const lastUserMessage = [...messages]
      .reverse()
      .find((msg) => msg.role === 'user')

    const pokemonName = lastUserMessage?.content?.trim()

    if (!pokemonName) {
      return new Response('Bad request.', { status: 400 })
    }

    const result = await streamText({
      model: groq('meta-llama/llama-4-scout-17b-16e-instruct'),
      system: `
      You are an expert in the Pokémon universe. Your role is to write detailed,
      immersive, and engaging descriptions about individual Pokémon. Use between 5 and 7 paragraphs,
      always focusing exclusively on the mentioned Pokémon. Include information about its appearance,
      behavior, known abilities, habitat, and any interesting details that make it stand out in the Pokémon world.
      Avoid mentioning trainers, anime, games, or anything outside the biological and natural context of the Pokémon
      itself. Respond directly, as if your description will be displayed in the interface of a Pokémon encyclopedia app.
      Use only text, no special characters, asterisks, or symbols. Only letters and numbers.`,
      prompt: `Talk about this Pokemon: ${pokemonName}.`,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Streaming error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
