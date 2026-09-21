export function buildExecutionRequest(functionName: string, parameters?: unknown[], devMode?: boolean) { return { function: functionName, ...(parameters ? { parameters } : {}), ...(devMode !== undefined ? { devMode } : {}) }; }
export function buildPaginationQuery(pageSize?: number, pageToken?: string): Record<string, string | number | undefined> { return { pageSize, pageToken }; }
