import { useEffect, useState } from 'react';
import api from '../context/AuthContext';

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await api.get('/properties');
        setProperties(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div className="max-w-7xl mx-auto p-8 text-slate-300">Loading listings...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-white mb-8">Available properties</h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property._id} className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
            <img src={property.image || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80'} alt={property.title} className="h-52 w-full object-cover" />
            <div className="p-5">
              <p className="text-cyan-400 font-semibold">{property.type}</p>
              <h3 className="text-2xl font-bold text-white mt-2">{property.title}</h3>
              <p className="text-slate-300 mt-2">{property.location}</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xl font-bold text-cyan-400">${Number(property.price).toLocaleString()}</p>
                <span className="text-xs text-slate-300">{property.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
