'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { Church } from '@/types'
import 'leaflet/dist/leaflet.css'

const churchIcon = new L.Icon({
  iconUrl: 'https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/map-marker.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: 'church-marker',
})

function FitBounds({ churches }: { churches: Church[] }) {
  const map = useMap()

  useEffect(() => {
    const points = churches
      .filter((ch) => ch.latitude && ch.longitude)
      .map((ch) => [Number(ch.latitude), Number(ch.longitude)] as [number, number])

    if (points.length > 0) {
      const bounds = L.latLngBounds(points)
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 })
    }
  }, [churches, map])

  return null
}

interface ChurchMapProps {
  churches: Church[]
}

export default function ChurchMap({ churches }: ChurchMapProps) {
  return (
    <>
      <style>{`
        .church-marker {
          filter: invert(70%) sepia(50%) saturate(500%) hue-rotate(5deg) brightness(95%);
        }
        .leaflet-container {
          background: #0A0A0A;
        }
        .leaflet-popup-content-wrapper {
          background: #1E1E1E;
          color: #F5F5F5;
          border-radius: 12px;
          border: 1px solid #262626;
        }
        .leaflet-popup-tip {
          background: #1E1E1E;
        }
        .leaflet-popup-close-button {
          color: #9CA3AF !important;
        }
        .leaflet-control-zoom a {
          background: #1E1E1E !important;
          color: #F5F5F5 !important;
          border-color: #262626 !important;
        }
        .leaflet-control-attribution {
          background: rgba(10,10,10,0.8) !important;
          color: #6B7280 !important;
        }
        .leaflet-control-attribution a {
          color: #9CA3AF !important;
        }
      `}</style>
      <MapContainer
        center={[28.4377, -16.4476]}
        zoom={4}
        className="h-full w-full"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <FitBounds churches={churches} />
        {churches
          .filter((ch) => ch.latitude && ch.longitude)
          .map((ch) => (
            <Marker
              key={ch.id}
              position={[Number(ch.latitude), Number(ch.longitude)]}
              icon={churchIcon}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <p className="text-sm font-semibold">{ch.name}</p>
                  <p className="mt-1 text-xs text-[#9CA3AF]">
                    {ch.address || `${ch.city}, ${ch.country}`}
                  </p>
                  {ch.pastor_name && (
                    <p className="mt-1 text-xs text-[#9CA3AF]">Pastor: {ch.pastor_name}</p>
                  )}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${ch.latitude},${ch.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs font-medium text-[#D4AF61]"
                  >
                    Cómo llegar →
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </>
  )
}
