export default function Footer() {
  return (
    <footer className="bg-red-700 text-white" style={{ fontFamily: 'inherit' }}>
      <div className="mx-auto max-w-screen-2xl px-10 pt-14 pb-10 lg:px-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1.5fr_2fr_1fr]">
          <div className="flex flex-col gap-6">
            <div
              className="flex items-center justify-center rounded-2xl bg-white"
              style={{ width: 180, height: 120 }}
            >
              <img
                src="/zffa-logo.png"
                alt="ZFFA Trading"
                style={{ width: 140, objectFit: 'contain' }}
              />
            </div>
            <p className="text-sm leading-relaxed text-red-100" style={{ maxWidth: 260 }}>
              We create impactful signage and branding experiences that bring your business to life and drive real visibility.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-base font-semibold tracking-wide">Head Office</h4>
            <address className="not-italic">
              <p className="text-sm text-red-100 leading-relaxed">
                9 Tillinghast lane, Scarborough,<br />ON, M1J 0A8
              </p>
              <div className="mt-5 flex flex-col gap-1">
                <a
                  href="tel:+14379944085"
                  className="text-sm text-red-200 underline underline-offset-2 hover:text-white"
                >
                  +1 437-994-4085
                </a>
                <a
                  href="mailto:atiq@zffatrading.com"
                  className="text-sm text-red-200 underline underline-offset-2 hover:text-white"
                >
                  atiq@zffatrading.com
                </a>
              </div>
            </address>
          </div>

          <div>
            <h4 className="mb-6 text-base font-semibold tracking-wide">Navigation</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'HOME', href: '/' },
                { label: 'SERVICES', href: '/services' },
                { label: 'ABOUT US', href: '/about' },
                { label: 'CONTACT US', href: '/contact' },
                { label: 'FAQs', href: '/faqs' },
                { label: 'BRANDING PACKAGES', href: '/branding-packages' },
                { label: 'PORTFOLIO', href: '/portfolio' },
                { label: 'NEW BUSINESS GUIDE', href: '/new-business-guide' },
                { label: 'PRICE ESTIMATOR', href: '/price-estimator' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm tracking-widest text-red-100 hover:text-white hover:underline"
                    style={{ letterSpacing: '0.08em' }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-base font-semibold tracking-wide">Socials</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Facebook', href: 'https://facebook.com' },
                { label: 'Instagram', href: 'https://instagram.com' },
                { label: 'LinkedIn', href: 'https://linkedin.com' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-red-100 hover:text-white hover:underline"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-red-600 pt-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-8 text-sm text-red-200">
            <a href="/privacy-policy" className="hover:text-white hover:underline">
              Privacy Policy
            </a>
            <a href="/accessibility" className="hover:text-white hover:underline">
              Accessibility Statement
            </a>
          </div>
          <p className="text-sm text-red-200">
            © 2026 ZFFA All Rights Reserved | Website by{' '}
            <a href="#" className="hover:text-white hover:underline">
              Your Agency
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
