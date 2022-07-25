import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/api/") ||
    req.nextUrl.pathname === "/"
  ) {
    return;
  }
  const slug = req.nextUrl.pathname.split("/").pop();

  const fetchSlug = await fetch(`${req.nextUrl.origin}/api/get-link/${slug}`);

  if (fetchSlug.status === 404) {
    return NextResponse.redirect(req.nextUrl.origin);
  }

  const data = await fetchSlug.json();

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }
}
