import { useCallback, useEffect, useRef, useState } from 'react';
import { PromptRecord } from '@/commonTypes/Prompt';

const usePromptBlinkAnimation = (
  prompt: PromptRecord,
  setControlledPromptValue: React.Dispatch<React.SetStateAction<PromptRecord>>,
  preventBlink: React.MutableRefObject<boolean>,
) => {
  const [blink, setBlink] = useState(true);
  const trigAnimation = useCallback(() => {
    if (prompt) setBlink(false);
    setTimeout(() => {
      setBlink(true);
      setControlledPromptValue(prompt);
    }, 300);
  }, [prompt, setControlledPromptValue]);

  const useTrigAnimationOnPromptChange = ({
    prompt,
    trigAnimation,
  }: {
    prompt: PromptRecord;
    trigAnimation: () => void;
  }) => {
    const prevPrompt = usePrevious(prompt);
    useEffect(() => {
      if (prevPrompt === undefined) return;
      const promptIsUpdated =
        JSON.stringify(prevPrompt) !== JSON.stringify(prompt);
      if (promptIsUpdated && !preventBlink.current) {
        trigAnimation();
      }
      if (preventBlink.current) preventBlink.current = false;
    }, [prompt, trigAnimation, prevPrompt]);
  };

  useTrigAnimationOnPromptChange({ prompt, trigAnimation });

  return blink;
};

const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePromptBlinkAnimation;
