import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, createContext } from "react";

const AuthContext = createContext();

const publicRoutes = ["/"];

export function AuthProvider({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Lädt...</p>;
  }

  if (!publicRoutes.includes(router.pathname) && status === "unauthenticated") {
    router.push("/api/auth/signin");
  }

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
