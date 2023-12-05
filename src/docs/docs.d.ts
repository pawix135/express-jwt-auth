export type DocSubsection = {
  title: string;
  subtitle?: string;
  request: {
    http: string;
    headers?: string[];
  };
  requestBody?: string;
  responseBody: string;
};

export type DocSection = {
  title: string;
  basePath: string;
  subsection: DocSubsection[];
};

export interface Docs {
  title: string;
  sections: DocSection[];
}
