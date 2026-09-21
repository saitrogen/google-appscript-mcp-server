export type AppsScriptFileType = "SERVER_JS" | "HTML" | "JSON";
export interface AppsScriptFile { name: string; type: AppsScriptFileType; source?: string }
export interface ProjectContent { scriptId?: string; files?: AppsScriptFile[] }
