import Link from "next/link";
import styled from "styled-components";

export default function AdPlacement({ image, text, title, link }) {
    // Return null if required props are missing
    if (!image || !link) {
        return null;
    }

    return (
        <StyledAdContainer aria-label="Werbung: Zur Angebotsseite navigieren">
            <StyledAdLink href={link} target="_blank" rel="noopener noreferrer" aria-label={`Zum Angebot: ${title}`}>
                <StyledAdImage src={image} alt={title || "Anzeige"} />
                <StyledAdContent>
                    {title && <StyledAdTitle>{title}</StyledAdTitle>}
                    {text && <StyledAdText>{text}</StyledAdText>}
                    <StyledAdBadge aria-label="Dies ist eine Werbung">Anzeige</StyledAdBadge>
                </StyledAdContent>
            </StyledAdLink>
        </StyledAdContainer>
    );
}

const StyledAdContainer = styled.li`
    display: inherit;
    margin-bottom: var(--sm);
    border-radius: var(--xs);
    background-color: var(--lightgray);
    box-shadow:var(--box-shadow-default);
    overflow: hidden;
    position: relative;
`;

const StyledAdLink = styled(Link)`
    display: flex;
    align-items: center;
    width: 100%;
    text-decoration: none;
    color: inherit;
    &:hover {
    cursor: pointer;
    }

`;

const StyledAdImage = styled.img`
    width: 5rem;
    height: 5rem;
    object-fit: cover;
    border-radius: 50%;
    @media (min-width: 768px) {
        border-radius: unset;
    }
`;

const StyledAdContent = styled.div`
    padding: var(--md);
    display: inherit;
    flex-direction: column;
    flex: 1;
`;

const StyledAdTitle = styled.h3`
  font-size: var(--lg);
  font-weight: 500;
  color: var(--green-800);
  margin: 0 0 var(--2xs) 0;
`;

const StyledAdText = styled.p`
  font-size: var(--sm);
  margin: 0;
  color: var(--darkgray);
`;

const StyledAdBadge = styled.span`
    position: absolute;
    top: var(--3xs);
    right: var(--3xs);
    background-color: var(--gray-200);
    color: var(--gray-600);
    font-size: var(--2xs);
    padding: var(--4xs) var(--3xs);
    border-radius: var(--4xs);
`;