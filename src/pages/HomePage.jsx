import { useEffect, useState } from 'react';
import api from '../context/AuthContext';

const defaultImage = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80';

export default function PropertyCard({ property }) {
  return (
    <article className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-white/10">
      <img src={property.image || defaultImage} alt={property.title} className="h-52 w-full object-cover" />
      <div className="p-5">
        <div className="flex items-center justify-between text-sm text-cyan-300">
          <span>{property.type}</span>
          <span className="px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-300">{property.status}</span>
        </div>

        <h3 className="mt-3 text-xl font-semibold text-white">{property.title}</h3>
        <p className="mt-2 text-slate-300">{property.location}</p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-cyan-400">${Number(property.price).toLocaleString()}</p>
            <p className="text-xs text-slate-400">{property.area || 0} sq ft</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-white text-slate-950 font-medium hover:bg-slate-200">
            View Details
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3 text-sm text-slate-300">
          <span>{property.bedrooms || 0} Beds</span>
          <span>•</span>
          <span>{property.bathrooms || 0} Baths</span>
        </div>
      </div>
    </article>
  );
}

export function HomePage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await api.get('/properties');
        setProperties(data);
      } catch (error) {
        console.error('Failed to load properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <p className="text-cyan-400 font-semibold uppercase tracking-[0.2em] text-xs">Smart real estate</p>
            <h1 className="mt-4 text-5xl md:text-6xl font-bold leading-tight">
              Find the right home in the right city.
            </h1>
            <p className="mt-5 text-lg text-slate-300">
              Discover premium homes, local agents, and neighborhood insights with a faster buying and renting experience.
            </p>
            <div className="mt-8 flex gap-4">
              <button className="px-6 py-3 rounded-lg bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400">Explore Listings</button>
              <button className="px-6 py-3 rounded-lg border border-white/20 text-white hover:bg-white/5">List Your Property</button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-cyan-400 uppercase text-xs tracking-[0.2em] font-semibold">Featured homes</p>
            <h2 className="text-3xl font-bold text-white mt-2">Popular properties</h2>
          </div>
        </div>

        {loading ? (
          <div className="text-slate-300">Loading properties...</div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {properties.slice(0, 6).map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
