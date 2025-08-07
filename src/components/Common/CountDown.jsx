import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
const CountDown = () => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, 100, { duration: 5 });
    return animation.stop;
  }, []);
  return <motion.p>{rounded}</motion.p>;
};

export default CountDown;
