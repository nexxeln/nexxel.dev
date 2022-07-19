import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Input = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session.user?.image && (
          // eslint-disable-next-line react/jsx-no-undef
          <Image
            src={session.user?.image}
            alt="s"
            width={38}
            height={38}
            style={{ borderRadius: "50%" }}
          />
        )}
        Hello, {session.user?.name}!<br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("discord")}>Sign in</button>
    </>
  );
};

export default Input;
