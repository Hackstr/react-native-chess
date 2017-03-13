import Sound from 'react-native-sound';

Sound.setCategory('Playback');

const createSound = (soundName) => {
  const sound = new Sound(soundName, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound:', soundName, error, Sound.MAIN_BUNDLE);
      return;
    }
  });

  return sound;
}

const capture = createSound('advertising.mp3');
const move = createSound('move.wav');

const sounds = {
  capture,
  move,
};

export default sounds;
