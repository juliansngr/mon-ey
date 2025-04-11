import { useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return <button onClick={() => signOut()}>Ausloggen</button>;
  }

  return <button onClick={() => signOut()}>Ausloggen</button>;
}
