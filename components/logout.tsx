// app/components/LogoutButton.tsx
'use client';

import { signOut } from 'next-auth/react';

const LogoutButton: React.FC = () => {
  return (
    <button onClick={() => signOut()}>Logout</button>
  );
};

export default LogoutButton;
