import HLSPlayer from '../components/HLSPlayer';

const Home: React.FC = () => {
  return (
    <div>
      <h1>HLS Player</h1>
      <HLSPlayer src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" />
    </div>
  );
};

export default Home;