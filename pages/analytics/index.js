import Tooltip from "@/components/Tooltip";
import TransactionsHeader from "@/components/TransactionsHeader";
import TransactionsList from "@/components/TransactionsList/";
import { useModalContext } from "@/contexts/ModalContext/ModalContext";
import { useTransactionsContext } from "@/contexts/TransactionsContext/TransactionsContext";
import dbConnect from "@/db/dbConnect";
import AdPlacementModel from "@/db/models/AdPlacement";
import { CalendarDays, Tag } from "lucide-react";
import styled, { css } from "styled-components";


export default function AnalyticsPage({ ad }) {
  const { sortedEntries, activeFilter, handleFilterChange } =
    useTransactionsContext();
  const { openModal, closeModal } = useModalContext();

  function handleClickFilter(filterType) {
    if (activeFilter.type !== filterType || !activeFilter.type) {
      let applyModalFilterTitle;

      switch (filterType) {
        case "date":
          applyModalFilterTitle = "Nach Datum filtern";
          break;
        case "category":
          applyModalFilterTitle = "Nach Kategorie filtern";
          break;
        default:
          applyModalFilterTitle = "";
          break;
      }

      openModal("filter", {
        title: applyModalFilterTitle,
        filterType: filterType,
      });
    } else {
      handleFilterChange({ type: null, pattern: null });
    }
  }

  return (
    <>
      <StyledH1>Analyse<Tooltip text="Hier kannst du Transaktionen nach Kategorie oder Datum filtern und Muster in deinen Einnahmen und Ausgaben analysieren." /></StyledH1>
      <StyledH2>Filtern nach:</StyledH2>
      <StyledFilterCriteriaWrapper>
        <StyledFilterButton onClick={() => handleClickFilter("category")}>
          <IconTextWrapper>
            <StyledTag
              $activated={activeFilter.type === "category" ? true : false}
            ></StyledTag>
          </IconTextWrapper>
        </StyledFilterButton>
        <StyledFilterButton onClick={() => handleClickFilter("date")}>
          <IconTextWrapper>
            <StyledCalendarDays
              $activated={activeFilter.type === "date" ? true : false}
            ></StyledCalendarDays>
          </IconTextWrapper>
        </StyledFilterButton>
      </StyledFilterCriteriaWrapper>
      <TransactionsHeader />
      {sortedEntries.length > 0 ? (
        <TransactionsList transactions={sortedEntries} ad={ad} />
      ) : (
        <StyledH2>Keine Daten für den gew&auml;hlten Filter!</StyledH2>
      )}
    </>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  let ads = await AdPlacementModel.find();
  let selectedAd = null;

  // 50% chance to select an ad
  if (Math.random() < 0.5 && ads.length > 0) {
    const randomIndex = Math.floor(Math.random() * ads.length);
    const ad = ads[randomIndex];
    selectedAd = {
      title: ad.title,
      imageUrl: ad.imageUrl,
      link: ad.link,
      text: ad.text,
    };
  }

  // Add an Ad if there are any available
  if (ads.length > 0) {
    const randomIndex = Math.floor(Math.random() * ads.length);
    selectedAd = {
      title: ads[randomIndex].title,
      imageUrl: ads[randomIndex].imageUrl,
      link: ads[randomIndex].link,
      text: ads[randomIndex].text,
    };
  }

  return {
    props: {
      ad: selectedAd, // null or one ad object
    },
  };
}



const StyledH1 = styled.h1`
  font-size: var(--3xl);
  margin-bottom: 1rem;
`;

const StyledH2 = styled.h2`
  font-size: var(--2xl);
  margin-bottom: 1rem;
`;

const StyledFilterButton = styled.button`
  background-color: transparent;
  border: none;
  color:var(--green-500);
  cursor: pointer;
   &:hover {
    transform: scale(1.1);
  }
  ${props => props.$activated && helperIconStyles}
`;

const IconTextWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledCalendarDays = styled(CalendarDays)`
  width: var(--iconSize);
  height: var(--iconSize);

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }

  ${props => props.$activated && helperIconStyles}
`;

const StyledTag = styled(Tag)`
  width: var(--iconSize);
  height: var(--iconSize);

  ${props => props.$activated && helperIconStyles}
`;

const StyledFilterCriteriaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--xl);
  padding: 1rem;
`;

const helperIconStyles = css`
      background-color: var(--green-800);
      border-radius: 50%;
      padding: var(--sm);
      box-shadow: var(--box-shadow-active);
      color: var(--green-text-light);
      width: 100%;
      height: 100%;
`;