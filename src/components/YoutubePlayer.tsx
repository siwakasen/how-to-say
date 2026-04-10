import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

export function YoutubePlayer({
  videoId,
  start,
  key
}: {
  videoId: string;
  start: number;
  key: string
}) {
  return (
    <div className="w-full h-full">
      {/* <LiteYouTubeEmbed */}
      {/*   id={videoId} */}
      {/*   params={`start=${start}playsinline=1&iv_load_policy=3&rel=0&controls=1&fs=0&autoplay=1&enablejsapi=1`} */}
      {/*   title='' */}
      {/* /> */}
      <iframe
        className="w-full max-w-212.5 mx-auto aspect-video"
        src={`https://www.youtube.com/embed/${videoId}?playsinline=1&amp;iv_load_policy=3&amp;rel=0&amp;showinfo=0&amp;controls=1&amp;fs=0&amp;&start=${start}&amp;autoplay=1&amp;enablejsapi=1&amp;widgetid=1&amp;cc_load_policy=1&amp;cc_lang_pref=en`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

    </div>
  );
}
