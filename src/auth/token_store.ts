import { decryptString, encryptString, importEncryptionKey } from "./crypto.ts";
export interface TokenStore {
  getRefreshToken(): Promise<string | null>;
  setRefreshToken(token: string): Promise<void>;
  deleteRefreshToken(): Promise<void>;
  putOAuthState(state: string, expiresAt: number): Promise<void>;
  consumeOAuthState(state: string): Promise<boolean>;
}
export class KvTokenStore implements TokenStore {
  #keyPromise: Promise<CryptoKey>;
  constructor(private readonly kv: Deno.Kv, encryptionKeyBase64: string) { this.#keyPromise = importEncryptionKey(encryptionKeyBase64); }
  async getRefreshToken(): Promise<string | null> {
    const record = await this.kv.get<string>(["oauth", "google", "refresh_token"]);
    return record.value ? decryptString(await this.#keyPromise, record.value) : null;
  }
  async setRefreshToken(token: string): Promise<void> { await this.kv.set(["oauth", "google", "refresh_token"], await encryptString(await this.#keyPromise, token)); }
  async deleteRefreshToken(): Promise<void> { await this.kv.delete(["oauth", "google", "refresh_token"]); }
  async putOAuthState(state: string, expiresAt: number): Promise<void> { await this.kv.set(["oauth", "google", "state", state], expiresAt, { expireIn: Math.max(1000, expiresAt - Date.now()) }); }
  async consumeOAuthState(state: string): Promise<boolean> {
    const key: Deno.KvKey = ["oauth", "google", "state", state];
    const record = await this.kv.get<number>(key);
    if (!record.value || record.value < Date.now()) { await this.kv.delete(key); return false; }
    return (await this.kv.atomic().check(record).delete(key).commit()).ok;
  }
}
