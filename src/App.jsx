import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import AddContact from './Components/AddContact';
import EditContact from './Components/EditContact';
import ContactList from './Components/ContactList';
import Header from './Components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

function App() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const getAllContacts = async () => {
            const allContacts = await retrieveContacts();
            if (allContacts) setContacts(allContacts);
        };
        getAllContacts();
    }, []);

    const retrieveContacts = async () => {
        const response = await axios.get("http://localhost:3000/contacts");
        return response.data;
    };

    const handleAddContact = async (contact) => {
        const newContact = { id: uuidv4(), ...contact };
        const response = await axios.post("http://localhost:3000/contacts", newContact);
        setContacts([...contacts, response.data]);
    };

    const handleUpdateContact = async (contact) => {
        const response = await axios.put(`http://localhost:3000/contacts/${contact.id}`, contact);
        setContacts(contacts.map((c) => (c.id === contact.id ? { ...response.data } : c)));
    };

    const handleDeleteContact = async (id) => {
        await axios.delete(`http://localhost:3000/contacts/${id}`);
        const newContacts = contacts.filter(contact => contact.id !== id);
        setContacts(newContacts);
    };

    return (
        <Router>
            <Header />
            <Routes>
                <Route
                    path='/'
                    element={<ContactList contacts={contacts} deleteContact={handleDeleteContact} />}
                />
                <Route
                    path='/AddContact'
                    element={<AddContact addContact={handleAddContact} />}
                />
                <Route
                    path='/EditContact/:id'
                    element={<EditContact updateContact={handleUpdateContact} contacts={contacts} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
