"use client"

import React, { useState } from 'react';

export default function Page() {
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");

    // TODO: This seems to be not correct as localhost is hard coded
    // Please reivew with Product Owner 

    const addUser = async () => {
        let result = await fetch('http://localhost:3000/api/project', {
            method: "POST",
            body: JSON.stringify({ name, lastname })
        });
        
        if (result.ok) {
            let data = await result.json();
            if (data.success) {
                alert("User added successfully");
            } else {
                alert("Failed to add user");
            }
        } else {
            alert("Failed to communicate with server");
        }
    }

    return (
        <div>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
            <input type='text' value={lastname} onChange={(e) => setLastName(e.target.value)} placeholder='LastName' />
            <button onClick={addUser}>Add User</button>
        </div>
    );
}
