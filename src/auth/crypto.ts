function decodeBase64(input: string): Uint8Array {
  const binary = atob(input);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}
function encodeBase64(input: Uint8Array): string {
  let binary = "";
  for (const byte of input) binary += String.fromCharCode(byte);
  return btoa(binary);
}
export async function importEncryptionKey(base64: string): Promise<CryptoKey> {
  const raw = decodeBase64(base64);
  if (raw.byteLength !== 32) throw new Error("TOKEN_ENCRYPTION_KEY_BASE64 must decode to exactly 32 bytes");
  return crypto.subtle.importKey("raw", raw, "AES-GCM", false, ["encrypt", "decrypt"]);
}
export async function encryptString(key: CryptoKey, plaintext: string): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(plaintext)));
  return `${encodeBase64(iv)}.${encodeBase64(ciphertext)}`;
}
export async function decryptString(key: CryptoKey, payload: string): Promise<string> {
  const [ivPart, dataPart] = payload.split(".");
  if (!ivPart || !dataPart) throw new Error("Invalid encrypted token payload");
  const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv: decodeBase64(ivPart) }, key, decodeBase64(dataPart));
  return new TextDecoder().decode(plaintext);
}
