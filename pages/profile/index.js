import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export default function ProfilePage() {
  const { data: session } = useSession();
  const { user } = session;

  return (
    <ProfileWrapper>
      <ProfileInfoWrapper>
        <ProfileImage
          src={user.image ? user.image : "/images/profile_dummy.png"}
          alt="profile picture"
          height={100}
          width={100}
        />

        <UserInfo>
          <UserName>{user?.name}</UserName>
          <UserEmail>{user?.email}</UserEmail>
        </UserInfo>
      </ProfileInfoWrapper>
      <Link href="/banking">
        <RedButton>Bankkonto verknüpfen</RedButton>
      </Link>
      <RedButton
        onClick={() => {
          signOut({ callbackUrl: "/" });
        }}
      >
        Logout
      </RedButton>
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--md);
`;

const ProfileImage = styled(Image)`
  border-radius: 50%;
  width: 100px;
  height: 100px;
`;

const ProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--md);
  padding-top: var(--4xl);
  position: relative;
`;

const UserName = styled.h2`
  font-size: var(--3xl);
  font-weight: bold;
`;

const UserEmail = styled.p`
  font-size: var(--xl);
  color: var(--gray-500);
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--md);
`;

const RedButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--xs) var(--xl);
  line-height: 1.15;
  font-size: 100%;
  color: var(--green-50);
  border: none;
  border-radius: var(--xs);
  background-color: var(--red-500);
  box-shadow: var(--box-shadow-default);
  transition: background-color 0.6s ease, transform 0.8s ease;

  &:hover {
    transform: scale(1.1);
    background-color: var(--green-600);
    cursor: pointer;
    box-shadow: var(--box-shadow-active);
  }
`;
