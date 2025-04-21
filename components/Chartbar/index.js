import styled from "styled-components";

export default function Chartbar({ totalIncome, totalExpenses }) {
    const barContainerHeight = 130; // Fixed height of the bars in pixels
    totalIncome = 5000;
    totalExpenses = 18001

    // Calculate the total value
    const totalValue = Math.abs(totalIncome) + Math.abs(totalExpenses);

    // Avoid division by zero
    const incomeHeight = totalValue > 0
        ? Math.round((Math.abs(totalIncome) / totalValue) * barContainerHeight)
        : 0;

    const expenseHeight = totalValue > 0
        ? Math.round((Math.abs(totalExpenses) / totalValue) * barContainerHeight)
        : 0;

    const currentDate = new Date().toLocaleDateString('de-DE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    function getDifferenceText(totalIncome, totalExpenses) {
        const absIncome = Math.abs(totalIncome);
        const absExpenses = Math.abs(totalExpenses);
        const difference = absIncome - absExpenses;

        if (absIncome === 0 && absExpenses === 0) {
            return "Einnahmen und Ausgaben sind gleich – keine Differenz.";
        }

        if (difference > 0) {
            const ausgabenProzent = (absExpenses / absIncome) * 100;
            const ueberschussProzent = 100 - ausgabenProzent;
            return `Die Ausgaben betragen ca. ${ausgabenProzent.toFixed(2)} % der Einnahmen – entsprechend ergibt sich ein Überschuss von etwa ${ueberschussProzent.toFixed(2)} %.`;
        } else if (difference < 0) {
            const defizitProzent = (Math.abs(difference) / absIncome) * 100;
            return `Die Ausgaben übersteigen die Einnahmen um ca. ${defizitProzent.toFixed(2)} % – es entsteht ein Defizit.`;
        } else {
            return "Einnahmen und Ausgaben sind gleich – keine Differenz.";
        }
    }


    return (
        <ChartContainer aria-label={`Balkendiagramm mit Einnahmen und Ausgaben, Stand: ${currentDate}`}>
            <DateText>Stand: {currentDate}</DateText>
            <DifferenceText aria-label={getDifferenceText(totalIncome, totalExpenses)}>
                {getDifferenceText(totalIncome, totalExpenses)}
            </DifferenceText>

            <Bars className="bars" aria-label="Balken für Einnahmen und Ausgaben">
                <Bar className="bar">
                    <IncomeBar
                        className="incomeBar"
                        style={{ height: `${incomeHeight}px` }}
                        aria-label={`Einnahmen: ${totalIncome.toFixed(2)} EUR, Balkenhöhe: ${incomeHeight} Pixel`}
                    />
                    <Label>Einnahmen: {totalIncome.toFixed(2)} €</Label>
                </Bar>
                <Bar>
                    <ExpenseBar
                        style={{ height: `${expenseHeight}px` }}
                        aria-label={`Ausgaben: ${totalExpenses.toFixed(2)} EUR, Balkenhöhe: ${expenseHeight} Pixel von 130 Pixel`}
                    />
                    <Label>Ausgaben: {totalExpenses.toFixed(2)} €</Label>
                </Bar>
            </Bars>
        </ChartContainer>
    );
}

const ChartContainer = styled.div`
max-width: 10rem;
display: flex;
flex-direction: column;
align-items: center;
margin: 0 0 var(--md);
padding: var(--3xs);
border-radius: var(--xs);
background-color: white;
border: var(--3xs) solid transparent;
box-shadow: var(--box-shadow-default);
`;

const Bars = styled.div`
width: 100%;
height: 8rem;
margin-top: var(--3xs);
overflow: hidden;
display: flex;
justify-content: space-around;
align-items: flex-end;
position: relative;
`;

const Bar = styled.div`
width: 45%;
display: flex;
flex-direction: column;
align-items: center;
max-height: 10rem;
`;

const IncomeBar = styled.div`
width: 100%;
background-color: var(--green-500); 
transition: height 0.3s ease;
`;

const ExpenseBar = styled.div`
width: 100%;
background-color: var(--red-500);
transition: height 0.3s ease;
`;

const Label = styled.div`
font-size: var(--2xs);
font-weight: 500;
letter-spacing: var(--4xs);
margin-top: var(--3xs);
text-align: center;
`;

const DateText = styled.h2`
font-size: var(--sm);
color: var(--green-text-dark);
margin-bottom: var(--3xs);
`;

const DifferenceText = styled.p`
    font-size: var(--xs);
    color: var(--green-text-dark);
    text-align: center;
    font-weight: 500;
`;