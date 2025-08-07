import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export const ConvertCSVtoJson = () => {
  const [airportData, setAirportData] = useState([]);

  useEffect(() => {
    const loadAirportData = async () => {
      const response = await fetch(`/airports.csv`);
      const csvText = await response.text();
      Papa.parse(csvText, {
        header: true,
        complete: (result) => {
          setAirportData(result.data);
        },
        error: (error) => {
          console.error('Error loading CSV: ', error);
        },
      });
    };

    loadAirportData();
  }, []);

  return airportData;
};
