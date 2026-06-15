import StepProgressBar from './StepProgressBar'

export default function WizardShell({
  children,
  currentStep,
  totalSteps,
  onBack,
  onNext,
  showBack,
  nextDisabled,
  isResult,
}) {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-10">
      {/* Progress bar */}
      <div className="mb-8">
        <StepProgressBar current={currentStep} total={totalSteps} />
        <p className="mt-2 text-right text-xs font-medium text-slate-400">
          Step {currentStep} of {totalSteps}
        </p>
      </div>

      {/* Step content */}
      <div className="min-h-[320px]">
        {children}
      </div>

      {/* Nav bar — hidden on result step */}
      {!isResult && (
        <div className="mt-8 flex items-center justify-between gap-4">
          {showBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3
                text-sm font-bold uppercase tracking-wider text-slate-500 transition-all duration-150
                hover:border-slate-400 hover:text-slate-700
                active:scale-[0.97]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2"
            >
              Back
            </button>
          ) : (
            <span className="invisible px-6 py-3 text-sm">Back</span>
          )}

          <button
            type="button"
            onClick={onNext}
            disabled={nextDisabled}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-6 py-3
              text-sm font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-150
              hover:-translate-y-0.5 hover:bg-rose-700 hover:shadow-md
              active:translate-y-0 active:scale-[0.97]
              disabled:pointer-events-none disabled:opacity-40
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
