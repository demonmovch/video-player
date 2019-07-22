import React, { useState, useRef, useEffect } from 'react';
import './styles.css';
import video from './avengers.mp4';

export const Player = () => {
  const [isPlaying, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isProgressCapturing, setProgressCapturing] = useState(false);
  const [isVolumeCapturing, setVolumeCapturing] = useState(false);
  const [isPlaybackRateCapturing, setPlaybackRateCapturing] = useState(false);
  const videoRef = useRef(null);

  /* Включаем или выключаем проигрывание видео */
  const togglePlay = () => {
    const method = videoRef.current.paused ? 'play' : 'pause';

    videoRef.current[method]();
    setPlaying(method === 'play');
  };

  const setVolume = event => {
    videoRef.current.volume = event.currentTarget.value;
  };

  const setPlaybackRate = event => {
    videoRef.current.playbackRate = event.currentTarget.value;
  };

  /* Делаем размер видео на весь экран или обратно */
  const toggleFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.mozRequestFullScreen) {
      videoRef.current.mozRequestFullScreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen();
    }
  };

  /* Прокручиваем прогресс проигрывания */
  const skip = event => {
    const seconds = event.target.dataset.skip;

    videoRef.current.currentTime += Number.parseFloat(seconds);
  };

  /* Устанавливаем прогресс проигранного видео в процентах */
  const handleProgress = () => {
    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;

    setProgress(progress);
  };

  /* Устанавливаем прогресс видео указателем мыши */
  const scrub = event => {
    /**
     * offsetX — расстояние от «начала» элемента до позиции указателя мыши по координате X.
     * nativeEvent — нативное событие.
     * offsetWidth — ширина элемента.
     * разница между event.target и event.currentTarget:
     *      From currentTarget documentation:
     *      "It always refers to the element the event handler has been attached to
     *      as opposed to event.target which identifies the element on which the event occurred."
     */
    const scrubTime =
      (event.nativeEvent.offsetX / event.currentTarget.offsetWidth) * videoRef.current.duration;

    videoRef.current.currentTime = scrubTime;
  };

  const playControl = isPlaying ? <>&#10074;&#10074;</> : <>&#9654;</>;

  /* Добавляем слушатель вкл/выкл видео по нажатию на пробел */
  useEffect(() => {
    const handleKeydown = event => {
      if (event.code === 'Space') {
        togglePlay();
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => document.removeEventListener('keydown', handleKeydown);
  }, []);

  return (
    <div className='player'>
      <video ref={videoRef} src={video} onClick={togglePlay} onTimeUpdate={handleProgress} />
      <div className='controls'>
        <div
          className='progress'
          onClick={scrub}
          onMouseDown={() => setProgressCapturing(true)}
          onMouseMove={event => isProgressCapturing && scrub(event)}
          onMouseUp={() => setProgressCapturing(false)}>
          <div
            className='filled'
            style={{
              '--filledProgressBar': `${progress}%`,
            }}
          />
        </div>
        <button title='Toggle Play' onClick={togglePlay}>
          {playControl}
        </button>
        <input
          type='range'
          max='1'
          min='0'
          name='volume'
          step='0.05'
          defaultValue='0.5'
          onClick={setVolume}
          onMouseDown={() => setVolumeCapturing(true)}
          onMouseMove={event => isVolumeCapturing && setVolume(event)}
          onMouseUp={() => setVolumeCapturing(false)}
        />
        <input
          type='range'
          max='3'
          min='0.5'
          name='playbackRate'
          step='0.1'
          defaultValue='1'
          onClick={setPlaybackRate}
          onMouseDown={() => setPlaybackRateCapturing(true)}
          onMouseMove={event => isPlaybackRateCapturing && setPlaybackRate(event)}
          onMouseUp={() => setPlaybackRateCapturing(false)}
        />
        <button data-skip='-7' onClick={skip}>
          « 7s
        </button>
        <button data-skip='7' onClick={skip}>
          7s »
        </button>
        <button onClick={toggleFullScreen}>&#10021;</button>
      </div>
    </div>
  );
};
