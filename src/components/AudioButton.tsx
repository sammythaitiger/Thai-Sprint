import { Volume2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { speakThai, getSpeakingId, subscribeToSpeaking } from '../utils/tts';

interface AudioButtonProps {
  text: string;
  phraseId?: string;
  size?: 'sm' | 'md';
}

export function AudioButton({ text, phraseId = text, size = 'md' }: AudioButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToSpeaking(() => {
      setIsSpeaking(getSpeakingId() === phraseId);
    });
    return unsubscribe;
  }, [phraseId]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      speakThai(text, phraseId);
    },
    [text, phraseId]
  );

  const sizeClasses = size === 'sm' ? 'w-9 h-9' : 'w-11 h-11';
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <button
      onClick={handleClick}
      className={`${sizeClasses} rounded-full flex items-center justify-center transition-all duration-200 select-none touch-manipulation ${
        isSpeaking
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 animate-pulse'
          : 'bg-blue-50 text-blue-600 hover:bg-blue-100 active:scale-90'
      }`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
      aria-label="Прослушать произношение"
    >
      <Volume2 className={iconSize} />
    </button>
  );
}
