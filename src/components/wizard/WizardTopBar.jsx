import logo from '../../assets/logo.png'

export default function WizardTopBar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between
                 border-b border-slate-200 bg-white px-5 py-3 sm:px-8"
    >
      {/* Logo */}
      <a href="/" aria-label="ZFFA Trading — home">
        <img
          src={logo}
          alt="ZFFA Trading"
          className="h-10 w-auto object-contain"
        />
      </a>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <a
          href="/"
          className="font-montserrat rounded-lg border border-slate-300 px-4 py-2
                     text-sm font-semibold text-slate-600 transition-colors duration-150
                     hover:border-slate-400 hover:text-slate-800"
        >
          Back to website
        </a>
        <a
          href="/contact"
          className="font-montserrat rounded-lg bg-rose-600 px-4 py-2 text-sm
                     font-semibold text-white transition-all duration-150
                     hover:-translate-y-0.5 hover:bg-rose-700 hover:shadow-sm
                     active:translate-y-0 active:scale-[0.97]"
        >
          Request a quote
        </a>
      </div>
    </header>
  )
}
