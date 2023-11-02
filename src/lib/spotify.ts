import { z } from "zod";

export async function getAccessToken(): Promise<{ access_token: string }> {
  const refreshToken = import.meta.env.SPOTIFY_REFRESH_TOKEN;
  const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${clientId}:${clientSecret}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const { access_token } = z
    .object({
      access_token: z.string(),
    })
    .parse(await response.json());

  return { access_token };
}

export async function getTopTracks() {
  const { access_token } = await getAccessToken();

  const response = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  ).then((res) => res.json());

  const { items } = z
    .object({
      items: z.array(
        z.object({
          artists: z.array(
            z.object({
              name: z.string(),
            })
          ),
          album: z.object({
            name: z.string(),
            images: z.array(
              z.object({
                url: z.string(),
              })
            ),
          }),
          external_urls: z.object({
            spotify: z.string(),
          }),
          name: z.string(),
        })
      ),
    })
    .parse(response);

  return items.slice(0, 5).map((item) => ({
    artists: item.artists,
    songUrl: item.external_urls.spotify,
    title: item.name,
    album: item.album.name,
    image: item.album.images[0].url,
  }));
}

export async function getFollowersOfArtistFromId(id: string) {
  const { access_token } = await getAccessToken();

  const response = await fetch(
    `https://api.spotify.com/v1/artists/${id}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  ).then((res) => res.json());

  const { followers } = z
    .object({
      followers: z.object({
        total: z.number(),
      }),
    })
    .parse(response);

  return followers.total;
}

export async function getTopArtists() {
 const { access_token } = await getAccessToken();

 const response = await fetch(
    "https://api.spotify.com/v1/me/top/artists?time_range=short_term",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  ).then((res) => res.json());

  const { items } = z
    .object({
      items: z.array(
        z.object({
          name: z.string(),
          images: z.array(
            z.object({
              url: z.string(),
            })
          ),
          external_urls: z.object({
            spotify: z.string(),
          }),
          followers: z.object({
            total: z.number(),
          }),
        })
      ),
    })
    .parse(response);


  return items.slice(0, 5).map((item) => ({
    name: item.name,
    url: item.external_urls.spotify,
    image: item.images[0].url,
    followers: item.followers.total,
    id: getFollowersOfArtistFromId(item.external_urls.spotify.split("/")[item.external_urls.spotify.split("/").length - 1]),
  }));
}