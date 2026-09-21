"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { MapPin, Target } from "lucide-react";

interface MapPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialLat?: number;
  initialLng?: number;
}

export default function MapPicker({ onLocationSelect, initialLat = 24.9, initialLng = 67.0 }: MapPickerProps) {
  const [lat, setLat] = useState(initialLat);
  const [lng, setLng] = useState(initialLng);
  const [markerPlaced, setMarkerPlaced] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(pos.coords.latitude);
          setLng(pos.coords.longitude);
          onLocationSelect(pos.coords.latitude, pos.coords.longitude);
          setMarkerPlaced(true);
        },
        () => {},
        { enableHighAccuracy: false, timeout: 5000 }
      );
    }
  }, [onLocationSelect]);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const newLat = initialLat + (y - 0.5) * 0.5;
    const newLng = initialLng + (x - 0.5) * 0.5;
    setLat(newLat);
    setLng(newLng);
    setMarkerPlaced(true);
    onLocationSelect(newLat, newLng);
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(pos.coords.latitude);
          setLng(pos.coords.longitude);
          onLocationSelect(pos.coords.latitude, pos.coords.longitude);
          setMarkerPlaced(true);
        },
        () => {},
        { enableHighAccuracy: false, timeout: 5000 }
      );
    }
  };

  const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=14&output=embed`;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold">Select Location on Map</h3>

      <div
        ref={mapRef}
        onClick={handleMapClick}
        className="relative w-full h-48 sm:h-56 md:h-64 bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden cursor-crosshair border-2 border-dashed border-gray-400 dark:border-gray-600"
      >
        <iframe
          src={mapUrl}
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
        {markerPlaced && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg -translate-x-1/2 -translate-y-1/2"
            style={{ left: "50%", top: "50%" }}
          >
            <MapPin className="w-5 h-5 text-white fill-white" />
          </motion.div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium">Selected:</span> {lat.toFixed(4)}, {lng.toFixed(4)}
        </div>
        <button
          onClick={handleUseMyLocation}
          className="flex items-center gap-1 px-4 py-2.5 text-sm font-semibold rounded-full bg-linear-to-r from-gradient-start to-gradient-end text-white hover:opacity-90 transition-opacity"
        >
          <Target className="w-3 h-3" /> Use My Location
        </button>
      </div>
    </div>
  );
}
