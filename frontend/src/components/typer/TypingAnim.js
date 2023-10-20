import { TypeAnimation } from 'react-type-animation';

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Hi! Welcome to MERN-gpt',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Hey! How may I assist you?',
        1000,
        'Ask anything you want',
        1000,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block', color: "white", textShadow: "1px 1px 20px #000" }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim