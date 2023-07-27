import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  // State or other logic can be defined here
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect hook starts here
  useEffect(() => {
    // Create a signal for the fetch request to enable cancellation
    const abortController = new AbortController();
    const signal = abortController.signal;

    // Replace this with your actual API call logic
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.example.com/data/${count}`, { signal });
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        if (!signal.aborted) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function to cancel any ongoing API requests when the component unmounts
    return () => {
      abortController.abort();
    };
  }, [count]);

  // Component rendering and logic continue here

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyComponent;
