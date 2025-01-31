import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import Exa from 'exa-js';

// Allow responses up to 5 minutes
export const maxDuration = 300;

const exa = new Exa(process.env.EXA_API_KEY);

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('o3-mini'),
    system: 'Always use the webSearch tool. Always provide source links in your response (the sources which you got from the webSearch tool). You are a helpful assistant that searches the web for information and provides accurate answer. Use simple english. Use the webSearch tool in every message!',
    messages,
    providerOptions: {
        openai: { reasoningEffort: 'medium' },
      },
    maxSteps: 2,
    tools: {
      webSearch: tool({
        description: 'Search the web for current information on a topic. Use this tool in every message, always. Always provide source links in your response.',
        parameters: z.object({
          query: z.string().describe('The search query'),
        }),
        execute: async ({ query }) => {
          try {
            const results = await exa.search(query, {
              
              
              numResults: 5,
              type: 'auto',
              useAutoprompt: true
            });
            return results.results;
          } catch (error) {
            console.error('Exa search error:', error);
            return { error: 'Failed to perform web search' };
          }
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}