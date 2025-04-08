import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!username.trim()) return alert('Please enter a username');
    setLoading(true);
    try {
      const res = await fetch(`/api/instagram/${username}`);
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      alert('Error fetching profile data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAnalyze();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '600px', margin: 'auto' }}>
      <h1>InstaAnalyzer</h1>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter Instagram username"
          style={{
            padding: '10px',
            width: '70%',
            fontSize: '16px',
            marginRight: '10px',
          }}
        />
        <button onClick={handleAnalyze} style={{ padding: '10px 20px', fontSize: '16px' }}>
          {loading ? 'Loading...' : 'Analyze'}
        </button>
      </div>

      {data && (
        <div style={{ marginTop: '30px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
          <h2>Results for @{data.id.username}</h2>
          <p><strong>Name:</strong> {data.id.display_name}</p>
          <p><strong>Followers:</strong> {data.statistics.total.followers.toLocaleString()}</p>
          <p><strong>Following:</strong> {data.statistics.total.following.toLocaleString()}</p>
          <p><strong>Engagement Rate:</strong> {data.statistics.total.engagement_rate.toFixed(2)}%</p>
          <p><strong>Verified:</strong> {data.misc.sb_verified ? 'Yes' : 'No'}</p>
          <p><strong>Grade:</strong> <span style={{ color: data.misc.grade.color }}>{data.misc.grade.grade}</span></p>
          <p><strong>Growth (Last 1 Day):</strong> {data.statistics.growth.followers[1]} followers</p>
          <p><strong>Growth (Last 3 Days):</strong> {data.statistics.growth.followers[3]} followers</p>
          <p><strong>Growth (Last 7 Days):</strong> {data.statistics.growth.followers[7]} followers</p>
          <p><strong>Growth (Last 30 Days):</strong> {data.statistics.growth.followers[30]} followers</p>
          <p><strong>Growth (Last 365 Days):</strong> {data.statistics.growth.followers[365]} followers</p>
          
          <h3>Daily Stats:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {data.daily.map((entry, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #ccc',
                  padding: '15px',
                  width: '280px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <p><strong>Date:</strong> {entry.date}</p>
                <p><strong>Followers:</strong> {entry.followers.toLocaleString()}</p>
                <p><strong>Following:</strong> {entry.following.toLocaleString()}</p>
                <p><strong>Media Count:</strong> {entry.media}</p>
                <p><strong>Avg Likes:</strong> {entry.avg_likes}</p>
                <p><strong>Avg Comments:</strong> {entry.avg_comments}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
