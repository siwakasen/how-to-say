import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { YoutubePlayer } from '#/components/YoutubePlayer';
import { RefreshCcw, SkipBack, SkipForward } from 'lucide-react';
import type {
  Transcript,
  TranscriptsResponse,
  TranscriptsResponseError,
} from '#/interfaces/transcripts-interface';

export const Route = createFileRoute('/')({
  ssr: true,
  component: App,
});

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [text, setText] = useState('');
  const [video, setVideo] = useState<Transcript[]>([]);
  const [indexVideo, setIndexVideo] = useState<number>(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const suggestions = [
    'language',
    'privilege',
    'listen',
    'scope',
    'around',
    'failure',
  ];
  const faqs = [
    {
      question: 'How does this pronunciation tool work?',
      answer:
        'Type an English word and the app finds transcript matches from YouTube, then plays the clip near the spoken word.',
    },
    {
      question: 'Can I hear native speakers pronounce words?',
      answer:
        'Yes. The results use real YouTube examples, so you hear words in natural speech instead of isolated audio.',
    },
    {
      question: 'Why use YouTube examples for pronunciation?',
      answer:
        'Real clips show pronunciation in context, with natural rhythm, accents, and sentence stress.',
    },
  ];

  const { isPending, mutate, data, isError, error, reset } = useMutation<
    TranscriptsResponse,
    AxiosError<TranscriptsResponseError>,
    string
  >({
    mutationFn: async (query: string) => {
      if (!apiUrl) {
        throw new Error('VITE_API_URL is not configured');
      }
      const res = await axios.get<TranscriptsResponse>(
        `${apiUrl}/api?q=${encodeURIComponent(query)}`,
      );
      setVideo(res.data.transcripts);
      setIndexVideo(0);
      return res.data;
    },
  });

  useEffect(() => {
    const query = text.trim();

    if (!query) {
      setVideo([]);
      setIndexVideo(0);
      reset();
      return;
    }

    const timeout = window.setTimeout(() => {
      mutate(query);
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [text, mutate, reset]);

  const handlePrevious = () => {
    if (indexVideo == 0) return;
    setIndexVideo(indexVideo - 1);
  };

  const handleForward = () => {
    if (indexVideo == video.length - 1) return;
    setIndexVideo(indexVideo + 1);
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };
  return (
    <main className='page-wrap px-4 pb-4 pt-4 flex flex-col items-center text-center'>
      <h1 className='flex flex-wrap justify-center items-center gap-2 text-xl sm:text-3xl md:text-4xl font-bold mb-6 leading-snug'>
        <span>How to pronounce English words like</span>
        <span className='inline-flex items-center gap-1 whitespace-nowrap'>
          <input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder='any word...'
            className='min-w-35 max-w-55 sm:max-w-xs md:max-w-sm 
                       text-xl sm:text-3xl md:text-3xl 
                       outline-none border-b-2 border-(--line) 
                       px-2 py-0.5 bg-transparent text-center sm:text-start'
          />
          <span className='font-degular font-normal text-lg sm:text-3xl text-gray-400'>
            ?
          </span>
        </span>
      </h1>
      {isError && (
        <div className='p-2 mb-4 border-b border-(--line)'>
          {error.response?.status === 404 ? (
            <p className='text-amber-300'>
              How to pronounce "{error.response.data.detail.query}" in English
              not found
            </p>
          ) : (
            <p>
              {error.response?.data.detail.message ?? 'Something went wrong'}
            </p>
          )}
        </div>
      )}
      {isPending ? (
        <p>Searching...</p>
      ) : data ? (
        <div className='w-full sm:w-225 md:w-full island-shell p-2 md:p-5 rounded-lg'>
          <div className='mb-3 text-center text-xl sm:text-left'>
            <p className='text-sm sm:text-lg leading-relaxed'>
              How to pronounce
              <span className='text-rose-400'> {data.query} </span>
              in English ( {indexVideo + 1} out of {video.length} ):
            </p>
          </div>
          <YoutubePlayer
            key={`${video[indexVideo].videoId}-${video[indexVideo].start}-${refreshKey}`}
            start={data.transcripts[indexVideo].start}
            videoId={data.transcripts[indexVideo].videoId}
          />
          <div className='mt-2 flex items-center justify-center gap-2 sm:gap-3'>
            <button
              onClick={handlePrevious}
              disabled={indexVideo === 0}
              aria-label='Previous pronunciation example'
              className='inline-flex size-7 items-center justify-center rounded-full border border-(--line) bg-(--surface-strong) text-(--sea-ink) shadow-sm hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 sm:size-9'
            >
              <SkipBack size={18} />
            </button>
            <button
              onClick={handleRefresh}
              aria-label='Replay pronunciation example'
              className='inline-flex size-8 items-center justify-center rounded-full border border-(--line) bg-(--sea-ink) text-(--foam) shadow-sm hover:bg-(--lagoon-deep) sm:size-10'
            >
              <RefreshCcw size={20} />
            </button>
            <button
              onClick={handleForward}
              disabled={indexVideo === video.length - 1}
              aria-label='Next pronunciation example'
              className='inline-flex size-7 items-center justify-center rounded-full border border-(--line) bg-(--surface-strong) text-(--sea-ink) shadow-sm hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 sm:size-9'
            >
              <SkipForward size={18} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className='max-w-md text-xs sm:text-sm md:text-base  font-semibold mb-6 leading-relaxed'>
            Try:{' '}
            {suggestions.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  setText(item);
                }}
                className='underline mr-2 hover:cursor-pointer text-blue-500'
              >
                {item},
              </button>
            ))}
          </div>
          <p className='max-w-md sm:max-w-xl text-sm md:text-lg xl:text-xl sm:text-base  leading-relaxed'>
            Search any English word and hear real native speakers pronounce it
            in YouTube clips with natural rhythm, sentence stress, and context.
          </p>
          <section
            className='mt-10 grid w-full gap-4 text-left sm:grid-cols-3'
            aria-labelledby='pronunciation-faq'
          >
            <h2 id='pronunciation-faq' className='sr-only'>
              English pronunciation FAQ
            </h2>
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className='feature-card rounded-lg border border-(--line) p-4'
              >
                <h3 className='mb-2 text-sm font-bold'>{faq.question}</h3>
                <p className='text-sm leading-relaxed text-(--sea-ink-soft)'>
                  {faq.answer}
                </p>
              </article>
            ))}
          </section>
        </>
      )}
    </main>
  );
}
