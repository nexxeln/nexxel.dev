/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "next/og";

export const runtime = "edge";

const geistBold = fetch(new URL("../Geist-Bold.otf", import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

const geistMonoRegular = fetch(
  new URL("../GeistMono-Regular.otf", import.meta.url),
).then((res) => res.arrayBuffer());

export async function GET(request: Request) {
  const geistBoldFont = await geistBold;
  const geistMonoRegularFont = await geistMonoRegular;

  try {
    const { searchParams } = new URL(request.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "My default title";

    // ?top=<top>
    const hasTop = searchParams.has("top");
    const top = hasTop
      ? searchParams.get("top")?.slice(0, 100)
      : "My default top";

    const lg = {
      fontSize: "72px",
      lineHeight: "80px",
      fontWeight: 800,
      fontFamily: "SwitzerBold",
      color: "#f4f4f5",
    };

    const md = {
      fontSize: "62px",
      lineHeight: "70px",
      fontWeight: 900,
      fontFamily: "SwitzerBold",
      color: "#f4f4f5",
    };

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#d4d4d8",
            background: "#18181b",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-between",
              width: "1200px",
              height: "630px",
              padding: "80px",
            }}
          >
            <p
              style={{
                fontFamily: "Geist Mono",
                fontSize: "28px",
                marginBottom: "25px",
              }}
            >
              {top}
            </p>

            <h1 style={title!.length < 60 ? lg : md}>{title}</h1>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <p
                style={{
                  fontFamily: "Geist Mono",
                  fontSize: "28px",
                }}
              >
                nexxel.dev
              </p>
              <img
                src="https://davidadarme.vercel.app/davidadarme.png"
                alt="nexxel's avatar"
                width={70}
                height={70}
                style={{
                  borderRadius: "100px",
                }}
              />
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Geist",
            data: geistBoldFont,
            style: "normal",
          },
          {
            name: "Geist Mono",
            data: geistMonoRegularFont,
            style: "normal",
          },
        ],
      },
    );
  } catch (e) {
    if (e instanceof Error) {
      console.log(`${e.message}`);
    } else {
      console.log("An unknown error occurred");
    }
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
