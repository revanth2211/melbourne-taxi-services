'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const router = useRouter();

  useEffect(() => {
    const waitForGoogleMaps = () => {
      if (
        typeof window !== 'undefined' &&
        (window as any).google?.maps?.places
      ) {
        const pickupInput = document.getElementById('pickup') as HTMLInputElement;
        const dropoffInput = document.getElementById('dropoff') as HTMLInputElement;

        if (pickupInput) new (window as any).google.maps.places.Autocomplete(pickupInput);
        if (dropoffInput) new (window as any).google.maps.places.Autocomplete(dropoffInput);
      } else {
        setTimeout(waitForGoogleMaps, 300);
      }
    };

    waitForGoogleMaps();
  }, []);

  const handleContinue = () => {
    if (pickup && dropoff) {
      localStorage.setItem('pickup', pickup);
      localStorage.setItem('dropoff', dropoff);
      router.push('/ride-options');
    } else {
      alert('Please enter both pickup and drop-off locations');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">
      <img
        src="/logo.png"
        alt="Safe Taxi"
        className="w-80 h-auto mb-6"
      />

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-md">
        <input
          id="pickup"
          type="text"
          placeholder="Pickup Location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded text-black"
        />

        <input
          id="dropoff"
          type="text"
          placeholder="Drop-off Location"
          value={dropoff}
          onChange={(e) => setDropoff(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded text-black"
        />

        <button
          onClick={handleContinue}
          disabled={!pickup || !dropoff}
          className={`w-full p-3 rounded text-white text-lg font-semibold transition ${
            pickup && dropoff ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </main>
  );
}
