// * Main 화면에서 보여지는 Folder List Item의 Type
export interface FolderListItem {
  id: string;
  category: string;
  created_at: string;
}

// * 상세 페이지에서 보여지는 Data Type
export interface PreviewImage {
  name: string;
  size: number;
  type: string;
  url: string;
  path?: string;
}
export interface DetailItem {
  user_id: string;
  id: string;
  images: PreviewImage[];
  category: string;
  description: string;
  date_to: string;
  date_from: string;
  create_at: string;
}