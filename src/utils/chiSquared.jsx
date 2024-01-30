function calculateFrequencies(outcomes, sides) {
    const frequencies = Array(sides).fill(0);
    outcomes.forEach(outcome => {
        if (outcome >= 1 && outcome <= sides) {
            frequencies[outcome - 1]++;
        }
    });
    return frequencies;
}

export default function ChiSquaredTest(rollValues, sides) {
    const frequencies = calculateFrequencies(rollValues, sides);
    const totalRolls = frequencies.reduce((acc, val) => acc + val, 0);
    const expectedFrequency = totalRolls / sides;
    let chiSquared = 0;
    let differences = [];

    for (let i = 0; i < sides; i++) {
        const observedFrequency = frequencies[i];
        const difference = observedFrequency - expectedFrequency;
        chiSquared += (difference ** 2) / expectedFrequency;
        differences.push({ side: i + 1, difference });
    }

    differences.sort((a, b) => Math.abs(b.difference) - Math.abs(a.difference));

    return {
        chiSquared,
        favoredSides: differences
    };
}

// Example usage
// const rollValues = [/* array of observed frequencies for each side */];
// const sides = 6; // for a six-sided dice
// const result = chiSquaredTest(rollValues, sides);
// console.log("Chi-Squared Value:", result.chiSquared);
// console.log("Favored Sides (in order):", result.favoredSides);