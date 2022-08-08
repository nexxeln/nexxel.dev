import React, { useState } from "react";
import { generateSlug } from "random-word-slugs";
import { debounce } from "debounce";

import { trpc } from "../utils/trpc";
import clsx from "clsx";

type Form = {
  slug: string;
  url: string;
};

const CreateLink = ({ origin }: { origin: string }) => {
  const url = origin + "/r";
  const [form, setForm] = useState<Form>({ slug: "", url: "" });

  const checkSlug = trpc.useQuery(
    ["shortener.checkSlug", { slug: form.slug }],
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const createShortLink = trpc.useMutation("shortener.create");

  if (createShortLink.status === "success") {
    return (
      <div className="flex flex-col items-center justify-center mx-3 mt-6">
        <span className="pb-3 text-lg font-semibold">
          Here&apos;s your link!
        </span>

        <div className="flex items-center gap-2 p-4 border-2 rounded-md bg-zinc-800 border-t-pink">
          <h2 className="text-lg text-center md:text-2xl">{`${url}/${form.slug}`}</h2>
          <button
            className="px-4 py-2 ml-2 transition-colors duration-300 border-2 rounded-md cursor-pointer border-opacity-80 border-t-pink hover:bg-t-pink hover:bg-opacity-30 hover:text-white"
            onClick={() => {
              navigator.clipboard.writeText(`https://${url}/${form.slug}`);
            }}
          >
            Copy
          </button>
        </div>

        <button
          className="px-4 py-2 mt-5 transition-colors duration-300 border-2 rounded-md cursor-pointer border-opacity-80 border-t-pink hover:bg-t-pink hover:bg-opacity-30 hover:text-white"
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
        <span className="font-medium text-center text-t-red">
          This link is not available
        </span>
      ) : (
        <span className="font-medium text-center">
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
            "w-full px-4 py-2 rounded-md focus:outline-none border-2 placeholder:text-gray-400 font-normal bg-zinc-800",
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
          className="px-4 py-2 ml-2 transition-colors duration-300 border-2 rounded-md cursor-pointer border-opacity-80 border-t-pink hover:bg-t-pink hover:bg-opacity-30 hover:text-white"
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
      <div className="flex flex-col items-center my-2">
        <span className="self-start my-2 font-medium">Link</span>
        <input
          type="url"
          value={form.url}
          maxLength={3000}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          placeholder="https://duckduckgo.com"
          className="block w-full px-4 py-2 font-normal border-2 border-gray-200 rounded-md bg-zinc-800 focus:outline-none placeholder:text-gray-400"
          required
        />
      </div>
      <input
        type="submit"
        value={createShortLink.status === "loading" ? "Creating" : "Create"}
        className={clsx(
          "px-6 py-2 transition-colors duration-300 border-2 rounded-md cursor-pointer border-opacity-80 border-t-pink hover:bg-t-pink hover:bg-opacity-30 hover:text-white umami--click--create-shortlink",
          createShortLink.status === "loading" ? "opacity-50" : ""
        )}
        disabled={checkSlug.isFetched && checkSlug.data!.used}
      />
    </form>
  );
};

export default CreateLink;
