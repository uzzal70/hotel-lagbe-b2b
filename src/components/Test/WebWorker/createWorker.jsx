// Vite supports workers via new Worker(new URL(..., import.meta.url))
export const createWorker = (workerPath) => {
  return new Worker(new URL(workerPath, import.meta.url), {
    type: 'module',
  });
};
