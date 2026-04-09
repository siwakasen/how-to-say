import { createFileRoute } from '@tanstack/react-router'
import { useState, type KeyboardEvent } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const suggestions = [
    'please',
    'less stressful',
    'the exact day',
    'no idea',
    'ambidextrous',
    'I believe',
  ]

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && text.length !== 0) {
      console.log('Enter key pressed!')
      setLoading(true)
    }
  }

  return (
    <main className="page-wrap px-4 pb-10 pt-16 flex flex-col items-center text-center">

      {/* Title + Input */}
      <h1 className="flex flex-wrap justify-center items-center gap-2 text-xl sm:text-3xl md:text-4xl font-bold mb-6 leading-snug">
        <span>How to say</span>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Any words..."
          className="min-w-35 max-w-55 sm:max-w-xs md:max-w-sm 
                     text-xl sm:text-3xl md:text-3xl 
                     outline-none border-b-2 border-(--line) 
                     px-2 py-0.5 bg-transparent text-center sm:text-start"
        />
      </h1>

      {
        !loading ? <>      {/* Suggestions */}
          <div className="max-w-md text-xs sm:text-sm md:text-base text-amber-300 font-semibold mb-6 leading-relaxed">
            Try:{' '}
            {suggestions.map((item, i) => (
              <button
                key={i}
                onClick={() => setText(item)}
                className="underline mr-2 hover:cursor-pointer"
              >
                {item},
              </button>
            ))}
          </div>

          {/* Description */}
          <p className="max-w-md sm:max-w-lg text-sm sm:text-base text-[var(--sea-ink-soft)] leading-relaxed">
            Improve your English pronunciation by listening to examples of real
            people speaking English on YouTube.
          </p>
        </> : <><p>Searching...</p></>
      }
    </main>
  )
}
