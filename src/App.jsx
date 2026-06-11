import { useState, useMemo } from 'react'
import MapView from './components/MapView.jsx'
import TimeSlider from './components/TimeSlider.jsx'
import InfoPanel from './components/InfoPanel.jsx'
import Legend from './components/Legend.jsx'
import { getTerritoriesForYear, YEAR_MIN } from './data/index.js'

export default function App() {
  const [year, setYear] = useState(1560)
  const [selectedFeature, setSelectedFeature] = useState(null)

  const territories = useMemo(() => getTerritoriesForYear(year), [year])

  const visibleClanIds = useMemo(
    () => [...new Set(territories.features.map(f => f.properties.clanId))],
    [territories]
  )

  function handleYearChange(newYear) {
    setYear(newYear)
    setSelectedFeature(null)
  }

  function handleSelect(feature) {
    setSelectedFeature(prev => prev?.id === feature.id ? null : feature)
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <MapView
        territories={territories}
        year={year}
        selectedId={selectedFeature?.id}
        onSelect={handleSelect}
      />

      <TimeSlider year={year} onChange={handleYearChange} />

      {selectedFeature && (
        <InfoPanel
          feature={selectedFeature}
          year={year}
          onClose={() => setSelectedFeature(null)}
        />
      )}

      <Legend visibleClanIds={visibleClanIds} />

      <div style={styles.title}>
        <span style={styles.titleMain}>戦国勢力図</span>
        <span style={styles.titleSub}>関東甲信越デモ版</span>
      </div>
    </div>
  )
}

const styles = {
  title: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
  },
  titleMain: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f5e0a0',
    textShadow: '0 2px 8px rgba(0,0,0,0.8)',
    letterSpacing: 2,
  },
  titleSub: {
    fontSize: 11,
    color: '#7a6a50',
    letterSpacing: 1,
    marginTop: 2,
  },
}
