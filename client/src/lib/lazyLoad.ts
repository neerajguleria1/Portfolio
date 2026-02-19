import { lazy, Suspense, ComponentType } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback = <LoadingSpinner />
) {
  const LazyComponent = lazy(importFunc);

  return (props: any) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

// Preload function for critical routes
export function preloadComponent(importFunc: () => Promise<any>) {
  importFunc();
}
