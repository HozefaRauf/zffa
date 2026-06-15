export default function QuoteButton() {
  return (
    <div className="rounded-2xl bg-slate-900 p-5 space-y-4">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          Ready to proceed?
        </p>
        <p className="mt-0.5 text-sm text-slate-400">
          Get an exact quote tailored to your project.
        </p>
      </div>
      <a
        href="/contact"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-3.5
                   text-sm font-semibold text-white transition hover:bg-rose-500 active:scale-[0.98]"
      >
        Request Exact Quote
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </div>
  )
}