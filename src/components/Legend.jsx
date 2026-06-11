import { useState } from 'react'
import clansData from '../data/clans.json'

export default function Legend({ visibleClanIds }) {
  const [collapsed, setCollapsed] = useState(false)

  const entries = Object.entries(clansData).filter(([id]) => visibleClanIds.includes(id))

  return (
    <div style={styles.container}>
      <div style={styles.header} onClick={() => setCollapsed(c => !c)}>
        <span style={styles.title}>凡例</span>
        <span style={styles.toggle}>{collapsed ? '▼' : '▲'}</span>
      </div>
      {!collapsed && (
        <div style={styles.list}>
          {entries.map(([id, clan]) => (
            <div key={id} style={styles.item}>
              <span style={{ ...styles.swatch, background: clan.color }} />
              <span style={styles.name}>{clan.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    background: 'rgba(20,14,6,0.92)',
    border: '1px solid #5a3a10',
    borderRadius: 6,
    minWidth: 160,
    zIndex: 1000,
    color: '#f0e6d0',
    backdropFilter: 'blur(4px)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    cursor: 'pointer',
    userSelect: 'none',
  },
  title: {
    fontSize: 12,
    color: '#8a7050',
    letterSpacing: 1,
  },
  toggle: {
    fontSize: 10,
    color: '#6a5a40',
  },
  list: {
    padding: '0 12px 10px',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  swatch: {
    width: 12,
    height: 12,
    borderRadius: 2,
    flexShrink: 0,
    opacity: 0.8,
  },
  name: {
    fontSize: 12,
    color: '#d0c0a0',
  },
}
