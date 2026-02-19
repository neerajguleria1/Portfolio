import { useEffect, useRef } from 'react';

export function usePerformanceMonitor(componentName: string) {
  const renderStart = useRef(performance.now());

  useEffect(() => {
    const renderTime = performance.now() - renderStart.current;

    if (renderTime > 100) {
      console.warn(`${componentName} initial render took ${renderTime.toFixed(2)}ms`);
    }
  }, [componentName]);
}
