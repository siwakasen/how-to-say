import { Link } from '@tanstack/react-router';

export default function Header() {
  return (
    <header className='sticky top-0 z-50 border-b border-(--line) bg-(--header-bg) px-4 backdrop-blur-lg'>
      <nav className='page-wrap flex flex-wrap items-center justify-between jus gap-x-3 gap-y-2 py-3 sm:py-4'>
        <h2 className='m-0 shrink-0 text-base font-semibold tracking-tight'>
          <Link
            to='/'
            className='inline-flex items-center whitespace-nowrap gap-1 rounded-full border border-(--chip-line) bg-(--chip-bg) px-3 py-1.5 text-sm text-(--sea-ink) no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] sm:px-4 sm:py-2'
          >
            <span className='text-base'>
              <img
                src='un.png'
                width={25}
                height={25}
                className='cursor-pointer'
              ></img>
            </span>
            How To Pronounce
          </Link>
        </h2>
        <div>
          <a
            href='https://github.com/stars/siwakasen/lists/how-to-say-in-english'
            target='_blank'
          >
            <img
              src='github.svg'
              width={40}
              height={40}
              className='cursor-pointer'
            ></img>
          </a>
        </div>
      </nav>
    </header>
  );
}
