import { YEAR_MIN, YEAR_MAX, YEAR_STEP } from '../data/index.js'

const ERA_LABELS = [
  { year: 1467, label: '応仁の乱' },
  { year: 1543, label: '鉄砲伝来' },
  { year: 1560, label: '桶狭間' },
  { year: 1568, label: '信長上洛' },
  { year: 1573, label: '室町幕府滅亡' },
  { year: 1582, label: '本能寺' },
  { year: 1590, label: '小田原征伐' },
]

export default function TimeSlider({ year, onChange }) {
  const steps = []
  for (let y = YEAR_MIN; y <= YEAR_MAX; y += YEAR_STEP) steps.push(y)

  return (
    <div style={styles.container}>
      <div style={styles.yearDisplay}>
        <span style={styles.yearNumber}>{year}</span>
        <span style={styles.yearUnit}>年</span>
        {ERA_LABELS.find(e => e.year === year) && (
          <span style={styles.eventBadge}>{ERA_LABELS.find(e => e.year === year).label}</span>
        )}
      </div>

      <div style={styles.sliderWrapper}>
        <input
          type="range"
          min={YEAR_MIN}
          max={YEAR_MAX}
          step={YEAR_STEP}
          value={year}
          onChange={e => onChange(Number(e.target.value))}
          style={styles.slider}
        />
        <div style={styles.tickRow}>
          {[1460, 1490, 1520, 1550, 1580].map(y => (
            <div key={y} style={{ ...styles.tick, left: `${((y - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * 100}%` }}>
              <span style={styles.tickLabel}>{y}</span>
            </div>
          ))}
          {ERA_LABELS.map(({ year: ey, label }) => (
            <div
              key={ey}
              style={{ ...styles.eventTick, left: `${((ey - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * 100}%` }}
              title={`${ey}年 ${label}`}
            />
          ))}
        </div>
      </div>

      <div style={styles.stepButtons}>
        <button onClick={() => onChange(Math.max(YEAR_MIN, year - YEAR_STEP))} style={styles.btn}>◀</button>
        <button onClick={() => onChange(Math.min(YEAR_MAX, year + YEAR_STEP))} style={styles.btn}>▶</button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(to top, rgba(15,10,5,0.97) 70%, transparent)',
    padding: '12px 24px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    zIndex: 1000,
  },
  yearDisplay: {
    minWidth: 120,
    display: 'flex',
    alignItems: 'baseline',
    gap: 4,
    flexShrink: 0,
  },
  yearNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f5e6c8',
    fontVariantNumeric: 'tabular-nums',
    lineHeight: 1,
  },
  yearUnit: {
    fontSize: 16,
    color: '#b8a070',
  },
  eventBadge: {
    fontSize: 11,
    background: '#8b1a1a',
    color: '#ffd700',
    padding: '2px 6px',
    borderRadius: 3,
    marginLeft: 6,
    whiteSpace: 'nowrap',
  },
  sliderWrapper: {
    flex: 1,
    position: 'relative',
    paddingBottom: 20,
  },
  slider: {
    width: '100%',
    accentColor: '#c8a050',
    cursor: 'pointer',
    height: 4,
  },
  tickRow: {
    position: 'absolute',
    top: 18,
    left: 0,
    right: 0,
    height: 20,
  },
  tick: {
    position: 'absolute',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  tickLabel: {
    fontSize: 10,
    color: '#7a6a50',
    whiteSpace: 'nowrap',
  },
  eventTick: {
    position: 'absolute',
    transform: 'translateX(-50%)',
    width: 2,
    height: 6,
    background: '#8b1a1a',
    top: -8,
    cursor: 'help',
  },
  stepButtons: {
    display: 'flex',
    gap: 4,
    flexShrink: 0,
  },
  btn: {
    background: '#3a2a10',
    border: '1px solid #6a4a20',
    color: '#f0d080',
    padding: '4px 10px',
    cursor: 'pointer',
    borderRadius: 3,
    fontSize: 14,
  },
}
