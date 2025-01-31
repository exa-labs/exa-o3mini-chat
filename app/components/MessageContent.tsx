// Helper function to convert URLs in text to clickable links
const MessageContent = ({ content }: { content: string }) => {
  // Regular expression to match URLs, including those in bullet points
  const urlRegex = /(https?:\/\/[^\s•]+)/g;
  
  // Split content by newlines to handle bullet points
  const lines = content.split('\n');
  
  return (
    <>
      {lines.map((line, lineIndex) => {
        // Check if line is empty
        if (!line.trim()) {
          return <br key={lineIndex} />;
        }

        // Split the line by URLs
        const parts = line.split(urlRegex);
        
        return (
          <div key={lineIndex} className="mb-1">
            {parts.map((part, partIndex) => {
              // Check if this part is a URL
              if (part.match(urlRegex)) {
                return (
                  <a
                    key={partIndex}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--brand-default)] hover:text-[var(--brand-muted)] underline"
                  >
                    {part}
                  </a>
                );
              }
              return <span key={partIndex}>{part}</span>;
            })}
          </div>
        );
      })}
    </>
  );
};

export default MessageContent; 