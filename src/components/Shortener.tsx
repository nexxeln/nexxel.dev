import React, { useState } from "react";
import { generateSlug } from "random-word-slugs";
import { debounce } from "debounce";
import clsx from "clsx";
import { BsCheck2 } from "react-icons/bs";
import { FiClipboard } from "react-icons/fi";

import { trpc } from "../utils/trpc";

type Form = {
  slug: string;
  url: string;
};

const CreateLink = ({ origin }: { origin: string }) => {
  const url = origin + "/r";
  const [form, setForm] = useState<Form>({ slug: "", url: "" });
  const [copied, setCopied] = useState(false);

  const checkSlug = trpc.shortener.checkSlug.useQuery(
    {
      slug: form.slug,
    },
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const createShortLink = trpc.shortener.create.useMutation();

  if (createShortLink.status === "success") {
    return (
      <div className="mx-3 mt-6 flex flex-col items-center justify-center">
        <span className="pb-3 text-lg font-semibold">
          Here&apos;s your link!
        </span>

        <div className="flex items-center gap-2 rounded-md border-2 border-t-pink bg-zinc-800 p-4">
          <h2 className="text-center text-lg md:text-2xl">{`${url}/${form.slug}`}</h2>
          <button
            className="ml-2 cursor-pointer rounded-md border-2 border-t-pink px-2 py-2 text-t-pink transition-colors duration-300 hover:bg-t-pink hover:bg-opacity-30"
            onClick={() => {
              setCopied(true);
              navigator.clipboard.writeText(`https://${url}/${form.slug}`);
              setTimeout(() => {
                setCopied(false);
              }, 3000);
            }}
          >
            {copied ? <BsCheck2 /> : <FiClipboard />}
          </button>
        </div>

        <button
          className="mt-5 cursor-pointer rounded-md border-2 border-t-pink border-opacity-80 px-4 py-2 transition-colors duration-300 hover:bg-t-pink hover:bg-opacity-30 hover:text-white"
          onClick={() => {
            createShortLink.reset();
            setForm({ slug: "", url: "" });
          }}
        >
          Create New
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createShortLink.mutate({ ...form });
      }}
      className="mt-6"
    >
      {checkSlug.data?.used ? (
        <span className="text-center font-medium text-t-red">
          This link is not available
        </span>
      ) : (
        <span className="text-center font-medium">
          {url}/{form.slug}
        </span>
      )}

      <div className="my-2" />

      <div className="flex items-center">
        <input
          type="text"
          onChange={(e) => {
            setForm({
              ...form,
              slug: e.target.value.toLowerCase(),
            });

            debounce(checkSlug.refetch, 100);
          }}
          minLength={1}
          maxLength={20}
          placeholder="cat-in-hat"
          className={clsx(
            "w-full rounded-md border-2 bg-zinc-800 px-4 py-2 font-normal placeholder:text-gray-400 focus:outline-none",
            checkSlug.data?.used
              ? "border-t-red border-opacity-75"
              : "border-gray-200"
          )}
          value={form.slug}
          pattern={"^[-a-zA-Z0-9]+$"}
          title="Only alphanumeric characters and hyphens are allowed. No spaces."
          required
        />

        <input
          type="button"
          value="Random"
          className="ml-2 cursor-pointer rounded-md border-2 border-t-pink border-opacity-80 px-4 py-2 transition-colors duration-300 hover:bg-t-pink hover:bg-opacity-30 hover:text-white"
          onClick={() => {
            const slug = generateSlug();

            setForm({
              ...form,
              slug,
            });

            checkSlug.refetch();
          }}
        />
      </div>
      <div className="my-2 flex flex-col items-center">
        <span className="my-2 self-start font-medium">Link</span>
        <input
          type="url"
          value={form.url}
          maxLength={3000}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          placeholder="https://duckduckgo.com"
          className="block w-full rounded-md border-2 border-gray-200 bg-zinc-800 px-4 py-2 font-normal placeholder:text-gray-400 focus:outline-none"
          required
        />
      </div>
      <input
        type="submit"
        value={createShortLink.status === "loading" ? "Creating" : "Create"}
        className={clsx(
          "umami--click--create-shortlink cursor-pointer rounded-md border-2 border-t-pink border-opacity-80 px-6 py-2 transition-colors duration-300 hover:bg-t-pink hover:bg-opacity-30 hover:text-white",
          createShortLink.status === "loading" ? "opacity-50" : ""
        )}
        disabled={checkSlug.isFetched && checkSlug.data!.used}
      />
    </form>
  );
};

export default CreateLink;
