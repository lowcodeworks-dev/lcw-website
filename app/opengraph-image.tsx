import { ImageResponse } from 'next/og'

export const alt = 'LowCodeWorks — Enterprise Digital Transformation'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#09090b',
          color: '#fafafa',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 44 }}>
          <div style={{ display: 'flex', width: 14, height: 14, borderRadius: 9999, background: '#fafafa' }} />
          <div style={{ display: 'flex', fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em' }}>
            LowCodeWorks
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 58, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, maxWidth: 920 }}>
          Enterprise transformation, without the platform dependency.
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#a1a1aa', marginTop: 28, maxWidth: 820 }}>
          Governance, architecture, and delivery capability for organisations scaling AI-ready
          digital platforms.
        </div>
      </div>
    ),
    { ...size }
  )
}
