import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddContact.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function AddContact(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('Mobile');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [valid, setValid] = useState(true);
    const [country, setCountry] = useState('lk');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const change = (input, countryData) => {
        const selectedCountry = countryData.countryCode;
        setCountry(selectedCountry);
        setPhoneNumber(input);

        const isValid = ValidatePhoneNumber(input, selectedCountry);
        setValid(isValid);
        setErrorMessage(isValid ? '' : 'Please enter a valid phone number.');
    };

    const ValidatePhoneNumber = (phoneNumber, country) => {
        if (country === 'lk') {
            return phoneNumber.length === 11;
        }
        return /^\d{11}$/.test(phoneNumber);
    };

    const add = (e) => {
        e.preventDefault();
        if (firstName === "" || lastName === "" || email === "" || status === "" || phoneNumber === "") {
            setErrorMessage("You have to fill all the fields.");
            return;
        }
        if (!valid) {
            setErrorMessage("Please enter a valid phone number.");
            return;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Please provide a valid email address.");
            return;
        }
    
        if (!email.endsWith('gmail.com')) {
            setErrorMessage("Please provide a valid email address.");
            return;
        }
    
        props.addContact({
            firstName,
            lastName,
            email,
            status,
            phoneNumber
        });
        setFirstName("");
        setLastName("");
        setEmail("");
        setStatus("Mobile");
        setPhoneNumber("");
        setErrorMessage('');
    
        navigate("/");
    };
    
    return (
        <div className="main">
            <h2>New Contact</h2>
            <form action="#" onSubmit={add}>
                <div className="section">
                    <label>First Name</label>
                    <input type="text" name="firstname" value={firstName} placeholder="Enter your first name here" onChange={(e) => setFirstName(e.target.value)} />

                    <label>Last Name</label>
                    <input type="text" name="lastname" value={lastName} placeholder="Enter your last name here" onChange={(e) => setLastName(e.target.value)} />

                    <label>Status</label>
                    <select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Mobile">Mobile</option>
                        <option value="Work">Work</option>
                        <option value="Main">Main</option>
                        <option value="Other">Other</option>
                    </select>

                    <label>Phone Number</label>
                    <PhoneInput
                        country={country}
                        value={phoneNumber}
                        onChange={change}
                        containerClass="phone-input"
                    />
                    <label>Email</label>
                    <input type="text" name="email" value={email} placeholder="Enter your email here" onChange={(e) => setEmail(e.target.value)} />
                    {errorMessage && <p className="error">{errorMessage}</p>}
                </div>
                <button className='add-contact-btn'>Add Contact</button>
                <button className='clear-contact-btn' type="button" onClick={() => {
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setStatus('Mobile');
                    setPhoneNumber('');
                    setErrorMessage('');
                }}>Clear All</button>
                <button className='back-btn' type="button" onClick={() => navigate('/')}>Back</button>
            </form>
        </div>
    );
}

export default AddContact;
