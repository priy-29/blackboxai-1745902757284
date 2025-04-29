import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chatMessages');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      const data = await response.json();
      if (data.error) {
        setMessages((prev) => [...prev, { role: 'error', content: data.error }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.result }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'error', content: 'Error connecting to AI service.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-center text-xl font-semibold">
        Personal AI Chat
      </header>
      <main className="flex-1 overflow-auto p-4">
        <div className="max-w-3xl mx-auto flex flex-col space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg max-w-xs ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white self-end'
                  : msg.role === 'assistant'
                  ? 'bg-gray-300 text-gray-900 self-start'
                  : 'bg-red-500 text-white self-center'
              }`}
            >
              {msg.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <form onSubmit={handleSubmit} className="p-4 bg-white flex max-w-3xl mx-auto w-full">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
