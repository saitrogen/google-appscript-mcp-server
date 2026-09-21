export class GoogleApiError extends Error {
  constructor(message: string, public readonly status: number, public readonly code?: string | number, public readonly details?: unknown) { super(message); this.name = "GoogleApiError"; }
}
export function errorResult(error: unknown) {
  if (error instanceof GoogleApiError) return { content: [{ type: "text" as const, text: `Google Apps Script API error (${error.status}): ${error.message}` }], structuredContent: { ok: false, error: { type: "google_api", status: error.status, code: error.code, message: error.message } }, isError: true };
  const message = error instanceof Error ? error.message : String(error);
  return { content: [{ type: "text" as const, text: message }], structuredContent: { ok: false, error: { type: "internal", message } }, isError: true };
}
