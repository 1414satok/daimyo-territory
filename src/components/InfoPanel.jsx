import clansData from '../data/clans.json'

export default function InfoPanel({ feature, year, onClose }) {
  if (!feature) return null

  const { clanId, displayName, province, lord, note } = feature.properties
  const clan = clansData[clanId] || {}

  const currentLord = getLordAtYear(clan.lords || [], year) || lord

  return (
    <div style={styles.panel}>
      <button style={styles.close} onClick={onClose}>✕</button>

      <div style={{ borderLeft: `4px solid ${clan.color || '#888'}`, paddingLeft: 12 }}>
        <div style={styles.clanName}>{clan.name || displayName}</div>
        <div style={styles.subName}>{displayName}</div>
      </div>

      <table style={styles.table}>
        <tbody>
          <tr>
            <th style={styles.th}>国・地域</th>
            <td style={styles.td}>{province}</td>
          </tr>
          <tr>
            <th style={styles.th}>当主</th>
            <td style={styles.td}>{currentLord}</td>
          </tr>
        </tbody>
      </table>

      {note && <p style={styles.note}>{note}</p>}

      {clan.description && <p style={styles.desc}>{clan.description}</p>}

      {(clan.lords || []).length > 0 && (
        <div style={styles.lordsSection}>
          <div style={styles.sectionLabel}>当主変遷</div>
          {clan.lords.map((l, i) => (
            <div
              key={i}
              style={{
                ...styles.lordItem,
                ...(year >= l.from && year <= l.to ? styles.lordActive : {}),
              }}
            >
              <span style={styles.lordName}>{l.name}</span>
              <span style={styles.lordYears}>{l.from}〜{l.to}</span>
            </div>
          ))}
        </div>
      )}

      {clan.wikiUrl && (
        <a href={clan.wikiUrl} target="_blank" rel="noopener noreferrer" style={styles.wikiLink}>
          Wikipedia で調べる →
        </a>
      )}
    </div>
  )
}

function getLordAtYear(lords, year) {
  const match = lords.find(l => year >= l.from && year <= l.to)
  return match?.name
}

const styles = {
  panel: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 300,
    background: 'rgba(20,14,6,0.95)',
    border: '1px solid #5a3a10',
    borderRadius: 6,
    padding: 16,
    zIndex: 1000,
    color: '#f0e6d0',
    backdropFilter: 'blur(4px)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
    maxHeight: 'calc(100vh - 120px)',
    overflowY: 'auto',
  },
  close: {
    position: 'absolute',
    top: 8,
    right: 8,
    background: 'none',
    border: 'none',
    color: '#8a7050',
    cursor: 'pointer',
    fontSize: 14,
    lineHeight: 1,
  },
  clanName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f5e0a0',
    lineHeight: 1.3,
  },
  subName: {
    fontSize: 13,
    color: '#9a8060',
    marginBottom: 12,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: 10,
    fontSize: 13,
  },
  th: {
    textAlign: 'left',
    color: '#8a7050',
    padding: '3px 0',
    width: 70,
    fontWeight: 'normal',
  },
  td: {
    color: '#e0d0b0',
    padding: '3px 0',
  },
  note: {
    marginTop: 12,
    fontSize: 12,
    color: '#c8b070',
    background: 'rgba(100,60,0,0.2)',
    padding: '6px 8px',
    borderRadius: 4,
    lineHeight: 1.6,
  },
  desc: {
    marginTop: 10,
    fontSize: 12,
    color: '#a09070',
    lineHeight: 1.7,
  },
  lordsSection: {
    marginTop: 12,
    borderTop: '1px solid #3a2a10',
    paddingTop: 10,
  },
  sectionLabel: {
    fontSize: 11,
    color: '#7a6a50',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  lordItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 12,
    padding: '2px 0',
    color: '#7a6a50',
  },
  lordActive: {
    color: '#f5e0a0',
    fontWeight: 'bold',
  },
  lordName: {},
  lordYears: {
    fontSize: 11,
    opacity: 0.7,
  },
  wikiLink: {
    display: 'block',
    marginTop: 14,
    fontSize: 12,
    color: '#6a9adf',
    textDecoration: 'none',
  },
}
