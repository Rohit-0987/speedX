import React, { useState } from 'react';
import InputForm from './components/InputForm';
import PerformanceMetrics from './components/PerformanceMetrics';

const App = () => {
  const [metrics, setMetrics] = useState(null);

  return (
    <div >
      <h1 className='my-16 text-center text-2xl text-white font-bold'>SpeedX - Website Performance Analyzer</h1>
      <InputForm setMetrics={setMetrics} />
      <PerformanceMetrics metrics={metrics} />
    </div>
  );
};

export default App;
