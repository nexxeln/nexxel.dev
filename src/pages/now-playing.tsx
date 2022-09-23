/* eslint-disable @next/next/no-img-element */

import Image from "next/future/image";
import { useState, useRef, useEffect } from "react";
import { useLanyardWs } from "use-lanyard";
import { PulseLoader } from "react-spinners";

import Wrapper from "~/components/Wrapper";

const DISCORD_ID = "758578599715405824";

// credit: Alistair Smith https://gist.github.com/alii/2d0772d39fd6ccb867fa9066ce9dd8a3
const useThrottle = <T,>(value: T, limit = 1000) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
};

const NowPlaying = () => {
  const data = useThrottle(useLanyardWs(DISCORD_ID));

  const [, rerender] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      rerender({});
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!data)
    return (
      <div className="flex items-center justify-center pt-24">
        <PulseLoader color="#f4cfdf" />
      </div>
    );

  const spotify = data.spotify;
  if (!spotify)
    return (
      <div className="flex items-center justify-center">
        <div className="hover:bg-[#1c1c1c] rounded-md p-8 transition-all duration-300 w-fit">
          <img
            src="/images/spotify.png"
            alt="Spotify's logo"
            width={100}
            height={100}
            className="mx-auto"
          />
          <p className="pt-4 text-2xl">Not playing Spotify currently</p>
        </div>
      </div>
    );

  const total = spotify.timestamps.end - spotify.timestamps.start;
  const progress =
    100 - (100 * (spotify.timestamps.end - new Date().getTime())) / total;

  return (
    <div className="flex items-center justify-center">
      <a
        href={`https://open.spotify.com/track/${spotify.track_id}`}
        target="_blank"
        rel="noreferrer"
      >
        <div className="flex flex-col items-center gap-4 hover:bg-[#1c1c1c] rounded-md p-8 transition-all duration-300 w-fit">
          <Image
            src={spotify.album_art_url}
            alt={spotify.song}
            width={250}
            height={250}
            className="rounded-md"
          />

          <div className="flex flex-col gap-y-2">
            <p className="font-medium sm:text-lg md:text-xl medium-text">
              {spotify.song}
            </p>
            <p className="sm:text-sm md:text-lg">
              {spotify.artist.replace(";", ",")}
            </p>
          </div>

          <div className="h-2.5 rounded-xl w-[300px] bg-t-pink/20">
            <div
              className="bg-t-pink h-2.5 rounded-xl transition-all ease-linear will-change-[width] duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </a>
    </div>
  );
};

const NowPlayingPage = () => {
  return (
    <Wrapper
      title="nexxel • now playing"
      description="Currently playing song on Spotify"
    >
      <h1 className="text-3xl font-bold bold-text pt-14 text-t-purple">
        Now Playing
      </h1>
      <p className="pt-1 text-slate-200">
        Currently playing song on Spotify. It is read from my Discord presence
        using{" "}
        <a
          href="https://github.com/Phineas/lanyard"
          target="_blank"
          rel="noreferrer"
          className="font-medium transition-opacity duration-300 medium-text text-t-pink hover:opacity-90"
        >
          Lanyard
        </a>
        . Updates in real time!
      </p>

      <div className="pt-8" />

      <NowPlaying />
    </Wrapper>
  );
};

export default NowPlayingPage;
