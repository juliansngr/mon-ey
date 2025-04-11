import styled from "styled-components";

export default function Chartbar({ totalIncome, totalExpenses }) {

    const maxValue = Math.max(totalIncome, totalExpenses, 1);
    console.log(`maxValue: ${maxValue} -> ${totalIncome} + ${totalExpenses} `);
    const barContainerHeight = 130; // Feste Höhe des Bars-Containers in Pixeln

    // Berechne die Höhe in Pixeln relativ zum maxValue und skaliere auf 200px
    const incomeHeight = Math.round((Math.abs(totalIncome) / maxValue) * barContainerHeight);
    const expenseHeight = Math.round((Math.abs(totalExpenses) / maxValue) * barContainerHeight);


    const currentDate = new Date().toLocaleDateString('de-DE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    return (
        <ChartContainer aria-label={`Balkendiagramm mit Einnahmen und Ausgaben, Stand: ${currentDate}`}>
            <DateText>Stand: {currentDate}</DateText>
            <Bars className="bars" aria-label="Balken für Einnahmen und Ausgaben">
                <Bar className="bar">
                    <IncomeBar className="incomeBar" style={{ height: `${incomeHeight}px` }} aria-label={`Einnahmen: ${totalIncome} EUR, Balkenhöhe: ${incomeHeight} Pixel`} />
                    <Label>Einnahmen: {totalIncome} €</Label>
                </Bar>
                <Bar>
                    <ExpenseBar style={{ height: `${expenseHeight}px` }} aria-label={`Ausgaben: ${totalIncome} EUR, Balkenhöhe: ${incomeHeight} Pixel`} />
                    <Label>Ausgaben: {totalExpenses} €</Label>
                </Bar>
            </Bars>
        </ChartContainer>
    );
};

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
height: 160px; /* Feste Höhe für den Balkenbereich */
display: flex;
justify-content: space-around;
align-items: flex-end;
position: relative;
`;

const Bar = styled.div`
width: 40%;
display: flex;
flex-direction: column;
align-items: center;
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
margin-top: 5px;
text-align: center;
`;

const DateText = styled.h2`
font-size: var(--sm);
color: #666;
/* margin-bottom: var(--4xl); */
`;