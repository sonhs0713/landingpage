function maskValue(value, visible = 4) {
  const raw = String(value || '')
  if (!raw) return ''
  if (raw.length <= visible) return '*'.repeat(raw.length)
  return `${raw.slice(0, visible)}${'*'.repeat(Math.max(raw.length - visible, 4))}`
}

function hasCertLikeText(value) {
  const raw = String(value || '')
  return raw.includes('BEGIN CERTIFICATE') && raw.includes('END CERTIFICATE')
}

function getHostFromUrl(value) {
  try {
    return value ? new URL(value).host : ''
  } catch {
    return ''
  }
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    res.status(405).json({ ok: false, message: 'Method Not Allowed' })
    return
  }

  const siteCode = process.env.KCP_SITE_CODE || ''
  const approvalUrl = process.env.KCP_APPROVAL_URL || ''
  const certInfo = process.env.KCP_CERT_INFO || ''
  const inferredMode = String(siteCode).toUpperCase().startsWith('T') ? 'test' : 'production'

  res.status(200).json({
    ok: true,
    inferredMode,
    siteCode: maskValue(siteCode, 2),
    approvalUrlHost: getHostFromUrl(approvalUrl),
    certConfigured: Boolean(certInfo),
    certLooksValid: hasCertLikeText(certInfo),
    certPreview: maskValue(certInfo.replace(/\\n/g, '\n').replace(/\s+/g, ''), 12),
  })
}
