import { createFileRoute } from '@tanstack/react-router'
import { useState, type KeyboardEvent } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [text, setText] = useState('')

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
    }
  }

  return (
    <main className="page-wrap px-4 pb-8 pt-14 flex flex-col items-center text-center">
      {/* Title + Input */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">
        How to say{' '}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Any words..."
          className="text-[30px] outline-none border-b-2 border-(--line) py-4 px-2 bg-transparent"
        />
      </h1>

      {/* Suggestions */}
      <div className="text-amber-300 text-sm mb-6 font-bold">
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
      <p className="max-w-xl text-(--sea-ink-soft)">
        Improve your English pronunciation by listening to examples of real
        people speaking English on YouTube.
      </p>
    </main>
  )
}
