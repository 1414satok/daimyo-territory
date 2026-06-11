import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import clansData from '../data/clans.json'

const MAP_CENTER = [36.2, 138.8]
const MAP_ZOOM = 7

function getStyle(feature, selectedId) {
  const clan = clansData[feature.properties.clanId] || {}
  const isSelected = feature.id === selectedId
  return {
    fillColor: clan.color || '#888',
    fillOpacity: isSelected ? 0.75 : 0.45,
    color: isSelected ? '#fff' : (clan.color || '#888'),
    weight: isSelected ? 2.5 : 1,
    opacity: 0.8,
  }
}

export default function MapView({ territories, year, selectedId, onSelect }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const layerRef = useRef(null)

  // マップ初期化（一度だけ）
  useEffect(() => {
    if (mapRef.current) return

    const map = L.map(containerRef.current, {
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      zoomControl: true,
      attributionControl: true,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      opacity: 0.2,
    }).addTo(map)

    // 暗い背景タイル（歴史的雰囲気）
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '© CARTO',
      opacity: 0.7,
    }).addTo(map)

    // 地名ラベルのみのオーバーレイ
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png', {
      attribution: '',
      opacity: 0.5,
    }).addTo(map)

    mapRef.current = map
  }, [])

  // 領地データ更新
  useEffect(() => {
    const map = mapRef.current
    if (!map || !territories) return

    if (layerRef.current) {
      map.removeLayer(layerRef.current)
    }

    const onSelectRef = { current: onSelect }

    const layer = L.geoJSON(territories, {
      style: feature => getStyle(feature, selectedId),
      onEachFeature: (feature, layer) => {
        layer.on('click', () => onSelectRef.current(feature))
        layer.on('mouseover', function () {
          if (feature.id !== selectedId) {
            this.setStyle({ fillOpacity: 0.65, weight: 2 })
          }
        })
        layer.on('mouseout', function () {
          if (feature.id !== selectedId) {
            this.setStyle(getStyle(feature, selectedId))
          }
        })

        const clan = clansData[feature.properties.clanId] || {}
        layer.bindTooltip(
          `<div style="font-size:12px;font-weight:bold">${feature.properties.displayName}</div>
           <div style="font-size:11px;opacity:0.8">${feature.properties.lord || ''}</div>`,
          { sticky: true, opacity: 0.9, className: 'sengoku-tooltip' }
        )
      },
    })

    layer.addTo(map)
    layerRef.current = layer
    onSelectRef.current = onSelect
  }, [territories, year])

  // 選択状態のみ再スタイル（再描画なし）
  useEffect(() => {
    if (!layerRef.current) return
    layerRef.current.eachLayer(layer => {
      if (layer.feature) {
        layer.setStyle(getStyle(layer.feature, selectedId))
      }
    })
  }, [selectedId])

  return (
    <>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      <style>{`
        .sengoku-tooltip {
          background: rgba(20,14,6,0.92);
          border: 1px solid #5a3a10;
          color: #f0e6d0;
          border-radius: 4px;
          padding: 4px 8px;
        }
        .sengoku-tooltip::before { display: none; }
        .leaflet-control-zoom a {
          background: rgba(20,14,6,0.9) !important;
          color: #c8a050 !important;
          border-color: #5a3a10 !important;
        }
      `}</style>
    </>
  )
}
