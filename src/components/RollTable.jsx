import React, { useState } from 'react';
import ChiSquaredTest from '../utils/chiSquared';
import NumericInput from 'react-numeric-input';

const accuracyMultipliers = {
    Low: 2,
    Moderate: 2.5,
    High: 3,
    Extreme: 3.5,
};

export default function RollTable({ sides, accuracy }) {
    const multiplier = accuracyMultipliers[accuracy];
    const rolls = sides * multiplier;
    const [rollValues, setRollValues] = useState(Array(rolls).fill(''));
    const [result, setResult] = useState('');

    const handleInputChange = (index, value) => {
        const newRollValues = [...rollValues];
        newRollValues[index] = value;
        setRollValues(newRollValues);
    };

    const handleCheckFairness = () => {
        // Logic to check fairness based on the roll values
        console.log('Roll values:', rollValues);
        const { chiSquared, favoredSides } = ChiSquaredTest(rollValues, sides);
        console.log('Chi-Squared Value:', chiSquared);
        console.log('Favored Sides (in order):', favoredSides);
        if (chiSquared > 0.5) {
            let favored = 0
            favoredSides.forEach((side) =>{
                if(side.difference > favored){
                    favored = side.side;
                }  
            }
            )
            setResult(`Not fair, side ${favored} is favored more than the others`);
        }
        else setResult('The dice is Fair');
    };

    const tableRows = rollValues.map((roll, index) => (
        <tr key={index}>
            <td># {index + 1}</td>
            <td>
                <NumericInput
                    min={1}
                    max={sides}
                    step={1}
                    placeholder='value'
                    onChange={(value) => handleInputChange(index, value)}
                />
                {/* <input
                    placeholder='value'
                    value={roll}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                /> */}
            </td>
        </tr>
    ));

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Roll Number</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
                <tr>
                    <td>
                        <button className='start_button' onClick={handleCheckFairness}>Check Fairness</button>
                    </td>
                    <td>Result: {result}</td>
                </tr>
            </tbody>
        </table>
    );
}