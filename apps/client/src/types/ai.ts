export interface IAiParseResponse {
  company?: string;
  role?: string;
  required_skills?: string[];
  nice_to_have_skills?: string[];
  seniority?: string;
  location?: string;
}

export interface IAiSuggestResponse {
  bullets?: string[];
}
