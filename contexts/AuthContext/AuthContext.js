import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const publicRoutes = ["/"];

  if (status === "loading") {
    return <p>Lädt...</p>;
  }

  if (!publicRoutes.includes(router.pathname) && !session) {
    router.push("/api/auth/signin");
    return null;
  }

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
