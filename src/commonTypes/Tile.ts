export type TileRecord = {
  id: string;
  nameKey?: string;
  label?: string;
  vocalization?: string;
  type?: string;
  backgroundColor?: string;
  labelKey?: string;
  image?: string;
  loadBoard?: string;
  sound?: string;
  linkedBoard?: boolean;
  borderColor?: string;
  suggestedImages?: string[] | null;
  generatedPicto?: {
    url: string;
    id: string | undefined;
    content: string;
    progress: string | undefined;
    proxy_url: string | undefined;
    changeImageIds: string[] | undefined;
  };
};

export type LabelPositionRecord = 'Above' | 'Below' | undefined;
