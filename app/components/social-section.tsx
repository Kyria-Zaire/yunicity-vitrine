
'use client'

import { FacebookPagePlugin, InstagramEmbed } from './social-widgets'
import { motion } from 'framer-motion'

export function SocialSection() {
  return (
    <section id="social-section" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-outfit">
            Rejoignez Notre Communauté
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Suivez-nous sur nos réseaux sociaux pour ne rien manquer de l&apos;actualité Yunicity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <FacebookPagePlugin 
              pageUrl="https://www.facebook.com/share/179Z5aLQsw/?mibextid=wwXIfr"
              width={400}
              height={600}
              showFeed={true}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <InstagramEmbed 
              width={400}
              height={600}
            />
          </motion.div>
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 text-lg mb-6">
            Restez connectés pour découvrir toutes les pépites de Reims avec nous !
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              #Yunicity
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              #CommunautéReims
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              #DécouverteLocale
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
