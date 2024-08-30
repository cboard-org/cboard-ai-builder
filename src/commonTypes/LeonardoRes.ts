export type LeonardoImage = {
  url: string;
  id: string;
  nsfw?: boolean;
  likeCount?: number;
  motionMP4URL?: string;
  generated_image_variation_generics?: [];
};

export type LeonardoData = {
  status: string;
  generated_images: LeonardoImage[];
  modelId: string;
  id: string;
  motion?: string;
  motionModel?: string;
  motionStrength?: string;
  prompt?: string;
  negativePrompt?: string;
  imageHeight?: number;
  imageToVideo?: string;
  imageWidth?: number;
  inferenceSteps?: number;
  seed?: number;
  public?: boolean;
  scheduler?: string;
  sdVersion?: string;
  presetStyle?: string;
  initStrength?: string;
  guidanceScale?: number;
  createdAt?: string;
  promptMagic?: boolean;
  promptMagicVersion?: string;
  promptMagicStrength?: string;
  photoReal?: boolean;
  photoRealStrength?: string;
  fantasyAvatar?: string;
  generation_elements?: [];
};

export type LeonardoRes = {
  generations_by_pk: LeonardoData;
};
