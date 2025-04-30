import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Banking() {
  const [accessToken, setAccessToken] = useState("");
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const res = await fetch("/api/banking/token");
        if (!res.ok) throw new Error("Token konnte nicht geladen werden.");
        const data = await res.json();
        setAccessToken(data.access);
        localStorage.setItem("access_token", data.access);
      } catch (err) {
        console.error("Fehler beim Aufruf des Access Tokens", err);
      }
    };
    getAccessToken();
  }, []);

  const loadInstitutions = async () => {
    try {
      const res = await fetch("/api/banking/institutions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: accessToken }),
      });
      if (!res.ok) throw new Error("Banken konnten nicht geladen werden.");
      const data = await res.json();
      setInstitutions(data);
    } catch (err) {
      console.error("Fehler beim Laden der Banken", err);
    }
  };

  const startRequisition = async () => {
    if (!selectedInstitution) return alert("Bitte wähle eine Bank aus.");
    setLoading(true);

    try {
      const res = await fetch("/api/banking/requisition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_token: accessToken,
          institution_id: selectedInstitution,
          userId: "643bc8ecfbd7b7a2e3e2ddaa",
        }),
      });
      if (!res.ok) throw new Error("Requisition konnte nicht erstellt werden.");
      const data = await res.json();

      const { link, requisition_id, reuse } = data;
      localStorage.setItem("requisition_id", requisition_id);

      if (reuse) {
        alert(
          "Du hast diese Bank bereits verbunden – Weiterleitung zum Import."
        );
        window.location.href = `/banking/callback?requisition_id=${requisition_id}`;
      } else {
        window.location.href = link;
      }
    } catch (err) {
      console.error("Fehler beim Erstellen der Requisition", err);
      alert("Fehler beim Erstellen der Bankverbindung.");
    }

    setLoading(false);
  };

  return (
    <BankingWrapper>
      <BankingHeading>Verknüpfe dein Bankkonto</BankingHeading>
      <BankingParagraph>
        und importiere deine Transaktionen im Handumdrehen.
      </BankingParagraph>

      {accessToken && (
        <>
          <BankingButton
            onClick={() => setSelectedInstitution("SANDBOXFINANCE_SFIN0000")}
          >
            Sandbox Testbank auswählen
          </BankingButton>

          <BankingButton onClick={loadInstitutions}>
            Jetzt beginnen!
          </BankingButton>

          {institutions.length > 0 && (
            <InstitutionSelectWrapper>
              <label>Wähle deine Bank:</label>
              <InstitutionSelect
                value={selectedInstitution}
                onChange={(e) => setSelectedInstitution(e.target.value)}
              >
                <option value="">-- Bitte wählen --</option>
                {institutions.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.name}
                  </option>
                ))}
              </InstitutionSelect>
            </InstitutionSelectWrapper>
          )}

          {selectedInstitution && (
            <BankingButton onClick={startRequisition} disabled={loading}>
              Weiter zu deiner Bank
            </BankingButton>
          )}
        </>
      )}
    </BankingWrapper>
  );
}

const BankingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: var(--xs);
  padding: var(--md);
`;

const BankingHeading = styled.h2`
  font-size: var(--2xl);
  font-weight: bold;
`;

const BankingParagraph = styled.p`
  font-size: var(--md);

  margin-bottom: var(--xl);
`;

const BankingButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: var(--green-500);
  padding: var(--md) var(--xl);
  border-radius: var(--xs);
  color: var(--green-50);
`;

const InstitutionSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--xs);
  margin-bottom: var(--md);
`;

const InstitutionSelect = styled.select`
  width: 100%;
  padding: var(--xs) var(--md);
  border-radius: var(--xs);

  background-color: var(--white);
  font-size: var(--sm);
  color: var(--gray-700);
`;
