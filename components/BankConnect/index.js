import { useState } from "react";
import axios from "axios";

export default function BankConnect() {
  const [accessToken, setAccessToken] = useState("");
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Bankkonto verbinden</h2>

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
        onClick={getAccessToken}
      >
        1. Access Token holen
      </button>

      {accessToken && (
        <>
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded mb-2"
            onClick={() => setSelectedInstitution("SANDBOXFINANCE_SFIN0000")}
          >
            Sandbox Testbank auswählen
          </button>

          <button
            className="px-4 py-2 bg-green-600 text-white rounded mb-4"
            onClick={loadInstitutions}
          >
            2. Banken laden
          </button>

          {institutions.length > 0 && (
            <div className="mb-4">
              <label className="block mb-1">3. Bank auswählen:</label>
              <select
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
              </select>
            </div>
          )}

          <button
            className="px-4 py-2 bg-purple-600 text-white rounded"
            onClick={startRequisition}
            disabled={loading}
          >
            4. Weiter zur Bank
          </button>
        </>
      )}
    </div>
  );
}
