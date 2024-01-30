import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StartForm() {
    const [diceSides, setDiceSides] = useState('');
    const [accuracy, setAccuracy] = useState('Moderate');
    const navigate = useNavigate();

    useEffect(() => {
        const sides = parseInt(diceSides);
        if (diceSides && (isNaN(sides) || sides % 2 !== 0 || sides === 0)) {
            setDiceSides('');
        }
    }, [diceSides]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        // Allow only digits to be entered
        if (value === '' || /^\d+$/.test(value)) {
            setDiceSides(value);
        }
    };

    const handleAccuracyChange = (event) => {
        const value = event.target.value;
        setAccuracy(value);
    };

    const handleStartCheck = () => {
        const sides = parseInt(diceSides);
        if (sides) {
            navigate('/check', {
                state: {
                    diceSides: sides,
                    accuracy: accuracy,
                },
            });
        }
        else alert('Please enter a valid number of dice sides');
    }

    return (
        <div className='start_form'>
            <input
                type='text'
                placeholder='Number of dice sides'
                onChange={handleInputChange}
                value={diceSides}
            />
            <div className="select-container">
                <label htmlFor="accuracySelect" className="select-label">Accuracy:</label>
                <select id="accuracySelect" className='start_select' onChange={handleAccuracyChange} value={accuracy}>
                    <option>Low</option>
                    <option>Moderate</option>
                    <option>High</option>
                    <option>Extreme</option>
                </select>
            </div>


            <button className='start_button' onClick={handleStartCheck}>Start Check</button>
        </div>
    );
}
