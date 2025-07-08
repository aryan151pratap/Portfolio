import React, { useState, useEffect } from 'react';

const Animation = ({ text }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = Array.isArray(text) && text.length > 0 ? text : [''];
  const currentText = texts[textIndex] || '';

  useEffect(() => {
    const timeout = isDeleting ? 100 : 150;

    const timer = setTimeout(() => {
      if (isDeleting) {
        if (charIndex > 0) {
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      } else {
        if (charIndex < currentText.length) {
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      }
    }, timeout);

    return () => clearTimeout(timer);
  }, [textIndex, charIndex, isDeleting, currentText.length, texts.length]);

  return (
    <div className="w-full text-center">
      <div className="font-mono text-2xl md:text-4xl min-h-[80px] flex items-center justify-center">
        <span className="text-cyan-700 font-bold">
          {currentText.substring(0, charIndex)}
        </span>
        <span
          className={`inline-block w-2 h-8 bg-cyan-700 ml-1 animate-pulse ${
            isDeleting ? 'opacity-0' : 'opacity-100'
          }`}
        ></span>
      </div>
    </div>
  );
};

export default Animation;
