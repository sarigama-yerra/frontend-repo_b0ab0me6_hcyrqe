import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

export default function CityPicker({ onSelect }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/cities`);
        const data = await res.json();
        setCities(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-white/80 mb-2">Select a city</label>
      <div className="relative">
        <select
          onChange={(e) => onSelect(e.target.value)}
          className="w-full appearance-none bg-white/10 text-white backdrop-blur rounded-xl px-4 py-3 pr-10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400/60"
        >
          <option value="" className="text-black">Choose…</option>
          {!loading && cities.map(c => (
            <option key={c.slug} value={c.slug} className="text-black">{c.name}, {c.country}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">▾</div>
      </div>
    </div>
  );
}
