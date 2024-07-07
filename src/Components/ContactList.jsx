import React, { useState } from 'react';
import './ContactList.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ContactCard from './ContactCard';
import { useNavigate } from 'react-router-dom';

export default function ContactList(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredContacts = props.contacts.filter((contact) =>
    `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderList = filteredContacts.map((contact, index) => {
    return (
      <ContactCard 
        key={index} 
        contact={contact} 
        deleteContact={props.deleteContact} 
      />
    );
  });

  return (
    <div className='all-items'>
      <div className="header">
        <h1>Contact List</h1>
        <button onClick={() => navigate('/AddContact')}>New Contact</button>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search your contacts..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="no-contact">
        {filteredContacts.length > 0 ? (
          renderList
        ) : (
          <p>No contacts available. Please add a contact.</p>
        )}
      </div>
    </div>
  );
}
