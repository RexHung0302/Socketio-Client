export interface MessageType {
  id: string;
  name: string;
  data: TextType | ImageType | VoiceType;
  create_at: Date;
}

// 各種形式訊息樣式
// 文字
export interface TextType {
  type: "text";
  text: string;
}

// 圖片
export interface ImageType {
  type: "image";
  url: string;
  alt?: string;
  preview?: string; // 提示文字
}

// 聲音
export interface VoiceType {
  type: "voice";
  url: string;
  preview?: string; // 提示文字
}
