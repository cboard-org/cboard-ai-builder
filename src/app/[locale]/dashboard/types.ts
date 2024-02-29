export type Prompt = {
  description: string;
  rows: number;
  columns: number;
  colorScheme: 'fitzgerald' | 'something-else' | 'foo';
  shouldUsePictonizer: boolean;
};

export type Board = {
  id: string;
  name: string;
  tiles: object[];
};
