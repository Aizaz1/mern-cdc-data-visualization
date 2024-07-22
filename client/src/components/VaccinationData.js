// src/components/VaccinationData.js
import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/api';

const VaccinationData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>CDC Vaccination Data</h1>
      <table>
        <thead>
          <tr>
            <th>Jurisdiction</th>
            <th>Population Group</th>
            <th>Measure Type</th>
            <th>Measure Value</th>
            <th>Date Range</th>
            <th>Year</th>
            <th>Frequency</th>
            <th>Value</th>
            <th>Confidence Interval</th>
            <th>Sample Size</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.jurisdiction}</td>
              <td>{item.population_group}</td>
              <td>{item.measure_type}</td>
              <td>{item.measure_value}</td>
              <td>{item.date_range}</td>
              <td>{item.year}</td>
              <td>{item.frequency}</td>
              <td>{item.value}</td>
              <td>{item.confidence_interval}</td>
              <td>{item.sample_size}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VaccinationData;
