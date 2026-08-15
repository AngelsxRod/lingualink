import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Alcance intencionalmente acotado: hoy no existe ninguna página que requiera bloqueo
// total (todo es público, solo se oculta UI). Este proxy solo evita que alguien ya
// autenticado vea las pantallas de login/register — el gate de seguridad real sigue
// siendo el backend (JwtAuthGuard/PermissionsGuard).
export async function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  if (!token) {
    return NextResponse.next();
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return NextResponse.next();
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return NextResponse.redirect(new URL("/", request.url));
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/auth/login", "/auth/register"],
};
