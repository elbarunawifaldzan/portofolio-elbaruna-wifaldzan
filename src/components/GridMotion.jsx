// React Bits — Grid Motion (optimized)
// CSS animation instead of Framer Motion for better performance

const ROW_DURATION = [28, 35, 31] // seconds per row

export default function GridMotion({ items = [], dark }) {
  const third = Math.ceil(items.length / 3)
  const rows = [
    items.slice(0, third),
    items.slice(third, third * 2),
    items.slice(third * 2),
  ]

  const border = dark ? 'border-white/[0.08]' : 'border-black/[0.08]'
  const overlay = dark ? 'from-black/80' : 'from-black/70'

  return (
    <>
      <style>{`
        @keyframes scroll-left  { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes scroll-right { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        .gm-row-fwd { animation: scroll-left  var(--dur) linear infinite; will-change: transform; }
        .gm-row-rev { animation: scroll-right var(--dur) linear infinite; will-change: transform; }
      `}</style>

      <div
        className="relative w-full overflow-hidden"
        style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
      >
        <div className="flex flex-col gap-3 py-2">
          {rows.map((row, ri) => {
            const doubled = [...row, ...row]
            const reverse = ri % 2 !== 0
            return (
              <div key={ri} className="overflow-hidden">
                <div
                  className={`flex gap-3 ${reverse ? 'gm-row-rev' : 'gm-row-fwd'}`}
                  style={{ width: 'max-content', '--dur': `${ROW_DURATION[ri]}s` }}
                >
                  {doubled.map((item, i) => (
                    <div
                      key={i}
                      className={`relative shrink-0 w-56 h-40 rounded-xl overflow-hidden border group cursor-pointer ${border}`}
                    >
                      <img
                        src={item.file}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      {/* Hover title */}
                      <div className={`absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t ${overlay} to-transparent`}>
                        <p className="text-white text-[10px] font-semibold tracking-wider leading-tight line-clamp-2">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
