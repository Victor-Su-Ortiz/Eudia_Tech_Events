import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownProps {
  content: string
  className?: string
}

export function Markdown({ content, className = '' }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className={`prose prose-gray dark:prose-invert max-w-none ${className}`}
      components={{
        h1: ({ children }) => <h1 className="mb-4 mt-6 text-3xl font-bold">{children}</h1>,
        h2: ({ children }) => <h2 className="mb-3 mt-5 text-2xl font-semibold">{children}</h2>,
        h3: ({ children }) => <h3 className="mb-2 mt-4 text-xl font-semibold">{children}</h3>,
        p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
        ul: ({ children }) => <ul className="mb-4 list-disc space-y-2 pl-6">{children}</ul>,
        ol: ({ children }) => <ol className="mb-4 list-decimal space-y-2 pl-6">{children}</ol>,
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:text-primary/80"
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="my-4 border-l-4 border-primary pl-4 italic">{children}</blockquote>
        ),
        code: ({ children, ...props }) => {
          const inline = (props as any).inline
          if (inline) {
            return (
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">{children}</code>
            )
          }
          return (
            <code className="block overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm">
              {children}
            </code>
          )
        },
        hr: () => <hr className="my-6 border-border" />,
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
