
// Configuration centralisée du site Yunicity
export const SITE_CONFIG = {
  // Date de lancement - MODIFIEZ ICI POUR CHANGER LA DATE PARTOUT
  launchDate: '2025-12-15T10:00:00Z', // 15 décembre 2025, 10h UTC
  launchDateDisplay: '15 décembre 2025',
  
  // Informations de contact
  contact: {
    email: 'yu.entreprise@gmail.com',
    city: 'Reims, France'
  },
  
  // Réseaux sociaux - Comptes officiels Yunicity
  social: {
    linkedin: {
      url: 'https://linkedin.com/in/yunicity-app-381bb7230',
      handle: '@yunicity-app'
    },
    facebook: {
      url: 'https://www.facebook.com/share/179Z5aLQsw/?mibextid=wwXIfr',
      handle: '@yunicity'
    },
    instagram: {
      url: 'mailto:yu.entreprise@gmail.com?subject=Suivre Yunicity sur Instagram&body=Bonjour, je souhaite suivre Yunicity sur Instagram.',
      handle: 'Instagram (bientôt actif)'
    }
  },
  
  // Métadonnées
  meta: {
    title: 'Yunicity - Faire battre le cœur de la ville',
    description: 'Plateforme qui connecte les communautés locales et révèle les trésors cachés de votre région. Découvrez votre ville autrement.',
    keywords: 'communauté locale, Reims, événements, connecter, ville, local, découverte'
  }
} as const
