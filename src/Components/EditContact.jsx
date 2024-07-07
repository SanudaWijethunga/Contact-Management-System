import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddContact.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function EditContact(props) {
    const { id } = useParams();
    const [contactToEdit, setContactToEdit] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('Mobile');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [valid, setValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContact = async () => {
            const foundContact = props.contacts.find(contact => contact.id === id);
            if (foundContact) {
                setContactToEdit(foundContact);
                setFirstName(foundContact.firstName);
                setLastName(foundContact.lastName);
                setEmail(foundContact.email);
                setStatus(foundContact.status);
                setPhoneNumber(foundContact.phoneNumber);
                setValid(ValidatePhoneNumber(foundContact.phoneNumber));
            }
        };
        fetchContact();
    }, [props.contacts, id]);

    const change = (input) => {
        setPhoneNumber(input);
        setValid(ValidatePhoneNumber(input));
    };

    const ValidatePhoneNumber = (phoneNumber) => {
        const validated = /^\d{11}$/;
        return validated.test(phoneNumber);
    };

    const update = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (firstName === "" || lastName === "" || email === "" || status === "" || phoneNumber === "") {
            setErrorMessage("You have to fill all the fields.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Please provide a valid email address.");
            return;
        }
    
        if (!email.endsWith('gmail.com')) {
            setErrorMessage("Please enter a Gmail address.");
            return;
        }

        if (!valid) {
            setErrorMessage("Please enter a valid phone number.");
            return;
        }

        try {
            await props.updateContact({
                id,
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

            navigate("/");
        }
        
        catch (error) {
            console.error("Error updating contact:", error);
            setErrorMessage("Failed to update contact. Please try again later.");
        }
    };

    if (!contactToEdit) {
        return <div>Loading...</div>;
    }

    return (
        <div className="main">
            <h2>Edit Contact</h2>
            <form action="#" onSubmit={update}>
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
                        country={'lk'}
                        value={phoneNumber}
                        onChange={change}
                        containerClass="phone-input"
                    />
                    
                    <label>Email</label>
                    <input type="email" name="email" value={email} placeholder="Enter your email here" onChange={(e) => setEmail(e.target.value)} />
                    {errorMessage && <p className="error">{errorMessage}</p>}
                </div>
                <button className='add-contact-btn'>Update Contact</button>
                <button className='back-btn' type="button" onClick={() => navigate('/')}>Back</button>
            </form>
        </div>
    );
}

export default EditContact;
