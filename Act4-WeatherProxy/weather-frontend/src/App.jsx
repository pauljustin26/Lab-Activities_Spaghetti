import { useState } from 'react';
import { FaSearch, FaCloudSun, FaCloudRain, FaSmog, FaSun } from 'react-icons/fa';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    setError('');
    setWeather(null);
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:3000/weather?city=${city}`);
      if (!res.ok) throw new Error('City not found');
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    const desc = condition.toLowerCase();
    if (desc.includes('rain')) return <FaCloudRain className="text-blue-300 text-6xl" />;
    if (desc.includes('cloud')) return <FaCloudSun className="text-yellow-300 text-6xl" />;
    if (desc.includes('clear')) return <FaSun className="text-yellow-400 text-6xl" />;
    return <FaSmog className="text-gray-300 text-6xl" />;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-500 via-indigo-600 to-blue-800 text-white p-6 font-sans">
      
      <h1 className="text-5xl font-extrabold mb-8 drop-shadow-lg text-center">
        🌤️ Weather Proxy
      </h1>

      <div className="bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-md border border-white/20 transition transform hover:scale-[1.02]">
        
        {/* Search Box */}
        <div className="flex items-center bg-white/20 rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') fetchWeather();
            }}
            className="w-full px-4 py-2 bg-transparent text-white placeholder-gray-300 focus:outline-none"
          />
          <button
            onClick={fetchWeather}
            className="p-3 bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition flex items-center justify-center"
          >
            <FaSearch />
          </button>
        </div>

        {/* Error */}
        {error && <p className="text-red-300 mt-4 text-center">{error}</p>}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center mt-6">
            <div className="w-8 h-8 border-4 border-yellow-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Weather Card */}
        {weather && !loading && (
          <div className="mt-8 text-center">
            <div className="flex justify-center mb-4">{getWeatherIcon(weather.condition)}</div>
            <h2 className="text-3xl font-bold">{weather.city}</h2>
            <p className="text-6xl font-extrabold mt-2">{weather.temperature}°C</p>
            <p className="text-lg capitalize mt-2 text-gray-200">{weather.condition}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="mt-8 text-sm text-gray-200 opacity-80">
        Made with React + TailwindCSS + NestJS
      </p>
    </div>
  );
}

export default App;
