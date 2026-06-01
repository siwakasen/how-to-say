import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import Footer from '../components/Footer';
import Header from '../components/Header';

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';
import '../styles.css';

import type { QueryClient } from '@tanstack/react-query';

interface MyRouterContext {
  queryClient: QueryClient;
}

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

const SITE_URL = 'https://say.siwakasen.dev/';
const SITE_TITLE = 'How to Pronounce English Words with Real YouTube Examples';
const SITE_DESCRIPTION =
  'Search any English word and hear real native speakers pronounce it in YouTube clips.';
const SITE_IMAGE = 'https://say.siwakasen.dev/logo512.png';
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does this pronunciation tool work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Enter an English word and the app finds matching transcript moments from YouTube videos, then starts playback near the pronunciation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I hear native speakers pronounce English words?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The tool uses real YouTube clips so you can hear natural pronunciation from actual speakers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why use YouTube examples for pronunciation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'YouTube examples show words in natural sentences, accents, and speaking speeds instead of isolated dictionary audio.',
      },
    },
  ],
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: SITE_TITLE,
      },
      {
        name: 'description',
        content: SITE_DESCRIPTION,
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: SITE_URL,
      },
      {
        property: 'og:title',
        content: SITE_TITLE,
      },
      {
        property: 'og:description',
        content: SITE_DESCRIPTION,
      },
      {
        property: 'og:image',
        content: SITE_IMAGE,
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: SITE_TITLE,
      },
      {
        name: 'twitter:description',
        content: SITE_DESCRIPTION,
      },
      {
        name: 'twitter:image',
        content: SITE_IMAGE,
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: SITE_URL,
      },
      {
        rel: 'sitemap',
        type: 'application/xml',
        href: '/sitemap.xml',
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
        />
        <HeadContent />
      </head>
      <body className='font-sans antialiased wrap-anywhere selection:bg-[rgba(79,184,178,0.24)]'>
        <Header />
        {children}
        <Footer />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
