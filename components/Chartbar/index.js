import styled, { css } from "styled-components";

export default function Chartbar({ totalIncome, totalExpenses }) {
    const barContainerHeight = 130; // Fixed height of the bars in pixels

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
            return (
                <span>
                    Die Ausgaben betragen ca. <strong>{ausgabenProzent.toFixed(2)} %</strong> der Einnahmen – entsprechend ergibt sich ein <strong>Überschuss</strong> von etwa <strong>{ueberschussProzent.toFixed(2)} %</strong>.
                </span>
            );
        } else if (difference < 0) {
            const defizitProzent = absIncome === 0
                ? 100 // If there is no income, the expenses are 100%
                : (Math.abs(difference) / absIncome) * 100;
            return (
                <span>
                    Die Ausgaben übersteigen die Einnahmen um ca. <strong>{defizitProzent.toFixed(2)} %</strong> – es entsteht ein <strong>Defizit</strong>.
                </span>
            );
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

            <Bars aria-label="Balken für Einnahmen und Ausgaben">
                <Bar>
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

const sharedBarStyles = css`
    display: flex;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
    border: 1px solid var(--darkgray);
    box-shadow: var(--3xs) -1px var(--2xs) var(--3xs) rgba(0, 0, 0, 0.6);
    transition: background-color 0.6s ease, transform 0.8s ease;

    &::after {
        font-size: var(--3xl);
        font-weight: 900;
    }
`;

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
@media (min-width: 768px) {
    max-width: 31.875rem;
}
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
@media (min-width: 768px) {
    width: unset;
}
`;

const IncomeBar = styled.div`
width: 100%;
background-color: var(--green-500); 
transition: height 0.3s ease;

@media (min-width: 768px) {
    ${sharedBarStyles}
    &::after {
        content: "+€"
    }
}
`;

const ExpenseBar = styled.div`
width: 100%;
background-color: var(--red-500);
transition: height 0.3s ease;
@media (min-width: 768px) {
    ${sharedBarStyles}
    &::after {
        content: "-€"
    }
}
`;

const Label = styled.div`
font-size: var(--2xs);
font-weight: 500;
letter-spacing: var(--4xs);
margin-top: var(--3xs);
text-align: center;
@media (min-width: 768px) {
    margin-top: var(--xs);
}
`;

const DateText = styled.h2`
font-size: var(--sm);
color: var(--green-text-dark);
margin-bottom: var(--3xs);
@media (min-width: 768px) {
        font-size: var(--base);
        margin-bottom: var(--md);
    }
`;

const DifferenceText = styled.p`
    font-size: var(--xs);
    color: var(--green-text-dark);
    text-align: center;
    font-weight: 300;
    @media (min-width: 768px) {
        font-size: var(--base);
    }
`;