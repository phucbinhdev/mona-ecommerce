export function debounce<F extends (...args: any[]) => void>(
  func: F,
  wait: number
): (...args: Parameters<F>) => void {
  let timeout: NodeJS.Timeout;

  return function (...args: Parameters<F>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
