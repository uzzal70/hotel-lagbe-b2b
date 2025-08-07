// Import all gif files dynamically
const gifFiles = import.meta.glob('./*.gif', { eager: true });

const gif = Object.fromEntries(
  Object.entries(gifFiles).map(([path, module]) => {
    const name = path.split('/').pop().replace(/\.(gif)$/, '');
    return [name, module.default];
  })
);

export default gif;
