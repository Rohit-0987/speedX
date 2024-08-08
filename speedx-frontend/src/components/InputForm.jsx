import React, { useState } from 'react';
import axios from 'axios';

const InputForm = ({ setMetrics }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/analyze', { url });
      setMetrics(response.data);
    } catch (error) {
      setError('Error fetching performance data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-1/2 space-x-8 mx-auto'>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter website URL"
        required
        className="input input-bordered w-full max-w-xs ml-40"
      />
      <button type="submit"  className="btn btn-active btn-primary " disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default InputForm;
