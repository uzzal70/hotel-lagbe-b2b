// Import all svg files dynamically
const hotelFiles = import.meta.glob('./*.{svg,png,jpg}', { eager: true });

const pdf = Object.fromEntries(
  Object.entries(hotelFiles).map(([path, module]) => {
    const name = path.split('/').pop().replace(/\.(png|jpg|svg)$/, '');
    return [name, module.default];
  })
);

export default pdf;
