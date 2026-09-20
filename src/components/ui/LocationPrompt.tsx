"use client";

import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "ghousia-delivery-address";

export default function LocationPrompt() {
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(true);

  // On first render, check if address already saved
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setShow(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value.trim());
  };

  const handleSave = () => {
    if (address.length >= 3) {
      localStorage.setItem(LOCAL_STORAGE_KEY, address);
      setShow(false);
    }
  };

  const error = address.length > 0 && address.length < 3 ? "Address must be at least 3 characters" : "";

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      style={{ overflow: "hidden" }}
    >
      <div className="bg-white rounded-xl p-8 max-w-sm w-full mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Select your location</h2>
        <p className="text-gray-600 mb-6">
          Please enter your delivery address so we can prepare your order.
        </p>
        <div className="mb-6">
          <label htmlFor="delivery-address" className="sr-only">
            Delivery address
          </label>
          {error && (
            <p id="address-error" className="text-sm text-red-500 mb-2" role="alert">
              {error}
            </p>
          )}
          <input
            id="delivery-address"
            type="text"
            value={address}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gradient-start"
            placeholder="Block 3, Federal B Area, Hussainabad..."
            required
            autoFocus
            aria-describedby={error ? "address-error" : undefined}
          />
        </div>
        <div className="flex justify-center gap-2">
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            disabled={address.trim().length < 3}
          >
            Save Address
          </button>
          <button
            onClick={() => setShow(false)}
            className="ml-2 border border-gray-300 text-sm rounded-lg px-4 py-1 text-gray-700"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}