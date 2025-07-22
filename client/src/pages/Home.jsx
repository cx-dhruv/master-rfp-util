import { useState, useEffect } from 'react';
import { getModules, mergeTemplate } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [modules, setModules] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getModules().then(res => setModules(res.data));
  }, []);

  const toggleModule = (module) => {
    setSelected((prev) =>
      prev.includes(module)
        ? prev.filter((m) => m !== module)
        : [...prev, module]
    );
  };

  const handleGenerate = async () => {
    const res = await mergeTemplate(selected);
    localStorage.setItem('mergedTemplate', JSON.stringify(res.data));
    navigate('/editor');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Select Modules</h1>
      <div className="flex flex-wrap gap-3 mb-6">
        {modules.map((mod) => (
          <button
            key={mod}
            onClick={() => toggleModule(mod)}
            className={`px-4 py-2 rounded border ${selected.includes(mod)
              ? 'bg-blue-500 text-white'
              : 'bg-white text-black'
            }`}
          >
            {mod}
          </button>
        ))}
      </div>
      <button
        onClick={handleGenerate}
        disabled={selected.length === 0}
        className="bg-green-600 text-white px-6 py-2 rounded disabled:opacity-50"
      >
        Generate Template
      </button>
    </div>
  );
}
