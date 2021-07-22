import React, { useState, useEffect } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import styled from 'styled-components';

import Button from './components/Button';
import Settings from './components/Settings';

import './App.css';

const Gif = styled.img`
  margin-top: 0.5rem;
`;

const ffmpeg = createFFmpeg({ log: true });

function App() {
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();
  const [settings, setSettings] = useState({});

  const loadFfmpeg = async () => {
    await ffmpeg.load();
    setLoading(false);
  };

  useEffect(() => {
    loadFfmpeg();
  }, []);

  const handleChange = (e) => setVideo(e.target.files?.item(0));

  const convertToGif = async () => {
    ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(video));
    await ffmpeg.run(
      '-i',
      'input.mp4',
      '-t',
      settings.duration || '2.5',
      '-ss',
      settings.start || '0',
      '-f',
      'gif',
      'output.gif',
    );
    const data = ffmpeg.FS('readFile', 'output.gif');
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: 'image/gif' }),
    );
    setGif(url);
  };

  return loading ? (
    <div className="App">
      <h1>Loading</h1>
    </div>
  ) : (
    <div className="App">
      <h1>Gif Maker</h1>
      <input type="file" onChange={handleChange} />
      {video && (
        <>
          <video controls width="250" src={URL.createObjectURL(video)}></video>
          <Settings settings={settings} setSettings={setSettings} />
          <Button onClick={convertToGif}>Convert</Button>
        </>
      )}
      {gif && <Gif src={gif} width="250" />}
    </div>
  );
}

export default App;
