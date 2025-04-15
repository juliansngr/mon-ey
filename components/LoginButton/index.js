import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button onClick={() => signOut("provider", { callbackUrl: "/" })}>
        Ausloggen
      </button>
    );
  }

  return (
    <button onClick={() => signIn("provider", { callbackUrl: "/dashboard" })}>
      Einloggen
    </button>
  );
}
