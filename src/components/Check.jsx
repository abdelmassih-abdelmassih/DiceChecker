import React from 'react'
import { useLocation } from 'react-router-dom';
import RollTable from './RollTable';

export default function Check() {
    const location = useLocation();
    const { diceSides, accuracy } = location.state || {};

    return (
        <div>
            <h1>Dice Checker</h1>
            <RollTable sides={diceSides} accuracy={accuracy} />
        </div>
    )
}
