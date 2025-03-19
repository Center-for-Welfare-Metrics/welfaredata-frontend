export const OptimizedCacheInstances = new Map<
  string,
  Map<string, SVGGraphicsElement>
>();

export const getCacheOptimizedInstance = (key: string) => {
  if (OptimizedCacheInstances.has(key)) {
    return OptimizedCacheInstances.get(key);
  }

  const cache = new Map<string, SVGGraphicsElement>();
  OptimizedCacheInstances.set(key, cache);
  return cache;
};

export const setCacheOptimizedInstance = (
  key: string,
  id: string,
  optimizedG: SVGGraphicsElement
) => {
  const cache = OptimizedCacheInstances.get(key);
  if (cache) {
    cache.set(id, optimizedG);
  }
};
export const setCacheOriginalInstance = (
  key: string,
  id: string,
  originalG: SVGGraphicsElement
) => {
  const cache = OriginalCacheInstances.get(key);
  if (cache) {
    cache.set(id, originalG);
  }
};

export const OriginalCacheInstances = new Map<
  string,
  Map<string, SVGGraphicsElement>
>();

export const getCacheOriginalInstance = (key: string) => {
  if (OriginalCacheInstances.has(key)) {
    return OriginalCacheInstances.get(key);
  }

  const cache = new Map<string, SVGGraphicsElement>();
  OriginalCacheInstances.set(key, cache);
  return cache;
};

export const RootOriginalCache = new Map<string, SVGGraphicsElement>();

export const getCacheRootOriginalInstance = (key: string) => {
  if (RootOriginalCache.has(key)) {
    return RootOriginalCache.get(key);
  }

  return null;
};

export const setCacheRootOriginalInstance = (
  key: string,
  originalG: SVGGraphicsElement
) => {
  if (RootOriginalCache.has(key)) {
    RootOriginalCache.delete(key);
  }
  RootOriginalCache.set(key, originalG);
};

export const RootOptimizedCache = new Map<string, SVGGraphicsElement>();

export const setCacheRootOptimizedInstance = (
  key: string,
  optimizedG: SVGGraphicsElement
) => {
  if (RootOptimizedCache.has(key)) {
    RootOptimizedCache.delete(key);
  }
  RootOptimizedCache.set(key, optimizedG);
};

export const getCacheRootOptimizedInstance = (key: string) => {
  if (RootOptimizedCache.has(key)) {
    return RootOptimizedCache.get(key);
  }

  return null;
};
