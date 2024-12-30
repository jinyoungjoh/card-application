import { motion, HTMLMotionProps, Transition } from 'framer-motion'
import React from 'react'

type AnimationType =
  | 'fadeInDown'
  | 'fadeInUp'
  | 'fadeInLeft'
  | 'fadeInRight'
  | 'zoomIn'
  | 'zoomOut'

type AnimationProps = {
  animation: AnimationType
  children: React.ReactNode
  transition?: Transition
} & Omit<HTMLMotionProps<'div'>, 'ref'>

const animationVariants: Record<
  AnimationType,
  HTMLMotionProps<'div'>['variants']
> = {
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  zoomIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  zoomOut: {
    initial: { opacity: 1, scale: 1 },
    animate: { opacity: 0, scale: 0.8 },
    exit: { opacity: 0, scale: 0.5 },
  },
}

const Animated: React.FC<AnimationProps> = ({
  animation,
  children,
  transition = { duration: 0.3 },
  ...rest
}) => {
  const variants = animationVariants[animation]

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export default Animated
