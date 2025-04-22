import { CircleArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';


export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <BackToTopButton
            onClick={scrollToTop}
            isVisible={isVisible}
            aria-label="Back to top"
        >
            <CircleArrowUp size={24} />
        </BackToTopButton>
    );
}

const BackToTopButton = styled.button`
    position: fixed;
    bottom: 4rem;
    right: var(--2xl);
    padding: var(--3xs);
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    background-color: var(--green-600);
    color: var(--lightgray);
    border: none;
    cursor: pointer;
    transition: all 0.6s ease;
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
    visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
    
    &:hover {
        transform: scale(1.1);
        background-color: var(--green-800);
    }
    
    > svg {
        position: relative;
        top: var(--4xs)
    }
`;
