// Import all svg, jpg, and png files dynamically
const hotelFiles = import.meta.glob('./*.{svg,jpg,png}', { eager: true });

const hotel = Object.fromEntries(
  Object.entries(hotelFiles).map(([path, module]) => {
    const name = path.split('/').pop().replace(/\.(svg|jpg|png)$/, '');
    return [name, module.default];
  })
);

export default hotel;
