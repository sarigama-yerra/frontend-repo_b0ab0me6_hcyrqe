import { useState } from 'react';
import Hero from './components/Hero';
import CityPicker from './components/CityPicker';
import TimesCard from './components/TimesCard';

function App() {
  const [selected, setSelected] = useState('');

  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />

      <main className="relative -mt-12 md:-mt-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white/5 backdrop-blur rounded-2xl p-6 md:p-8 border border-white/10">
            <CityPicker onSelect={setSelected} />
            <TimesCard city={selected} />
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 opacity-80">
            <div className="h-24 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-200/10" />
            <div className="h-24 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-200/10" />
            <div className="h-24 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-200/10" />
          </div>
        </div>
      </main>

      <footer className="mt-20 py-10 text-center text-white/50 text-sm">
        Built with a calming, minimal aesthetic.
      </footer>
    </div>
  );
}

export default App;
