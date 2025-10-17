/**
 * Configuration optimisée pour Framer Motion
 * Améliore les performances des animations
 */

import { Transition } from 'framer-motion'

// Transition par défaut optimisée
export const defaultTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
  mass: 0.5,
}

// Transition rapide pour les interactions
export const fastTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
  mass: 0.3,
}

// Transition lente pour les effets dramatiques
export const slowTransition: Transition = {
  type: 'spring',
  stiffness: 50,
  damping: 20,
  mass: 1,
}

// Variants d'animation réutilisables
export const fadeInUp = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: fastTransition,
  },
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    transition: fastTransition,
  },
}

export const scaleIn = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: fastTransition,
  },
}

export const slideInLeft = {
  initial: {
    opacity: 0,
    x: -50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    x: 50,
    transition: fastTransition,
  },
}

export const slideInRight = {
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: fastTransition,
  },
}

// Container avec stagger pour les enfants
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

// Variants pour les éléments dans un container stagger
export const staggerItem = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
}

// Configuration pour réduire les animations sur les appareils low-end
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Viewport settings optimisés pour intersection observer
export const defaultViewport = {
  once: true,
  margin: '0px 0px -100px 0px',
  amount: 0.3,
}
