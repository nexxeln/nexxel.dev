import Image from "next/future/image";
import Cyling from "../../public/images/cycling.webp";
import Wrapper from "~/components/Wrapper";
import { GetStaticProps, NextPage } from "next";

type Track = {
  artist: string;
  url: string;
  title: string;
  img: string;
};

export const getStaticProps: GetStaticProps = async () => {
  const topTracks = await fetch("https://s.nxl.sh/tracks").then((response) => {
    return response.json();
  });

  return {
    props: {
      topTrack: topTracks.tracks[0],
    },
    revalidate: 60 * 60 * 24,
  };
};

const linkStyles =
  "font-medium medium-text text-t-pink hover:opacity-90 transition-opacity duration-300";

const boldStyles = "font-medium medium-text";

const AboutPage: NextPage<{ topTrack: Track }> = ({ topTrack }) => {
  return (
    <Wrapper title="nexxel • about" description="Learn more about me">
      <h1 className="bold-text pt-14 text-3xl font-bold text-t-purple">
        About Me
      </h1>

      <div className="pt-6" />

      <div className="text-lg">
        <p>
          Hi, I&apos;m <span className={boldStyles}>Shoubhit</span>, commonly
          known as{" "}
          <a
            href="https://why.nexxel.dev/"
            rel="noreferrer"
            target="_blank"
            className={linkStyles}
          >
            nexxel
          </a>{" "}
          online. I&apos;m from and live&nbsp;(for now) in India. We got
          Computer Science in our school in 5th grade, and since then it has
          been my favourite subject at school, even though they taught us Java
          which is not so enjoyable.
          <br />
          <br />
          In <span className={boldStyles}>2021</span> I started learning{" "}
          <span className={boldStyles}>Python</span> from{" "}
          <a
            href="https://www.freecodecamp.org/"
            rel="noreferrer"
            target="_blank"
            className={linkStyles}
          >
            freeCodeCamp
          </a>{" "}
          in my free time because I felt like I was just wasting a lot of time,
          so I wanted to learn stuff that I will actually use in my life. I made
          some <span className={boldStyles}>Discord bots</span>, wrote some{" "}
          <span className={boldStyles}>cool scripts</span>. Eventually I got
          into <span className={boldStyles}>web development</span> and I love
          it, the frontend, the backend, all of it. Lately I&apos;ve been
          dwelling into some <span className={boldStyles}>Rust</span> and{" "}
          <span className={boldStyles}>Go</span> as well because I think thats
          the future. I haven&apos;t gotten into it a lot because frankly I have
          no time.
          <br />
          <br />
          I&apos;m currently in <span className={boldStyles}>
            12th grade
          </span>{" "}
          and preparing for{" "}
          <a
            href="https://en.wikipedia.org/wiki/Joint_Entrance_Examination"
            rel="noreferrer"
            target="_blank"
            className={linkStyles}
          >
            JEE
          </a>{" "}
          which is an entrance exam for good engineering colleges in India, so
          most of my time goes into studying for it. I&apos;m hoping to study
          Computer Science in college.
          <br />
          <br />
          For hobbies other than coding, I really like performing{" "}
          <a
            href="https://en.wikipedia.org/wiki/Magic_(illusion)"
            rel="noreferrer"
            target="_blank"
            className={linkStyles}
          >
            magic
          </a>
          ,{" "}
          <a
            href="https://en.wikipedia.org/wiki/Mentalism"
            rel="noreferrer"
            target="_blank"
            className={linkStyles}
          >
            mentalism
          </a>
          &nbsp;(yes I can read your mind (kind of)) and I dabble into some{" "}
          <a
            href="https://www.youtube.com/watch?v=wx_dnEen2xQ"
            rel="noreferrer"
            target="_blank"
            className={linkStyles}
          >
            cardistry
          </a>{" "}
          as well.
          <br />
          <br />I also like going on{" "}
          <span className={boldStyles}>cycling trips</span> with friends.
          Here&apos;s a picture from when we went to see the sunrise in the
          mountains.
          <br />
          <br />
          <Image
            src={Cyling}
            alt="A picture from a cycling trip with friends."
            className="aspect-w-1 rounded-md"
            width={600}
            placeholder="blur"
            height={300}
          />
          <br />I used to like reading novels but I haven&apos;t read one for a
          long time now, simply because I have no time. My favourite author is{" "}
          <a
            href="https://en.wikipedia.org/wiki/John_Green"
            rel="noreferrer"
            target="_blank"
            className={linkStyles}
          >
            John Green
          </a>
          .
          <br />
          <br />I listen to a lot of music and it has always been a big part of
          my life.{" "}
          <a
            href="https://open.spotify.com/artist/6bmlMHgSheBauioMgKv2tn?si=RoqNOQkQTaSoSmNIARTkHA"
            rel="noreferrer"
            target="_blank"
            className={linkStyles}
          >
            Powfu
          </a>
          ,{" "}
          <a
            href="https://open.spotify.com/artist/5Jf6pl4SGgueZHZ4pC313c?si=zzNFVAZzSTKbwXIri_7aMw"
            rel="noreferrer"
            target="_blank"
            className={linkStyles}
          >
            heylog
          </a>
          , and{" "}
          <a
            href="https://open.spotify.com/artist/1vwwjIPFeYoRfAUCqqO6cZ?si=VGnmIxdZQdCmtYiqVQGpZA"
            rel="noreferrer"
            target="_blank"
            className={linkStyles}
          >
            44phantom
          </a>{" "}
          are some of my favourite artists. My most played song recently has
          been{" "}
          <a
            href={topTrack.url}
            rel="noreferrer"
            target="_blank"
            className={linkStyles}
          >
            {topTrack.title}
          </a>{" "}
          by <span className={boldStyles}>{topTrack.artist}</span>. You can see
          more of my Spotify stats at{" "}
          <a
            href="https://s.nxl.sh/"
            rel="noreferrer"
            target="_blank"
            className={linkStyles}
          >
            s.nxl.sh
          </a>
          .
        </p>
      </div>
    </Wrapper>
  );
};

export default AboutPage;
