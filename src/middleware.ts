import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  if (pathname === "/gh" || pathname === "/github") {
    return NextResponse.redirect("https://github.com/nexxeln");
  }
  const slug = pathname.split("/r/").pop();

  const fetchSlug = await fetch(`${origin}/api/get-link/${slug}`);

  if (fetchSlug.status === 404) {
    return NextResponse.redirect(origin);
  }

  const data = await fetchSlug.json();

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }
}

export const config = {
  matcher: ["/r/:path*", "/github", "/gh"],
};
