import { createFileRoute } from '@tanstack/react-router'
import { useState, type KeyboardEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { YoutubePlayer } from '#/components/YoutubePlayer'
import type { TranscriptsResponse, TranscriptsResponseError } from '#/interfaces/transcripts-interface'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const apiUrl = import.meta.env.VITE_API_URL
  const [text, setText] = useState('')
  const suggestions = [
    'fascinating',
    'scissors',
    'language',
    'mischievous',
    'hierarchy',
    'listen',
  ]

  const { isPending, mutate, data, isError, error } = useMutation<TranscriptsResponse,
    AxiosError<TranscriptsResponseError>,
    string>({
      mutationFn: async (query: string) => {
        const res = await axios.get<TranscriptsResponse>(`${apiUrl}/api?q=${query}`)
        console.log(res.data)
        return res.data
      }
    })

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && text.length !== 0) {
      mutate(text)
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
        isPending ? <p>Searching...</p> : isError ? <>
          <p>How to pronounce "{error.response?.data.detail.query}" in English not found</p>
        </> : data ? <>
          <YoutubePlayer start={data.transcripts[0].start} videoId={data.transcripts[0].videoId} />
        </> :
          <>      {/* Suggestions */}
            <div className="max-w-md text-xs sm:text-sm md:text-base text-amber-300 font-semibold mb-6 leading-relaxed">
              Try:{' '}
              {suggestions.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setText(item)
                    mutate(item)
                  }}
                  className="underline mr-2 hover:cursor-pointer"
                >
                  {item},
                </button>
              ))}
            </div>

            {/* Description */}
            <p className="max-w-md sm:max-w-lg text-sm md:text-lg xl:text-xl sm:text-base  leading-relaxed">
              Improve your English pronunciation by listening to examples of real
              people speaking English on YouTube.
            </p>
          </>
      }

      {
      }
    </main>
  )
}
