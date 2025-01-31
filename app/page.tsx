'use client';

import { useChat } from 'ai/react';

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const hasMessages = messages.length > 0;

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b z-50">
        <div className="md:max-w-4xl mx-auto px-6 py-3 flex justify-between items-center">
          <a
            href="https://dashboard.exa.ai"
            target="_blank"
            className="flex items-center px-4 py-1 bg-[var(--brand-default)] text-white rounded-md hover:bg-[var(--brand-muted)] transition-colors font-medium"
          >
            <span>Try Exa API</span>
          </a>
          <a
            href="https://github.com/yourusername/your-repo"
            target="_blank"
            className="flex items-center gap-1.5 text-md text-gray-600 hover:text-[var(--brand-default)] transition-colors"
          >
            <span className="underline">GitHub</span>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="md:max-w-4xl mx-auto p-6 pt-20 pb-24 space-y-6">
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id}>
              <div
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`rounded-lg py-3 px-4 max-w-[85%] ${
                    message.role === 'user'
                      ? 'bg-[var(--secondary-darker)] text-black'
                      : 'text-gray-900'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-[15px]">
                    {message.content}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-center gap-3 text-gray-500 animate-pulse">
              <div className="w-2 h-2 rounded-full bg-[var(--secondary-accent2x)] animate-[bounce_1s_infinite]"></div>
              <div className="w-2 h-2 rounded-full bg-[var(--secondary-accent2x)] animate-[bounce_1s_infinite_200ms]"></div>
              <div className="w-2 h-2 rounded-full bg-[var(--secondary-accent2x)] animate-[bounce_1s_infinite_400ms]"></div>
              <span className="text-sm font-medium text-[var(--secondary-accent2x)]">Asking o3-mini...</span>
            </div>
          )}
        </div>
      </div>

      {/* Input Form - centered when no messages, fixed bottom otherwise */}
      <div className={`${
        hasMessages 
          ? 'fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t' 
          : 'fixed inset-0 flex items-center justify-center bg-transparent'
        } z-40 transition-all duration-300`}>
        <div className={`${
          hasMessages 
            ? 'w-full max-w-4xl mx-auto px-6 py-4' 
            : 'w-full max-w-2xl mx-auto px-6'
          }`}>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask something..."
              className="flex-1 p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--brand-default)] text-base"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-5 py-3 bg-[var(--brand-default)] text-white rounded-md hover:bg-[var(--brand-muted)] disabled:opacity-50 disabled:cursor-not-allowed font-medium w-[120px] transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}