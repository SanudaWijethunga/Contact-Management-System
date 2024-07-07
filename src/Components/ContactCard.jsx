import React from 'react';
import './ContactCard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';

export default function ContactCard(props) {
  const { id, firstName, lastName, email, status, phoneNumber } = props.contact;
  const navigate = useNavigate();

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const formatPhoneNumber = (num) => {
    if (num.length === 11) {
      return `+${num.slice(0, 4)}  ${num.slice(4, 8)} ${num.slice(8, 12)}`;
    }
    else{
      return `+${num.slice(0, 4)}  ${num.slice(4, 8)} ${num.slice(8, 12)}`;
    }
  };

  return (
    <div className='card'>
      <div className="content">
        <img src="src/Images/avatar.png" alt="profile-icon" />
        <div className="contact-info">
          <div className="heading">
            <span>{capitalize(firstName)} {capitalize(lastName)}</span>
            <span> - {status}</span>
          </div>
          <div className='email'>{email}</div>
          <div className='phone'>{formatPhoneNumber(phoneNumber)}</div>
        </div>
        <div className="icons">
          <div className="edit-icon" onClick={() => navigate(`/EditContact/${id}`)}>
            <i className='fas fa-edit'></i>
          </div>
          <div className="trash-icon" onClick={() => props.deleteContact(id)}>
            <i className='fas fa-trash'></i>
          </div>
        </div>
      </div>
    </div>
  );
}
