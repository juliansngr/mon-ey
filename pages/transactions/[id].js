import styled from "styled-components";
import { useRouter } from "next/router";
import { useTransactionsContext } from "@/utils/TransactionsContext/TransactionsContext";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import dayjs from "dayjs";
import { Trash2 } from "lucide-react";
import DeleteForm from "@/components/DeleteForm";
import { useModalContext } from "@/utils/ModalContext/ModalContext";
import { useState } from "react";

export default function TransactionDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useTransactionsContext();
  const { openModal } = useModalContext();

  const [wasDeleted, setWasDeleted] = useState(null);

  const currentTransaction = data.find((transaction) => transaction.id === id);

  if (wasDeleted)
    return (
      <TransactionDetailsWrapper>
        <TransactionDetailsHeader>
          <IconLink href={"/"}>
            <ChevronLeft />
            Zurück
          </IconLink>
          <TransactionDetailsHeaderHeading>
            Details
          </TransactionDetailsHeaderHeading>
        </TransactionDetailsHeader>
        <SuccessWrapper>
          <SuccessMessage>Erfolgreich gelöscht! 😎</SuccessMessage>
        </SuccessWrapper>
      </TransactionDetailsWrapper>
    );
  if (isLoading) return <p>Lädt...</p>;
  if (!currentTransaction) return <p>Transaktion nicht vorhanden.</p>;

  return (
    <TransactionDetailsWrapper>
      <TransactionDetailsHeader>
        <IconLink href={"/"}>
          <ChevronLeft />
          Zurück
        </IconLink>
        <TransactionDetailsHeaderHeading>
          Details
        </TransactionDetailsHeaderHeading>
      </TransactionDetailsHeader>
      <TransactionInfoWrapper>
        <TransactionPartner>{currentTransaction.partner}</TransactionPartner>
        <TransactionCategory>{currentTransaction.category}</TransactionCategory>
      </TransactionInfoWrapper>
      <TransactionNumbersWrapper>
        <TransactionDate>
          {dayjs(currentTransaction.date).format("DD.MM.YYYY")}
        </TransactionDate>
        <TransactionAmount $type={currentTransaction.type}>
          {`${currentTransaction.type === "income" ? "+" : "-"} ${Math.abs(
            currentTransaction.amount
          ).toFixed(2)} €`}
        </TransactionAmount>
      </TransactionNumbersWrapper>
      <ActionButtonsWrapper>
        <DeleteButton
          onClick={() => {
            openModal("deleteTransaction", {
              id: id,
              onDelete: () => setWasDeleted(true),
            });
          }}
        >
          <TrashIcon />
          Löschen
        </DeleteButton>
      </ActionButtonsWrapper>
    </TransactionDetailsWrapper>
  );
}

const TransactionDetailsWrapper = styled.div`
  color: var(--green-900);
`;

const TransactionInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--3xs);
  padding-bottom: var(--md);
`;

const SuccessWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: var(--md);
  padding-bottom: var(--md);
`;

const TransactionPartner = styled.h3`
  font-size: var(--lg);
  font-weight: 500;
`;
const TransactionCategory = styled.h4`
  font-size: var(--md);
  color: var(--green-800);
`;

const IconLink = styled(Link)`
  all: unset;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-self: start;
`;
const TransactionDetailsHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  padding-top: var(--md);
  padding-bottom: var(--lg);
`;
const TransactionDetailsHeaderHeading = styled.h2`
  font-size: var(--xl);
  font-weight: 500;
  grid-column: 2;
  justify-self: center;
`;

const TransactionNumbersWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--xl);
`;

const TransactionAmount = styled.p`
  color: var(
    ${(props) => (props.$type === "income" ? "--green-500" : "--red-500")}
  );

  font-size: var(--xl);
  font-weight: 500;
`;

const TransactionDate = styled(TransactionCategory)``;

const DeleteButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--3xs);
  background-color: transparent;
  border: none;
  color: var(--green-950);
  width: 2.25rem;
  height: 3.25rem;
  cursor: pointer;
`;

const TrashIcon = styled(Trash2)`
  width: 100%;
  height: 100%;
`;

const SuccessMessage = styled.p`
  font-weight: 500;
  margin-bottom: var(--sm);
  font-size: var(--xl);
`;

const ActionButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
