'use client';

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export interface ProjectMarker {
  id: number;
  title: string;
  client?: string;
  locationName: string;
  latitude: number;
  longitude: number;
  progress: number;
  status: string;
  category?: string;
  imageUrl?: string;
}

interface ProjectMapProps {
  projects: ProjectMarker[];
  onMarkerClick?: (project: ProjectMarker) => void;
  interactive?: boolean;
  onMapClick?: (lngLat: { lng: number; lat: number }) => void;
  selectedId?: number | null;
  height?: string;
  isDark?: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  planning: '#f59e0b',
  active: '#22c55e',
  on_hold: '#ef4444',
  completed: '#6366f1',
};

export default function ProjectMap({
  projects,
  onMarkerClick,
  interactive = true,
  onMapClick,
  selectedId,
  height = '400px',
  isDark = false,
}: ProjectMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapReady, setMapReady] = useState(false);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || map.current) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: isDark ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11',
      center: [106.845, -6.3], // Indonesia center (Jabodetabek area)
      zoom: 9,
      attributionControl: false,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      setMapReady(true);
    });

    if (onMapClick) {
      map.current.on('click', (e) => {
        onMapClick({ lng: e.lngLat.lng, lat: e.lngLat.lat });
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapboxToken]);

  // Update style when theme changes
  useEffect(() => {
    if (!map.current || !mapReady) return;
    map.current.setStyle(isDark ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11');
  }, [isDark, mapReady]);

  // Update markers when projects change
  useEffect(() => {
    if (!map.current || !mapReady) return;

    // Remove old markers
    markers.current.forEach((m) => m.remove());
    markers.current = [];

    // Add new markers
    const validProjects = projects.filter((p) => p.latitude && p.longitude);

    validProjects.forEach((project) => {
      const color = STATUS_COLORS[project.status] || '#6b7280';
      const isSelected = selectedId === project.id;
      const size = isSelected ? 16 : 12;

      // Simple clean dot marker
      const el = document.createElement('div');
      el.className = 'project-marker';
      el.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border: 2.5px solid white;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(0,0,0,0.35);
        transition: transform 0.2s;
      `;

      if (isSelected) {
        el.style.transform = 'scale(1.3)';
        el.style.boxShadow = `0 0 0 3px ${color}50, 0 2px 8px rgba(0,0,0,0.4)`;
      }

      // Popup content
      const popupHtml = `
        <div style="font-family: Inter, sans-serif; min-width: 200px;">
          ${project.imageUrl ? `<img src="${project.imageUrl}" style="width:100%;height:100px;object-fit:cover;border-radius:8px 8px 0 0;margin:-10px -10px 8px -10px;width:calc(100% + 20px);" />` : ''}
          <div style="font-weight:600;font-size:13px;margin-bottom:4px;">${project.title}</div>
          ${project.client ? `<div style="font-size:11px;color:#666;margin-bottom:6px;">${project.client}</div>` : ''}
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            <div style="flex:1;height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden;">
              <div style="width:${project.progress}%;height:100%;background:${color};border-radius:3px;"></div>
            </div>
            <span style="font-size:11px;font-weight:600;">${project.progress}%</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:10px;color:#888;">${project.locationName}</span>
            <span style="font-size:10px;padding:2px 6px;border-radius:4px;background:${color}20;color:${color};font-weight:500;">${project.status}</span>
          </div>
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: 15, maxWidth: '260px' }).setHTML(popupHtml);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([project.longitude, project.latitude])
        .setPopup(popup)
        .addTo(map.current!);

      if (onMarkerClick) {
        el.addEventListener('click', () => onMarkerClick(project));
      }

      markers.current.push(marker);
    });

    // Fit bounds to show all markers
    if (validProjects.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      validProjects.forEach((p) => bounds.extend([p.longitude, p.latitude]));
      map.current.fitBounds(bounds, { padding: 60, maxZoom: 13 });
    } else if (validProjects.length === 1) {
      map.current.flyTo({
        center: [validProjects[0].longitude, validProjects[0].latitude],
        zoom: 13,
      });
    }
  }, [projects, mapReady, selectedId, onMarkerClick]);

  if (!mapboxToken) {
    return (
      <div
        style={{ height }}
        className={`rounded-xl flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}
      >
        <div className="text-center p-6">
          <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Map unavailable
          </p>
          <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Set NEXT_PUBLIC_MAPBOX_TOKEN to enable the interactive map
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapContainer}
      style={{ height, width: '100%' }}
      className="rounded-xl overflow-hidden"
    />
  );
}
