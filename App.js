import React, { useState } from 'react';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [numberId, setNumberId] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Replace this token with your actual token
  const token = 'your_access_token_here';

  const fetchAverage = async () => {
    if (!numberId.trim()) {
      setError('Please enter a valid ID');
      return;
    }

    setLoading(true);
    setError('');
    setResponseData(null);

    try {
      const response = await fetch(`http://localhost:9876/numbers/${numberId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setResponseData(data);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Average Calculator (React)</h2>
      <label htmlFor="numberId">Enter ID (e, p, f, r):</label>
      <input
        type="text"
        id="numberId"
        value={numberId}
        onChange={(e) => setNumberId(e.target.value)}
        placeholder="e.g. p"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={fetchAverage}
      >
        Get Average
      </motion.button>

      <AnimatePresence>
        {loading && (
          <motion.p
            key="loading"
            className="status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Loading...
          </motion.p>
        )}
        {error && (
          <motion.p
            key="error"
            className="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {error}
          </motion.p>
        )}
        {responseData && (
          <motion.div
            key="response"
            className="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3>Response:</h3>
            <pre>{JSON.stringify(responseData, null, 2)}</pre>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default App;
