export type PromptRecord = {
  description: string;
  rows: number;
  columns: number;
  colorScheme: 'fitzgerald' | 'something-else' | 'foo';
  shouldUsePictonizer: boolean;
};
