import clsx from "clsx";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { FC, useState } from "react";
import { trpc } from "~/utils/trpc";

const Signature: FC<{ name: string; message: string }> = ({
  name,
  message,
}) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-xl">{message}</h3>
      <p className="text-t-pink">- {name}</p>
    </div>
  );
};

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

const Guestbook = () => {
  const { data: session, status } = useSession();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const ctx = trpc.useContext();
  const { data: messages } = trpc.useQuery(["guestbook.getAll"]);
  const guestbook = trpc.useMutation("guestbook.postMessage", {
    onMutate: () => {
      ctx.cancelQuery(["guestbook.getAll"]);

      let optimisticUpdate = ctx.getQueryData(["guestbook.getAll"]);
      if (optimisticUpdate) {
        ctx.setQueryData(["guestbook.getAll"], optimisticUpdate);
      }
    },
    onSettled: () => {
      ctx.invalidateQueries(["guestbook.getAll"]);
    },
  });

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

    guestbook.mutate({
      name: session?.user?.name as string,
      message,
    });

    setMessage("");
    setLoading(false);
    console.log("refetched");
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
          value={message}
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

        <div className="pt-10" />

        <div className="flex flex-col gap-6">
          {messages?.map((msg, index) => {
            return (
              <Signature key={index} name={msg.name} message={msg.message} />
            );
          })}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center gap-4 p-4 border-2 rounded-md bg-[#202020] border-t-pink border-opacity-60">
        <button
          className="flex-none px-3 py-2 text-sm transition-colors duration-300 border-2 rounded-md border-t-orange hover:bg-t-orange hover:bg-opacity-30 hover:text-white"
          onClick={() => signIn("discord")}
        >
          Log In
        </button>
        <p className="pt-1.5 text-sm text-slate-300 w-2/3">
          Log in with Discord to comment. Your information is only used to
          display your name to avoid impersonation.
        </p>
      </div>

      <div className="pt-10" />

      <div className="flex flex-col gap-6">
        {messages?.map((msg, index) => {
          return (
            <Signature key={index} name={msg.name} message={msg.message} />
          );
        })}
      </div>
    </>
  );
};

export default Guestbook;
