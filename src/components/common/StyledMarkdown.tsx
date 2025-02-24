import Link from 'next/link'
import Markdown from 'react-markdown'

type Props = {
  body?: string
}

export const StyledMarkdown = ({ body = '' }: Props) => {
  return (
    <div className="[&_]:w-full [&>ul]:ml-2 [&>ol]:ml-2 [&:nth-child(1)]:my-0 text-sm mb-8">
      <Markdown
        remarkPlugins={[]}
        rehypePlugins={[]}
        components={{
          blockquote: ({ children }) => <div className="text-gray-500 border-l-[6px] pl-4">{children}</div>,
          img: ({ src, alt }) => {
            return (
              <a href={src} target="_blank">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={alt ?? ''} className="max-w-full object-contain" />
              </a>
            )
          },
          ul: ({ children }) => <ul className="list-disc list-inside ml-6">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside ml-6">{children}</ol>,
          li: ({ children }) => <li>{children}</li>,
          h1: ({ children, id }) => (
            <h1 id={id} className="text-2xl font-extrabold my-4 pt-4 pb-2 before:mt-16">
              {children}
            </h1>
          ),
          h2: ({ children, id }) => (
            <h2 id={id} className="border-b text-xl font-bold my-4 pt-2 pb-2">
              {children}
            </h2>
          ),
          h3: ({ children, id }) => (
            <h3 id={id} className="text-xl font-bold my-4 pt-4 pb-2">
              {children}
            </h3>
          ),
          h4: ({ children, id }) => (
            <h4 id={id} className="text-lg font-bold pt-2 pb-2">
              {children}
            </h4>
          ),
          h5: ({ children, id }) => (
            <h5 id={id} className="text-md font-bold pt-2 pb-2">
              {children}
            </h5>
          ),
          h6: ({ children, id }) => (
            <h6 id={id} className="text-md pt-2 pb-2">
              {children}
            </h6>
          ),
          strong: ({ children }) => <strong className="font-bold">{children}</strong>,
          a: ({ children, href }) => {
            const target = href?.startsWith('/') || href?.startsWith('#') ? '_self' : '_blank'
            return (
              <Link href={href ?? '/'} target={target}>
                {children}
              </Link>
            )
          },
          p: ({ children }) => <div className="text-md my-4">{children}</div>,
          pre: ({ children }) => <>{children}</>,
          code({ children }) {
            const inline = typeof children === 'string' && !children.includes('\n')
            return inline ? (
              <span className="bg-gray-100 px-[4px] py-[1px] rounded">{children}</span>
            ) : (
              <pre className="p-4 bg-gray-100 text-xs rounded-md">{String(children).replace(/\n$/, '')}</pre>
            )
          },
        }}>
        {body}
      </Markdown>
    </div>
  )
}
