import { useEffect } from 'react';

export function usePerformanceMonitor(componentName: string) {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      if (renderTime > 16) {
        console.warn(`${componentName} render took ${renderTime.toFixed(2)}ms`);
      }

      if (window.gtag) {
        window.gtag('event', 'timing_complete', {
          name: componentName,
          value: Math.round(renderTime),
          event_category: 'Performance',
        });
      }
    };
  }, [componentName]);
}
