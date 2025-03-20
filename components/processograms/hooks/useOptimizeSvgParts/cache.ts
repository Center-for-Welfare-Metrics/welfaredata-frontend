export const OptimizedCacheInstances = new Map<
  string,
  Map<string, SVGGraphicsElement>
>();

export const getCacheOptimizedItem = (key: string, id: string) => {
  const cache = OptimizedCacheInstances.get(key);
  if (cache) {
    return cache.get(id);
  }

  return null;
};

export const setCacheOptimizedItem = (
  key: string,
  id: string,
  optimizedG: SVGGraphicsElement
) => {
  const cache = OptimizedCacheInstances.get(key);
  if (cache) {
    cache.set(id, optimizedG);
  } else {
    const newCache = new Map<string, SVGGraphicsElement>();
    newCache.set(id, optimizedG);
    OptimizedCacheInstances.set(key, newCache);
  }
};

// export const RootOptimizedCache = new Map<string, SVGGraphicsElement>();

// export const setCacheRootOptimizedInstance = (
//   key: string,
//   optimizedG: SVGGraphicsElement
// ) => {
//   if (RootOptimizedCache.has(key)) {
//     RootOptimizedCache.delete(key);
//   }
//   RootOptimizedCache.set(key, optimizedG);
// };

// export const getCacheRootOptimizedInstance = (key: string) => {
//   if (RootOptimizedCache.has(key)) {
//     return RootOptimizedCache.get(key);
//   }

//   return null;
// };
