import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";
import styled from "styled-components";

export default function LoginButton({ icon }) {
  const { data: session } = useSession();

  if (session) {
    return (
      <StyledButton onClick={() => signOut("provider", { callbackUrl: "/" })}>
        {icon ? <LogOut /> : "Ausloggen"}
      </StyledButton>
    );
  }

  return (
    <StyledButton
      $icon={icon}
      onClick={() => signIn("provider", { callbackUrl: "/dashboard" })}
    >
      {icon ? <LogIn /> : "Einloggen"}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  background-color: ${(props) =>
    props.$icon === true ? "transparent" : "var(--green-50)"};
`;
