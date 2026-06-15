export default function StepProgressBar({ current, total }) {
  return (
    <div className="w-full">
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300
              ${i < current ? 'bg-rose-600' : 'bg-slate-200'}`}
          />
        ))}
      </div>
      <p className="sr-only">Step {current} of {total}</p>
    </div>
  )
}
