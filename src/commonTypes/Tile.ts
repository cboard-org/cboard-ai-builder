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
};

export type LabelPositionRecord = 'Above' | 'Below' | undefined;
