import React from 'react';

async function fetchSnacks(apiKey) {
    const res = await fetch('https://snacks-api.vercel.app', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
        },
    });
    if (!res.ok) {
        throw new Error('Failed to fetch snacks');
    }
    return res.json();
}
// Page component (Server Component)
export default async function Page() {
    const apiKey = process.env.NEXT_PUBLIC_ADMIN_API_KEY;
    console.log('API Key:', apiKey);

    let snacks = [];
    let error = null;
    try {
        snacks = await fetchSnacks(apiKey);
    } catch (err) {
        error = err.message;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div className="container">
            <h1 className="snack-list-title">Snack List</h1>
            <ul className="snack-list">
                {snacks.length > 0 ? (
                    snacks.map(snack => (
                        <li key={snack.id}>
                            <h3>{snack.name}</h3>
                            <p>{snack.description}</p>
                            <span>${snack.price.toFixed(2)}</span> 
                        </li>
                    ))
                ) : (
                    <li>No snacks available.</li>
                )}
            </ul>
        </div>
    );
}
