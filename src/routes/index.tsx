import { createFileRoute } from '@tanstack/react-router'
import { useState, type KeyboardEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { YoutubePlayer } from '#/components/YoutubePlayer'
import { RefreshCcw, SkipBack, SkipForward } from 'lucide-react'
import type { Transcript, TranscriptsResponse, TranscriptsResponseError } from '#/interfaces/transcripts-interface'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const apiUrl = import.meta.env.VITE_API_URL
  const [text, setText] = useState('')
  const [video, setVideo] = useState<Transcript[]>([])
  const [indexVideo, setIndexVideo] = useState<number>(0)
  const [refreshKey, setRefreshKey] = useState(0)
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
        setVideo(res.data.transcripts)
        setIndexVideo(0)
        return res.data
      }
    })

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && text.length !== 0) {
      mutate(text)
    }
  }

  const handlePrevious = () => {
    if (indexVideo == 0) return
    setIndexVideo(indexVideo - 1)
  }

  const handleForward = () => {
    if (indexVideo == video.length - 1) return
    setIndexVideo(indexVideo + 1)
  }


  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }
  return (
    <main className="page-wrap px-4 pb-10 pt-4 flex flex-col items-center text-center">

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
        <span className='font-degular font-normal text-lg sm:text-3xl text-gray-400'>?</span>
      </h1>
      {
        isError && (
          <div className='p-2 mb-4 border-b border-(--line)'>
            {
              error.response?.status === 404 ? (
                <p className='text-amber-300'>How to pronounce "{error.response.data.detail.query}" in English not found</p>
              )
                : (<p>{error.response?.data.detail.message ?? 'Something went wrong'}</p>)
            }
          </div>
        )
      }
      {
        isPending ? <p>Searching...</p> :
          data ?
            <div className='w-full sm:w-225 island-shell p-5 rounded-lg'>
              <div className='text-start mb-2  text-xl flex justify-between'>
                <p>How to pronouce
                  <span className='text-rose-400'> {data.query} </span>
                  in English ( {indexVideo + 1} out of {video.length} ):
                </p>
                <div className='flex items-center gap-4 shrink-0'>
                  <button onClick={handlePrevious} className='hover:text-blue-600 cursor-pointer'><SkipBack /></button>
                  <button onClick={handleRefresh} className='hover:text-blue-600 cursor-pointer '><RefreshCcw /></button>
                  <button onClick={handleForward} className='hover:text-blue-600 cursor-pointer'><SkipForward /></button>
                </div>
              </div>
              <YoutubePlayer
                key={`${video[indexVideo].videoId}-${video[indexVideo].start}-${refreshKey}`}
                start={data.transcripts[indexVideo].start}
                videoId={data.transcripts[indexVideo].videoId} />
            </div>
            :
            <>      {/* Suggestions */}
              <div className="max-w-md text-xs sm:text-sm md:text-base  font-semibold mb-6 leading-relaxed">
                Try:{' '}
                {suggestions.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setText(item)
                      mutate(item)
                    }}
                    className="underline mr-2 hover:cursor-pointer text-blue-500"
                  >
                    {item},
                  </button>
                ))}
              </div>

              {/* Description */}
              <p className="max-w-md sm:max-w-xl text-sm md:text-lg xl:text-xl sm:text-base  leading-relaxed">
                Improve your English pronunciation by listening to real native speakers on YouTube.
              </p>
            </>
      }
    </main>
  )
}
