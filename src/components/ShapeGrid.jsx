import { useEffect, useRef } from 'react'

// React Bits — Shape Grid (manual implementation)
// Grid of bordered squares, some randomly lit, with smooth transition

const COLS = 16
const ROWS = 10
const TOTAL = COLS * ROWS
const ACTIVE_COUNT = 8
const INTERVAL = 1500

export default function ShapeGrid({ dark }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cells = Array.from(container.querySelectorAll('.sg-cell'))

    const tick = () => {
      // Clear all
      cells.forEach((c) => c.classList.remove('sg-active'))
      // Pick random active
      const indices = new Set()
      while (indices.size < ACTIVE_COUNT) {
        indices.add(Math.floor(Math.random() * TOTAL))
      }
      indices.forEach((i) => cells[i]?.classList.add('sg-active'))
    }

    tick()
    const id = setInterval(tick, INTERVAL)
    return () => clearInterval(id)
  }, [])

  const borderColor = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'
  const activeBg    = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
  const fadeBg      = dark
    ? 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 30%, rgba(0,0,0,0.95) 100%)'
    : 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 30%, rgba(255,255,255,0.95) 100%)'

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
      <style>{`
        .sg-cell {
          border: 1px solid ${borderColor};
          background-color: transparent;
          transition: background-color 0.6s ease;
        }
        .sg-cell.sg-active {
          background-color: ${activeBg};
        }
      `}</style>

      {/* Grid */}
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {Array.from({ length: TOTAL }, (_, i) => (
          <div key={i} className="sg-cell" />
        ))}
      </div>

      {/* Radial vignette */}
      <div className="absolute inset-0" style={{ background: fadeBg }} />
    </div>
  )
}
