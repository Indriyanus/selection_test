
"use client";

import React, { useEffect, useState } from "react";

const Alphabets: React.FC = () => {

  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alphabetCount, setAlphabetCount] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch(
          "https://www.random.org/strings/?num=10&len=32&upperalpha=on&unique=off&format=plain"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.text();
        const stringsArray = result.trim().split("\n");
        setData(stringsArray);

        const countAlphabets = (str: string) => {
          const counts: Record<string, number> = {};
          for (const char of str) {
            if (char >= 'A' && char <= 'Z') {
              counts[char] = (counts[char] || 0) + 1;
            }
          }
          return counts;
        };

        const combinedCounts = stringsArray.reduce((acc, str) => {
          const counts = countAlphabets(str);
          for (const [char, count] of Object.entries(counts)) {
            acc[char] = (acc[char] || 0) + count;
          }
          return acc;
        }, {} as Record<string, number>);

        setAlphabetCount(combinedCounts);

      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ color: '#333' }}>Fetched Strings:</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {data.map((str, index) => (
                <li key={index} style={{ backgroundColor: '#f4f4f4', padding: '10px', margin: '5px 0', borderRadius: '5px' }}>
                  {str}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 style={{ color: '#333' }}>Alphabet Count:</h2>
            <ul style={{ listStyleType: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((char) => (
                <li key={char} style={{ backgroundColor: '#e8e8e8', padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
                  {char}: {alphabetCount[char] || 0}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Alphabets;
