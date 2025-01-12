import { MutableRefObject, useEffect, useState } from "react";

interface UseAutosizeTextAreaProps {
  textAreaRef: MutableRefObject<HTMLTextAreaElement | null>;
  minHeight?: number | string;
  maxHeight?: number | string;
  triggerAutoSize: string;
}

export const useAutosizeTextArea = ({ textAreaRef, triggerAutoSize, maxHeight = Number.MAX_SAFE_INTEGER, minHeight = 0 }: UseAutosizeTextAreaProps) => {
  const [init, setInit] = useState(true);
  useEffect(() => {
    // We need to reset the height momentarily to get the correct scrollHeight for the textarea
    const offsetBorder = 0;
    const textAreaElement = textAreaRef.current;
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

    const currentMinHeight = typeof minHeight === "string" ? +minHeight * rootFontSize : minHeight;
    const currentMaxHeight = typeof maxHeight === "string" ? +maxHeight * rootFontSize : maxHeight;

    if (textAreaElement) {
      if (init) {
        textAreaElement.style.minHeight = `${currentMinHeight + offsetBorder}px`;
        if (currentMaxHeight > currentMinHeight) {
          textAreaElement.style.maxHeight = `${maxHeight}px`;
        }
        setInit(false);
      }
      textAreaElement.style.height = `${currentMinHeight + offsetBorder}px`;
      const scrollHeight = textAreaElement.scrollHeight;
      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      if (scrollHeight > currentMaxHeight) {
        textAreaElement.style.height = `${maxHeight}px`;
      } else {
        textAreaElement.style.height = `${scrollHeight + offsetBorder}px`;
      }
    }
  }, [textAreaRef.current, triggerAutoSize]);
};
