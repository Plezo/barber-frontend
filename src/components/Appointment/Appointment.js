import React from 'react';

import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import './Appointment.css';

function isValidPhone(phone) {
    const re = new RegExp('\d{10}');
    return re.test(phone);
}

export default function Appointment() {

    const [name, setName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [time, setTime] = useState(new Date());
    const [reserved, setReserved] = useState(false);

    const handleClick = async (e) => {

        // TODO: Make it visible to user that phone num is invalid
        if (!isValidPhone(phoneNum)) {
            return;
        }

        // TODO Generate a valid id
        const appoint = {
            id: 0, // make sure to generate an id depending on database
            client_name: name,
            client_phone_number: phoneNum,
            start_time: new Date(time.getTime() - 4 * 60 * 60 * 1000),        // utc -> est
            end_time_expected: new Date(time.getTime() - 3 * 60 * 60 * 1000)  // utc -> est
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appoint)
        };

        const response = await fetch('http://localhost:3001/appointment', requestOptions);
        const data = await response.json();

        console.log(data)

        // TODO: Make it visible to user that reservation was a success
        setReserved(data.success);

        e.preventDefault();
    }

    return (
    <>
        <div className='appointments'>
            <Form>
                <Form.Group className='mb-4' controlId='formName'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                    type='text' 
                    placeholder='John Doe (optional)'
                    onChange={(e) => {setName(e.target.value)}} />
                </Form.Group>
                <Form.Group className='mb-4' controlId='formName'>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control 
                    type='tel' 
                    placeholder='Enter phone # (required)'
                    onChange={(e) => {setPhoneNum(e.target.value)}} />
                </Form.Group>
                <Form.Group className='mb-4' controlId='formTime'>
                    <Form.Label>Time</Form.Label>
                    <Form.Control 
                    type='datetime-local'
                    onChange={(e) => {setTime(new Date(e.target.value))}} />
                </Form.Group>
                <Button variant="secondary" onClick={(e) => { handleClick(e) }}>
                    Reserve
                </Button>
            </Form>
        </div>
    </>
    )
}
