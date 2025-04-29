# Personal AI Chat Web Application

This is a personal AI chat web application built with Next.js, Tailwind CSS, and OpenAI GPT API integration. It allows you to chat with an AI in real-time with a simple and responsive interface. Chat history is saved in the browser's localStorage.

## Features

- Real-time chat with AI using OpenAI GPT-3.5 Turbo model
- Simple, clean, and responsive UI with Tailwind CSS
- Chat history saved locally in browser
- Easy deployment on Vercel

## Setup

1. Clone the repository.

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [liathasildisini](https://blackboxai-1745902757284-kevy.vercel.app/) to view the app.

## Deployment

This app is ready to be deployed on Vercel. Just push your code to a GitHub repository and import it in Vercel. Set the `OPENAI_API_KEY` environment variable in Vercel dashboard.

## Notes

- Make sure to keep your OpenAI API key secure.
- This app uses the GPT-3.5 Turbo model for chat completions.
- Chat history is stored only in the browser's localStorage and is not synced across devices.

## License

MIT License
