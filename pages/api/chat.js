import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages format' });
  }

  try {
    // Prepare messages for OpenAI chat completion
    const chatMessages = messages.map(msg => {
      if (msg.role === 'user' || msg.role === 'assistant') {
        return { role: msg.role, content: msg.content };
      }
      return null;
    }).filter(Boolean);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chatMessages,
    });

    const result = completion.data.choices[0].message.content;
    res.status(200).json({ result });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
}
