import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";
import styled from "styled-components";

export default function LoginButton({ icon }) {
  const { data: session } = useSession();

  if (session) {
    return (
      <StyledButton
        $icon={icon}
        onClick={() => {
          signOut({ callbackUrl: "/" });
        }}
      >
        {icon ? <LogOut /> : "Ausloggen"}
      </StyledButton>
    );
  }

  return (
    <StyledButton
      $icon={icon}
      onClick={() => signIn(null, { callbackUrl: "/dashboard" })}
    >
      {icon ? <LogIn /> : "Einloggen"}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.$icon === true ? "transparent" : "var(--green-500)"};
  padding: ${(props) => (props.$icon === true ? "0" : "var(--md) var(--xl)")};
  border-radius: var(--xs);
  color: var(--green-50);
`;
