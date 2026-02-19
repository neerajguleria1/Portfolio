import { lazy, Suspense, ComponentType, ReactElement } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

export function lazyLoad(
  importFunc: () => Promise<{ default: ComponentType<any> }>,
  fallback: ReactElement = <LoadingSpinner />
) {
  const LazyComponent = lazy(importFunc);

  return function LazyLoadedComponent(props: any) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

export function preloadComponent(importFunc: () => Promise<any>) {
  importFunc();
}
