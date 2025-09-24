
import sgMail from '@sendgrid/mail'

// Configuration SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export interface EmailData {
  to: string
  subject: string
  html: string
  text?: string
}

export interface NewsletterData {
  name?: string
  company?: string
  email: string
}

/**
 * Envoie un email via SendGrid
 */
export async function sendEmail(emailData: EmailData) {
  try {
    const msg = {
      to: emailData.to,
      from: process.env.FROM_EMAIL || 'contact@yunicity.com',
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
    }

    await sgMail.send(msg)
    return { success: true }
  } catch (error) {
    console.error('SendGrid Error:', error)
    return { success: false, error }
  }
}

/**
 * Envoie un email de bienvenue pour la newsletter
 */
export async function sendWelcomeNewsletter(subscriberData: NewsletterData) {
  const welcomeHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Bienvenue chez Yunicity !</title>
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
      <div style="background: linear-gradient(135deg, #7c3aed, #a855f7); padding: 40px; border-radius: 12px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
          🎉 Bienvenue dans l'aventure Yunicity !
        </h1>
      </div>
      
      <div style="background: white; padding: 40px; border-radius: 12px; margin-top: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h2 style="color: #7c3aed; margin-bottom: 20px;">
          Bonjour ${subscriberData.name || 'cher(e) abonné(e)'} ! 👋
        </h2>
        
        <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
          Merci de rejoindre notre communauté ! Vous êtes maintenant parmi les premiers à suivre le développement de <strong>Yunicity</strong>, 
          la plateforme qui va révolutionner la découverte des trésors locaux à Reims et ses environs.
        </p>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #7c3aed; margin-top: 0;">🚀 Ce qui vous attend :</h3>
          <ul style="color: #374151; margin: 10px 0;">
            <li>Accès prioritaire à la version bêta</li>
            <li>Découverte des 50+ commerces partenaires</li>
            <li>Updates exclusives sur notre levée de fonds</li>
            <li>Évènements communautaires dans la région rémoise</li>
          </ul>
        </div>

        <p style="color: #374151; line-height: 1.6;">
          Notre lancement approche ! Restez connecté(e) pour ne rien manquer de cette aventure entrepreneuriale.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="https://yunicity.com" 
             style="display: inline-block; background: linear-gradient(135deg, #7c3aed, #a855f7); color: white; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: bold;">
            🌟 Découvrir Yunicity
          </a>
        </div>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="color: #9ca3af; font-size: 14px; text-align: center;">
          Yunicity - Faire battre le cœur de la ville<br>
          📍 Reims, France | 🚀 Lancement imminent
        </p>
      </div>
    </body>
    </html>
  `

  const welcomeText = `
Bienvenue chez Yunicity !

Bonjour ${subscriberData.name || 'cher(e) abonné(e)'} !

Merci de rejoindre notre communauté ! Vous êtes maintenant parmi les premiers à suivre le développement de Yunicity.

Ce qui vous attend :
- Accès prioritaire à la version bêta  
- Découverte des 50+ commerces partenaires
- Updates exclusives sur notre levée de fonds
- Évènements communautaires dans la région rémoise

Notre lancement approche ! Restez connecté(e) pour ne rien manquer.

Yunicity - Faire battre le cœur de la ville
Reims, France
  `

  return await sendEmail({
    to: subscriberData.email,
    subject: '🎉 Bienvenue dans l\'aventure Yunicity !',
    html: welcomeHTML,
    text: welcomeText
  })
}

/**
 * Notifie l'équipe d'un nouveau contact investisseur
 */
export async function sendInvestorContactNotification(contactData: any) {
  const notificationHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>🚀 Nouveau contact investisseur !</title>
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 30px; border-radius: 12px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">
          💰 Nouveau Contact Investisseur !
        </h1>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 12px; margin-top: 20px;">
        <h2 style="color: #059669;">Détails du contact :</h2>
        
        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>👤 Nom :</strong> ${contactData.name}</p>
          <p><strong>📧 Email :</strong> ${contactData.email}</p>
          <p><strong>🏢 Société :</strong> ${contactData.company || 'Non spécifiée'}</p>
          <p><strong>💼 Profil :</strong> ${contactData.investorType || 'Non spécifié'}</p>
          <p><strong>💰 Ticket :</strong> ${contactData.investmentRange || 'Non spécifié'}</p>
        </div>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
          <h3 style="color: #374151; margin-top: 0;">💬 Message :</h3>
          <p style="color: #374151; font-style: italic;">${contactData.message}</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #059669; font-weight: bold;">⚡ Action requise : Contacter sous 24h !</p>
        </div>
      </div>
    </body>
    </html>
  `

  return await sendEmail({
    to: process.env.ADMIN_EMAIL || 'admin@yunicity.com',
    subject: `🚀 Nouveau contact investisseur : ${contactData.name}`,
    html: notificationHTML,
    text: `Nouveau contact investisseur : ${contactData.name} (${contactData.email}) - ${contactData.company || 'Société non spécifiée'}`
  })
}
