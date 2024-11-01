// components/HLSPlayer.tsx
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface HLSPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

const HLSPlayer: React.FC<HLSPlayerProps> = ({ src, ...props }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      if (Hls.isSupported()) {
        const hls = new Hls({
            maxBufferSize: 10,
            maxMaxBufferSize: 20
        });

        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });

        return () => {
          hls.destroy();
        };
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
        video.addEventListener('loadedmetadata', () => {
          video.play();
        });
      }
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls
      style={{ width: '100%', height: 'auto' }}
      {...props}
    />
  );
};

export default HLSPlayer;
