"use client";

import React, { useEffect, useState } from "react";

interface ApiResponse {
  error: boolean;
  message: string;
  data: {
    number: {
      typeTwo: string;
    };
  };
}

const Dominoes: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [originalData, setOriginalData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inputNumber, setInputNumber] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://pwd-selectiontest-api.vercel.app/domino/array-type-two", {
          headers: {
            auth: "JCwd",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result: ApiResponse = await response.json();
        setData(result);
        setOriginalData(result);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNumber(e.target.value);
  };

  const handleRemove = () => {
    if (data) {
      const filteredData = data.data.number.typeTwo
        .split(", ")
        .filter(num => num !== inputNumber);

      setData({
        ...data,
        data: {
          ...data.data,
          number: {
            ...data.data.number,
            typeTwo: filteredData.join(", "),
          },
        },
      });

      setInputNumber("");
    }
  };

  const handleSortAsc = () => {
    if (data) {
      const sortedData = [...data.data.number.typeTwo.split(", ")].sort((a, b) => {
        const [a1, a2] = a.split("-").map(Number);
        const [b1, b2] = b.split("-").map(Number);
        return (a1 + a2) - (b1 + b2);
      });
      setData({
        ...data,
        data: {
          ...data.data,
          number: {
            ...data.data.number,
            typeTwo: sortedData.join(", "),
          },
        },
      });
    }
  };

  const handleSortDesc = () => {
    if (data) {
      const sortedData = [...data.data.number.typeTwo.split(", ")].sort((a, b) => {
        const [a1, a2] = a.split("-").map(Number);
        const [b1, b2] = b.split("-").map(Number);
        return (b1 + b2) - (a1 + a2);
      });
      setData({
        ...data,
        data: {
          ...data.data,
          number: {
            ...data.data.number,
            typeTwo: sortedData.join(", "),
          },
        },
      });
    }
  };

  const handleFlip = () => {
    if (data) {
      const flippedData = data.data.number.typeTwo.split(", ").map(num => {
        const [top, bottom] = num.split("-");
        return `${bottom}-${top}`;
      });
      setData({
        ...data,
        data: {
          ...data.data,
          number: {
            ...data.data.number,
            typeTwo: flippedData.join(", "),
          },
        },
      });
    }
  };

  const handleRemoveDup = () => {
    if (data) {
      const uniqueData = Array.from(new Set(data.data.number.typeTwo.split(", ")));
      setData({
        ...data,
        data: {
          ...data.data,
          number: {
            ...data.data.number,
            typeTwo: uniqueData.join(", "),
          },
        },
      });
    }
  };

  const handleReset = () => {
    if (originalData) {
      setData(originalData);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold mb-4 text-center">Dominoes</h1>
        <h2 className="text-xl mb-2 text-center">Source</h2>
        <div className="mb-4 text-center">
          {data && (
            <>
              <p><strong>Numbers:</strong> {data.data.number.typeTwo}</p>
            </>
          )}
        </div>
        <div className="mb-4">
          <h3 className="text-lg mb-2 text-center justify-center mx-auto">Double Numbers</h3>
          <div className="grid grid-cols-5 gap-2 justify-center mx-auto ">
            {data && data.data.number.typeTwo.split(", ").map((num, index) => {
              const [top, bottom] = num.split("-");
              return (
                <div key={index} className="border p-2 flex flex-col items-center justify-center rounded-lg shadow-sm">
                  <span>{top}</span>
                  <span>-</span>
                  <span>{bottom}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex gap-4 py-4 justify-center">
          <button className="bg-blue-500 text-white p-2 rounded shadow-lg" onClick={handleSortAsc}>
            Sort (ASC)
          </button>
          <button className="bg-blue-500 text-white p-2 rounded shadow-lg" onClick={handleSortDesc}>
            Sort (DESC)
          </button>
          <button className="bg-blue-500 text-white p-2 rounded shadow-lg" onClick={handleFlip}>
            Flip
          </button>
          <button className="bg-blue-500 text-white p-2 rounded shadow-lg" onClick={handleRemoveDup}>
            Remove Dup
          </button>
          <button className="bg-blue-500 text-white p-2 rounded shadow-lg" onClick={handleReset}>
            Reset
          </button>
        </div>
        <div className="mt-4 flex flex-col items-center">
          <input
            type="text"
            value={inputNumber}
            onChange={handleInputChange}
            className="w-full p-2 rounded-lg bg-gray-200 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            placeholder="Input Number"
          />
          <button className="bg-red-500 text-white p-2 rounded shadow-lg" onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dominoes;