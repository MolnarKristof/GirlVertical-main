import React, { useEffect, useState } from 'react';
import './GirlList.css';

function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/users')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Ellenőrizd a konzolon, hogy a szerver válasza helyes-e
                setUsers(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <a href="/upload" id="uploadbtn">Upload Data</a>
            <h1>GirlVertical List</h1>
            <div className="container" id="users-container">
                {users.map(user => (
                    <div key={user._id} className="card">
                        {/* Ellenőrizzük, hogy a kepek tömb nem üres, és a kép formátuma helyes */}
                        {user.images && user.images.length > 0 && (
                            <img src={user.images[0]} alt="Fetched from server" />
                        )}
                        <h2>{user.nev}</h2>
                        <p>Kor: {user.kor}</p>
                        <p>Lakhely: {user.lakhely}</p>
                        <p>
                            <a href={`https://instagram.com/${user.instagram}`} target="_blank" rel="noopener noreferrer">
                                {user.instagram}
                            </a>
                        </p>
                        <p>{user.leiras}</p>
                        <p>Singli: {user.singli ? 'Igen' : 'Nem'}</p>
                        <p>Hajszín: {user.hajszin}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
