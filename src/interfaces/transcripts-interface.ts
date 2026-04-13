export interface TranscriptsResponse {
  message: string;
  query: string;
  transcripts: Transcript[];
}
export interface TranscriptsResponseError {
  detail: TranscriptsResponse;
}

export interface Transcript {
  text: string;
  videoId: string;
  duration?: number;
  start: number;
}
