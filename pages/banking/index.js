import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

export default function Banking() {
  const [accessToken, setAccessToken] = useState("");
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const res = await axios.get("/api/banking/token");
        setAccessToken(res.data.access);
        localStorage.setItem("access_token", res.data.access);
        console.log("Access Token:", res.data.access);
      } catch (err) {
        console.error("Fehler beim Abrufen des Access Tokens", err);
      }
    };
    getAccessToken();
  }, []);

  const loadInstitutions = async () => {
    try {
      const res = await axios.post("/api/banking/institutions", {
        access_token: accessToken,
      });
      setInstitutions(res.data);
    } catch (err) {
      console.error("Fehler beim Laden der Banken", err);
    }
  };

  const startRequisition = async () => {
    if (!selectedInstitution) return alert("Bitte wähle eine Bank aus.");
    setLoading(true);

    try {
      const res = await axios.post("/api/banking/requisition", {
        access_token: accessToken,
        institution_id: selectedInstitution,
        userId: "643bc8ecfbd7b7a2e3e2ddaa", // <- deine MongoDB-User-ID
      });

      const { link, requisition_id, reuse } = res.data;

      // lokale Speicherung oder an Link hängen
      localStorage.setItem("requisition_id", requisition_id);

      if (reuse) {
        alert(
          "Du hast diese Bank bereits verbunden – Weiterleitung zum Import."
        );
        window.location.href = `/banking/callback?requisition_id=${requisition_id}`;
      } else {
        // Weiterleitung zum Bank-Login
        window.location.href = link;
      }
    } catch (err) {
      console.error("Fehler beim Erstellen der Requisition", err);
      alert("Fehler beim Erstellen der Bankverbindung.");
    }

    setLoading(false);
  };

  return (
    <BankingWrapper className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <BankingHeading className="text-xl font-bold mb-4">
        Verknüpfe dein Bankkonto
      </BankingHeading>
      <BankingParagraph className="text-xl font-bold mb-4">
        und importiere deine Transaktionen im Handumdrehen.
      </BankingParagraph>

      {accessToken && (
        <>
          <BankingButton
            className="px-4 py-2 bg-gray-800 text-white rounded mb-2"
            onClick={() => setSelectedInstitution("SANDBOXFINANCE_SFIN0000")}
          >
            Sandbox Testbank auswählen
          </BankingButton>

          <BankingButton
            className="px-4 py-2 bg-green-600 text-white rounded mb-4"
            onClick={loadInstitutions}
          >
            Jetzt beginnen!
          </BankingButton>

          {institutions.length > 0 && (
            <InstitutionSelectWrapper className="mb-4">
              <label className="block mb-1">Wähle deine Bank:</label>
              <InstitutionSelect
                className="w-full border px-3 py-2 rounded"
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
            <BankingButton
              className="px-4 py-2 bg-purple-600 text-white rounded"
              onClick={startRequisition}
              disabled={loading}
            >
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
  font-weight: var(--font-bold);
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
