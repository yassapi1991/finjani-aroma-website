const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const ADMIN_SESSION_COOKIE = "finjani_admin_session";
export const ADMIN_LOGIN_PATH = "/admin/login";
export const ADMIN_DASHBOARD_PATH = "/admin";
export const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

interface AdminSessionPayload {
  email: string;
  exp: number;
  iat: number;
}

function getAdminEmail() {
  return process.env.ADMIN_EMAIL?.trim() ?? "";
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

function getAuthSecret() {
  return process.env.AUTH_SECRET?.trim() ?? process.env.ADMIN_SESSION_SECRET?.trim() ?? "";
}

function toBase64Url(bytes: Uint8Array) {
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  const binary = atob(`${normalized}${padding}`);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function safeEqual(left: string, right: string) {
  if (left.length !== right.length) {
    return false;
  }

  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return mismatch === 0;
}

async function getSigningKey() {
  const secret = getAuthSecret();

  if (!secret) {
    throw new Error("Missing AUTH_SECRET or ADMIN_SESSION_SECRET");
  }

  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export function isAdminAuthConfigured() {
  return Boolean(getAdminEmail() && getAdminPassword() && getAuthSecret());
}

export async function verifyAdminCredentials(email: string, password: string) {
  if (!isAdminAuthConfigured()) {
    return false;
  }

  return safeEqual(email.trim().toLowerCase(), getAdminEmail().toLowerCase()) && safeEqual(password, getAdminPassword());
}

export async function createAdminSessionToken(email: string) {
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSessionPayload = {
    email,
    iat: now,
    exp: now + ADMIN_SESSION_TTL_SECONDS,
  };

  const payloadBytes = encoder.encode(JSON.stringify(payload));
  const key = await getSigningKey();
  const signature = await crypto.subtle.sign("HMAC", key, payloadBytes);

  return `${toBase64Url(payloadBytes)}.${toBase64Url(new Uint8Array(signature))}`;
}

export async function verifyAdminSessionToken(token?: string | null) {
  if (!token) {
    return null;
  }

  const [payloadPart, signaturePart] = token.split(".");
  if (!payloadPart || !signaturePart) {
    return null;
  }

  try {
    const payloadBytes = fromBase64Url(payloadPart);
    const signatureBytes = fromBase64Url(signaturePart);
    const key = await getSigningKey();
    const isValid = await crypto.subtle.verify("HMAC", key, signatureBytes, payloadBytes);

    if (!isValid) {
      return null;
    }

    const payload = JSON.parse(decoder.decode(payloadBytes)) as AdminSessionPayload;
    const now = Math.floor(Date.now() / 1000);

    if (!payload.email || payload.exp <= now) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function getAdminSessionFromCookieStore(
  cookieStore: { get: (name: string) => { value: string } | undefined }
) {
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminSessionToken(token);
}
