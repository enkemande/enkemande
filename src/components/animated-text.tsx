'use client';

import { useState, useEffect } from 'react';

interface AnimatedTextProps {
  texts: string[];
  interval?: number;
  className?: string;
}

export function AnimatedText({ texts, interval = 3000, className = '' }: AnimatedTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const currentText = texts[currentIndex];
  const typingSpeed = 50;
  const deletingSpeed = 30;
  const pauseTime = interval - (currentText.length * typingSpeed) - 500;

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let timer: NodeJS.Timeout;

    if (!isDeleting && displayText !== currentText) {
      // Typing phase
      timer = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayText === currentText) {
      // Pause after typing complete
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && displayText !== '') {
      // Deleting phase
      timer = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, deletingSpeed);
    } else if (isDeleting && displayText === '') {
      // Move to next text
      setIsDeleting(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentText, texts.length, typingSpeed, deletingSpeed, pauseTime, mounted]);

  if (!mounted) {
    return <span className={className}>{texts[0]}</span>;
  }

  return (
    <span className={`inline-block whitespace-nowrap ${className}`}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
