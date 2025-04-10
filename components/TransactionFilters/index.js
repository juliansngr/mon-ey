import styled from "styled-components";
import categories from "@/db/categories.json";
import { useModalContext } from "@/utils/ModalContext/ModalContext";
import { useTransactionsContext } from "@/utils/TransactionsContext/TransactionsContext";
import dayjs from "dayjs";

export default function TransactionFilters({ filterType }) {
  const { closeModal } = useModalContext();
  const { handleFilterChange } = useTransactionsContext();

  function handleFilterSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const filterData = Object.fromEntries(formData);

    handleFilterChange({
      type: filterData.filterType,
      pattern: filterData[filterType],
    });

    closeModal();
  }

  return (
    <>
      <StyledFilterForm onSubmit={handleFilterSubmit}>
        <input type="hidden" name="filterType" value={filterType} />
        {filterType === "category" && (
          <StyledFilterSelect
            id="category"
            name="category"
            required
            aria-label="Kategorie der Transaktion wählen"
          >
            <StyledFilterSelectOption value="">
              -Bitte Kategorie ausw&auml;hlen-
            </StyledFilterSelectOption>
            {categories.map((cat) => (
              <StyledFilterSelectOption key={cat} value={cat}>
                {cat}
              </StyledFilterSelectOption>
            ))}
          </StyledFilterSelect>
        )}
        {filterType === "date" && (
          <StyledFilterInput
            type="date"
            name="date"
            defaultValue={dayjs().format("YYYY-MM-DD")}
            aria-label="Zeitpunkt der Transaktion wählen"
          />
        )}
        <StyledFilterSubmit aria-label="Transaktionen filtern">
          Filtern
        </StyledFilterSubmit>
      </StyledFilterForm>
    </>
  );
}

const StyledFilterForm = styled.form`
  width: 300px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: var(--base);
`;
const StyledFilterInput = styled.input`
  padding: var(--3xs);
  line-height: 1.15;
  font-size: 100%;
`;

const StyledFilterSubmit = styled.button`
  padding: var(--3xs);
  line-height: 1.15;
  font-size: 100%;
`;
const StyledFilterSelect = styled.select`
  padding: var(--3xs);
  line-height: 1.15;
  font-size: 100%;
`;
const StyledFilterSelectOption = styled.option``;
