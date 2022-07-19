import clsx from "clsx";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const LogOutButton = () => {
  return (
    <button
      className="px-3 py-2 mt-2 text-sm transition-colors duration-300 border-2 rounded-md cursor-pointer border-opacity-80 border-t-purple hover:bg-t-purple hover:bg-opacity-30 hover:text-white"
      onClick={() => {
        signOut();
      }}
    >
      Log Out
    </button>
  );
};

const Input = () => {
  const { data: session, status } = useSession();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);

    if (message.length === 0) {
      setLoading(false);
      setError("Your message is empty!");
      return;
    }

    if (message.length > 100) {
      setLoading(false);
      setError("Your message must be less than 100 characters.");
      return;
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
        {session.user?.image && (
          <div className="flex items-center gap-2">
            <Image
              src={session.user?.image}
              alt="s"
              width={36}
              height={36}
              style={{ borderRadius: "50%" }}
            />

            <p>- Signed in as {session.user.name}</p>
          </div>
        )}

        <div className="pt-3" />

        <p className="text-sm text-t-red">{error}</p>
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Your message..."
          className="w-full px-4 py-2 mt-1 text-xl border-2 rounded-md bg-zinc-800 focus:outline-none focus:border-opacity-100 border-opacity-80 border-t-pink text-slate-200"
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="px-3 py-2 mt-2 text-sm transition-colors duration-300 border-2 rounded-md cursor-pointer border-opacity-80 border-t-purple hover:bg-t-purple hover:bg-opacity-30 hover:text-white disabled:opacity-80"
              onClick={() => handleSubmit()}
            >
              Sign
            </button>

            <LogOutButton />
          </div>

          <p
            className={clsx(
              "text-lg",
              message.length > 100 ? "text-t-red" : "text-t-pink"
            )}
          >
            {message.length}/100
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <button
        className="flex-none px-3 py-2 text-sm transition-colors duration-300 border-2 rounded-md border-t-orange hover:bg-t-orange hover:bg-opacity-30 hover:text-white"
        onClick={() => signIn("discord")}
      >
        Log In
      </button>
      <p className="pt-1.5 text-sm text-slate-300 w-2/3">
        Log in with Discord to comment. Your information is only used to display
        your name to avoid impersonation.
      </p>
    </div>
  );
};

export default Input;
