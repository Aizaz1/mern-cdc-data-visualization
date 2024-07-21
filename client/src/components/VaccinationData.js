// src/components/VaccinationData.js
import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/api';

const VaccinationData = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData(filters);
      setData(result);
    };
    getData();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h1>Vaccination Data</h1>
      <form>
        <label>
          Jurisdiction:
          <input type="text" name="jurisdiction" onChange={handleFilterChange} />
        </label>
        <label>
          Vaccination Status:
          <input type="text" name="vaccination_status" onChange={handleFilterChange} />
        </label>
        <button type="submit">Apply Filters</button>
      </form>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default VaccinationData;
