'use client'

import { useState, useCallback } from 'react'

interface Coordinates {
  latitude: number
  longitude: number
}

export function useGeolocation() {
  const [location, setLocation] = useState<Coordinates | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const requestLocation = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Try Capacitor first (native app)
      const { Geolocation } = await import('@capacitor/geolocation').catch(() => ({ Geolocation: null }))

      if (Geolocation) {
        const permission = await Geolocation.requestPermissions()
        if (permission.location === 'granted') {
          const pos = await Geolocation.getCurrentPosition()
          const coords = { latitude: pos.coords.latitude, longitude: pos.coords.longitude }
          setLocation(coords)
          setLoading(false)
          return coords
        }
      }

      // Fallback to browser API
      return new Promise<Coordinates>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords = { latitude: pos.coords.latitude, longitude: pos.coords.longitude }
            setLocation(coords)
            setLoading(false)
            resolve(coords)
          },
          (err) => {
            setError(err.message)
            setLoading(false)
            reject(err)
          },
          { enableHighAccuracy: true, timeout: 10000 }
        )
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error obteniendo ubicación'
      setError(message)
      setLoading(false)
      throw err
    }
  }, [])

  return { location, error, loading, requestLocation }
}
