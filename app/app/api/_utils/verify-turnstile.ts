export async function verifyTurnstileToken(token?: string) {
  try {
    if (!process.env.TURNSTILE_SECRET_KEY) return { success: false, code: 'missing_secret' }
    if (!token) return { success: false, code: 'missing_token' }
    const formData = new FormData()
    formData.append('secret', process.env.TURNSTILE_SECRET_KEY)
    formData.append('response', token)
    const ip = undefined
    if (ip) formData.append('remoteip', ip)
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    return { success: !!data.success, data }
  } catch (e) {
    console.error('Turnstile verify error', e)
    return { success: false, code: 'error' }
  }
}


