import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '@/hooks/useLocations';

interface LocationMapProps {
  locations: Location[];
  onMarkerClick: (location: Location) => void;
  selectedLocation?: Location | null;
}

const getMarkerColor = (status: string): string => {
  switch (status) {
    case 'HIGH':
      return '#ef4444'; // red
    case 'MODERATE':
      return '#eab308'; // yellow
    case 'SAFE':
      return '#22c55e'; // green
    default:
      return '#6b7280'; // gray
  }
};

const createPulseMarkerIcon = (status: string) => {
  const color = getMarkerColor(status);
  const pulseClass = status.toLowerCase();
  
  return L.divIcon({
    className: `pulse-marker ${pulseClass}`,
    html: `
      <div style="
        width: 24px;
        height: 24px;
        background: ${color};
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        position: relative;
      ">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: ${color};
          opacity: 0.4;
          animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        "></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const LocationMap = ({ locations, onMarkerClick, selectedLocation }: LocationMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Initialize map centered on Jaipur, Rajasthan
    mapRef.current = L.map(containerRef.current, {
      center: [26.9124, 75.7873],
      zoom: 12,
      zoomControl: true,
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    locations.forEach((location) => {
      const marker = L.marker([location.latitude, location.longitude], {
        icon: createPulseMarkerIcon(location.current_status),
      })
        .addTo(mapRef.current!)
        .on('click', () => onMarkerClick(location));

      markersRef.current.push(marker);
    });
  }, [locations, onMarkerClick]);

  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      mapRef.current.flyTo([selectedLocation.latitude, selectedLocation.longitude], 14, {
        duration: 0.5,
      });
    }
  }, [selectedLocation]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[400px] rounded-lg overflow-hidden"
      style={{ zIndex: 0 }}
    />
  );
};

export default LocationMap;
