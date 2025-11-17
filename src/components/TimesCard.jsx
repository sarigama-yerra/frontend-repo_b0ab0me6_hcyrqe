import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

export default function TimesCard({ city }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      if (!city) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/shabbat?city=${city}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const d = await res.json();
        setData(d);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [city]);

  if (!city) return null;

  return (
    <div className="mt-6 bg-white rounded-2xl shadow/20 shadow-black/10 p-6 md:p-8 border border-black/5">
      {loading && <div className="text-gray-500">Loading…</div>}
      {error && <div className="text-red-600">{error}</div>}
      {data && (
        <div className="grid md:grid-cols-3 gap-6 items-end">
          <div>
            <div className="text-sm uppercase tracking-wide text-gray-500">City</div>
            <div className="text-2xl font-semibold">{data.city.name}</div>
            <div className="text-gray-500">{data.city.country}</div>
          </div>
          <div>
            <div className="text-sm uppercase tracking-wide text-gray-500">Candle Lighting</div>
            <div className="text-3xl font-medium text-yellow-600">{data.candle_lighting || '—'}</div>
          </div>
          <div>
            <div className="text-sm uppercase tracking-wide text-gray-500">Havdalah</div>
            <div className="text-3xl font-medium text-sky-700">{data.havdalah || '—'}</div>
          </div>
          {data.parsha && (
            <div className="md:col-span-3 pt-4 text-gray-700">
              Parsha: <span className="font-medium">{data.parsha}</span>
            </div>
          )}
          <div className="md:col-span-3 text-xs text-gray-400">Source: {data.source}</div>
        </div>
      )}
    </div>
  );
}
