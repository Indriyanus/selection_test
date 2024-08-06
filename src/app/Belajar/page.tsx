"use client"

import React, { useEffect, useState } from "react"

const Belajar: React.FC = () => {
    const [data, setData] = useState<Record<string, string>[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setData(data);
                setLoading(false);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred");
                }
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {data.map(user => (
                <div key={user.id}>
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <p>{user.website}</p>
                </div>
            ))}
        </div>
    );
};

export default Belajar;
