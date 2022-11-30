// credit: https://github.com/satnaing/astro-paper/blob/main/src/components/Search.tsx

import { useEffect, useRef, useState } from "react";
import Fuse from "fuse.js";

import { Blog } from "./Blog";
import type { Post } from "../types";

type Result = {
  item: Post;
  refIndex: number;
  score: number;
};

export const SearchBar = ({ posts }: { posts: Post[] }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[] | null>(null);

  const fuse = new Fuse(posts, {
    keys: [
      {
        name: "title",
        getFn: (post) => post.frontmatter.title,
        weight: 2,
      },
      {
        name: "description",
        getFn: (post) => post.frontmatter.description,
        weight: 1,
      },
    ],
    includeMatches: true,
    includeScore: true,
    minMatchCharLength: 2,
    threshold: 0.3,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search).get("q");

    if (searchParams) setQuery(searchParams);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.selectionStart = inputRef.current.selectionEnd =
          searchParams?.length || 0;
      }
    }, 50);
  }, []);

  useEffect(() => {
    // @ts-ignore idk why this is happening
    setResults(query.length > 1 ? fuse.search(query) : []);

    if (query.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", query);

      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      history.pushState(null, "", newUrl);
    } else {
      history.pushState(null, "", window.location.pathname);
    }
  }, [query]);

  return (
    <>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search posts"
        value={query}
        autoComplete="off"
        autoFocus
        ref={inputRef}
        onChange={(event) => setQuery(event.target.value)}
      />

      {query.length > 1 && (
        <div>
          Found {results?.length}
          {results?.length && results?.length === 1 ? " result" : " results"}
        </div>
      )}

      {results &&
        results
          .sort((a, b) => b.score - a.score)
          .map((result) => (
            <Blog
              key={`${result.refIndex}-${result.item.url}`}
              url={result.item.url}
              title={result.item.frontmatter.title}
              description={result.item.frontmatter.description}
              date={result.item.frontmatter.pubDate}
              readingTime={result.item.frontmatter.readingTime}
            />
          ))}
    </>
  );
};
