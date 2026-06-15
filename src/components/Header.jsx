// Header.jsx
// <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@600;700;800&display=swap" rel="stylesheet" />

import { useEffect, useRef, useState } from 'react'

const SERVICES = [
  'Storefront Signage',
  'Window & Graphics',
  'Vehicle Branding',
  'Banners & Large Format Printing',
  'Promotional & Business Printing',
  'Promotional Products',
  'Indoor Branding & Displays',
  'Digital Services',
  'Ongoing Branding Support',
]

// Row 1: 5 pills
const ROW1 = [
  { label: 'HOME',                href: '/' },
  { label: 'BRANDING PACKAGES',  href: '/branding-packages' },
  { label: 'NEW BUSINESS GUIDE', href: '/new-business-guide' },
  { label: 'PROMOTIONAL PRODUCTS', href: '/promotional-products' },
]
// (SERVICES is handled separately because it has a dropdown)

// Row 2: 5 pills
const ROW2 = [
  { label: 'PORTFOLIO',        href: '/portfolio' },
  { label: 'PRICE ESTIMATOR',  href: '/price-estimator' },
  { label: 'FAQs',             href: '/faqs' },
  { label: 'ABOUT US',         href: '/about' },
  { label: 'CONTACT US',       href: '/contact' },
]

function Pill({ href = '#', children, active = false, onClick, isButton = false, scrolled }) {
  const borderColor = active ? '#C0151A' : scrolled ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.85)'
  const textColor   = active ? '#ffffff' : scrolled ? '#111111' : '#ffffff'
  const bgColor     = active ? '#C0151A' : 'transparent'

  const base = {
    display:        'inline-flex',
    alignItems:     'center',
    gap:            'clamp(3px, 0.3vw, 6px)',
    border:         `1.5px solid ${borderColor}`,
    borderRadius:   '999px',
    padding:        'clamp(4px, 0.4vw, 7px) clamp(8px, 1.1vw, 18px)',
    fontSize:       'clamp(9px, 0.82vw, 12.5px)',
    fontWeight:     700,
    fontFamily:     "'Barlow', sans-serif",
    letterSpacing:  '0.08em',
    color:          textColor,
    background:     bgColor,
    cursor:         'pointer',
    whiteSpace:     'nowrap',
    textDecoration: 'none',
    lineHeight:     1,
    transition:     'background 0.15s, color 0.15s, border-color 0.15s',
  }

  const hoverEnter = (e) => {
    if (active) return
    e.currentTarget.style.background = scrolled ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.12)'
  }
  const hoverLeave = (e) => {
    if (active) return
    e.currentTarget.style.background = 'transparent'
  }

  if (isButton) {
    return (
      <button type="button" style={base} onClick={onClick}
        onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
        {children}
      </button>
    )
  }

  return (
    <a href={href} style={base} onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
      {children}
    </a>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const dropdownRef             = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handle = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''

  return (
    <header
      style={{
        position:   'fixed',
        top:        0,
        left:       0,
        width:      '100%',
        zIndex:     50,
        height:     'clamp(60px, 5.6vw, 85.19px)',
        background: scrolled
          ? '#ffffff'
          : 'radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 100%)',
        boxShadow:  scrolled ? '0 2px 16px rgba(0,0,0,0.10)' : 'none',
        display:    'flex',
        alignItems: 'center',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <div
        style={{
          width:      '100%',
          maxWidth:   '1520px',
          margin:     '0 auto',
          padding:    '0 clamp(12px, 2vw, 28px)',
          display:    'flex',
          alignItems: 'center',
          gap:        'clamp(12px, 1.8vw, 28px)',
        }}
      >

        {/* ── Logo ── */}
        <a href="/" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src="/logo.png"
            alt="ZFFA Trading"
            style={{ height: 'clamp(32px, 3.4vw, 52px)', width: 'auto', objectFit: 'contain' }}
          />
        </a>

        {/* ── Nav: 2 rows of 5 ── */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 0.5vw, 8px)', minWidth: 0 }}>

          {/* Row 1 — 5 pills: HOME + SERVICES + 3 more */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(5px, 0.65vw, 10px)' }}>

            <Pill href="/" scrolled={scrolled} active={currentPath === '/'}>
              HOME
            </Pill>

            {/* SERVICES with dropdown — counts as pill #2 */}
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <Pill isButton scrolled={scrolled} onClick={() => setOpen((s) => !s)}>
                SERVICES
                <span style={{
                  display:    'inline-block',
                  fontSize:   'clamp(8px, 0.7vw, 11px)',
                  transition: 'transform 0.2s',
                  transform:  open ? 'rotate(180deg)' : 'rotate(0deg)',
                }}>▾</span>
              </Pill>

              {open && (
                <div style={{
                  position:     'absolute',
                  top:          'calc(100% + 10px)',
                  left:         0,
                  minWidth:     'clamp(180px, 18vw, 270px)',
                  background:   scrolled ? '#ffffff' : '#1a1a1a',
                  border:       `1px solid ${scrolled ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)'}`,
                  borderRadius: '12px',
                  padding:      '10px',
                  zIndex:       100,
                  boxShadow:    '0 8px 32px rgba(0,0,0,0.18)',
                }}>
                  {SERVICES.map((s) => (
                    <a key={s} href="#"
                      style={{
                        display:        'block',
                        padding:        'clamp(6px, 0.6vw, 9px) clamp(10px, 1vw, 14px)',
                        borderRadius:   '8px',
                        fontSize:       'clamp(10px, 0.85vw, 13px)',
                        fontWeight:     600,
                        color:          scrolled ? '#111111' : 'rgba(255,255,255,0.85)',
                        textDecoration: 'none',
                        letterSpacing:  '0.03em',
                        fontFamily:     "'Barlow', sans-serif",
                        transition:     'background 0.12s, color 0.12s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#C0151A'
                        e.currentTarget.style.color      = '#ffffff'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color      = scrolled ? '#111111' : 'rgba(255,255,255,0.85)'
                      }}
                    >{s}</a>
                  ))}
                </div>
              )}
            </div>

            {/* Pills 3-5 */}
            <Pill href="/branding-packages"   scrolled={scrolled} active={currentPath === '/branding-packages'}>BRANDING PACKAGES</Pill>
            <Pill href="/new-business-guide"  scrolled={scrolled} active={currentPath === '/new-business-guide'}>NEW BUSINESS GUIDE</Pill>
            <Pill href="/promotional-products" scrolled={scrolled} active={currentPath === '/promotional-products'}>PROMOTIONAL PRODUCTS</Pill>
          </div>

          {/* Row 2 — 5 pills, starts flush with Row 1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(5px, 0.65vw, 10px)' }}>
            <Pill href="/portfolio"       scrolled={scrolled} active={currentPath === '/portfolio'}>PORTFOLIO</Pill>
            <Pill href="/price-estimator" scrolled={scrolled} active={currentPath === '/price-estimator'}>PRICE ESTIMATOR</Pill>
            <Pill href="/faqs"            scrolled={scrolled} active={currentPath === '/faqs'}>FAQs</Pill>
            <Pill href="/about"           scrolled={scrolled} active={currentPath === '/about'}>ABOUT US</Pill>
            <Pill href="/contact"         scrolled={scrolled} active={currentPath === '/contact'}>CONTACT US</Pill>
          </div>
        </nav>

        {/* ── GET QUOTE — not counted, always red ── */}
        <a
          href="/get-quote"
          style={{
            flexShrink:     0,
            display:        'inline-flex',
            alignItems:     'center',
            gap:            'clamp(6px, 0.6vw, 10px)',
            background:     '#C0151A',
            border:         '2px solid #C0151A',
            borderRadius:   '999px',
            padding:        'clamp(7px, 0.65vw, 10px) clamp(14px, 1.5vw, 24px)',
            fontSize:       'clamp(10px, 0.88vw, 13.5px)',
            fontWeight:     800,
            fontFamily:     "'Barlow', sans-serif",
            letterSpacing:  '0.1em',
            color:          '#ffffff',
            textDecoration: 'none',
            whiteSpace:     'nowrap',
            transition:     'background 0.15s, border-color 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background  = '#a01015'
            e.currentTarget.style.borderColor = '#a01015'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background  = '#C0151A'
            e.currentTarget.style.borderColor = '#C0151A'
          }}
        >
          GET QUOTE
          <span style={{ fontSize: 'clamp(12px, 1vw, 16px)', fontWeight: 400 }}>→</span>
        </a>

      </div>
    </header>
  )
}