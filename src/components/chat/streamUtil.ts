/**
 * Helper utility to simulate typing/streaming text character-by-character
 */
export function streamResponse(
  fullText: string,
  onChunk: (currentText: string) => void,
  onComplete: () => void,
  speedMs: number = 25
) {
  let index = 0;
  const interval = setInterval(() => {
    index++;
    onChunk(fullText.substring(0, index));
    if (index >= fullText.length) {
      clearInterval(interval);
      onComplete();
    }
  }, speedMs);

  return () => clearInterval(interval);
}
