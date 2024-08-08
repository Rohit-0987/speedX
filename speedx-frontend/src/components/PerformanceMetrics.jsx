import React from 'react';

const PerformanceMetrics = ({ metrics }) => {
  if (!metrics) return null;

  return (
    <>
    <div className='mx-auto w-1/2'>
      <div className="stats stats-vertical lg:stats-horizontal shadow my-10">
        <div className="stat">
          <div className="stat-title">Page Load Time</div>
          <div className="stat-value">{metrics.pageLoadTime} ms</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Request Size</div>
          <div className="stat-value">{metrics.totalRequestSize} bytes</div>
        </div>

        <div className="stat">
          <div className="stat-title">Number of Requests</div>
          <div className="stat-value">{metrics.numberOfRequests}</div>
        </div>
        <div className="stat">
          <div className="stat-title">First Contentful Paint</div>
          <div className="stat-value">{metrics.fcp ? `${metrics.fcp} ms` : 'N/A'}</div>
        </div>
        
      </div>
      <div className="stats stats-vertical lg:stats-horizontal shadow ">
      <div className="stat">
          <div className="stat-title">Largest Contentful Paint</div>
          <div className="stat-value">{metrics.lcp ? `${metrics.lcp} ms` : 'N/A'}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Cumulative Layout Shift</div>
          <div className="stat-value">{metrics.cls}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Time to Interactive</div>
          <div className="stat-value">{metrics.tti ? `${metrics.tti} ms` : 'N/A'}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Blocking Time</div>
          <div className="stat-value">{metrics.tbt} ms</div>
        </div>
      </div>
    </div>  
    </>
  );
};

export default PerformanceMetrics;
