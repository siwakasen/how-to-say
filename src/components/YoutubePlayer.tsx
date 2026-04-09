import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

export function YoutubePlayer({
  videoId,
  start,
}: {

  videoId: string;
  start: number;
}) {
  return (
    <div className="w-full max-w-160 mx-auto">
      {/* <LiteYouTubeEmbed */}
      {/*   id={videoId} */}
      {/*   params={`start=${start}playsinline=1&iv_load_policy=3&rel=0&controls=1&fs=0&autoplay=1&enablejsapi=1`} */}
      {/*   title='' */}
      {/* /> */}
      <iframe
        className="w-full max-w-160 mx-auto aspect-video"
        src={`https://www.youtube.com/embed/${videoId}?playsinline=1&iv_load_policy=3&rel=0&controls=1&fs=0&start=${start}&autoplay=1&enablejsapi=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
