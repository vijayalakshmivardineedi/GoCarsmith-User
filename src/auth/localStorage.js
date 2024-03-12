import React, { useState, useEffect } from 'react';

const LocalStorageController = () => {
  // State to store localStorage data
  const [localStorageData, setLocalStorageData] = useState(null);

  // Function to get all localStorage data
  const getAllLocalStorageData = () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      data[key] = value;
    }
    setLocalStorageData(data);
  };

  // useEffect to get localStorage data on component mount
  useEffect(() => {
    getAllLocalStorageData();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <h1>Local Storage Data</h1>
      {localStorageData ? (
        <ul>
          {Object.entries(localStorageData).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data in localStorage</p>
      )}
    </div>
  );
};

export default LocalStorageController;
