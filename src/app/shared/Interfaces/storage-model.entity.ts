import SelectionModel from './selection-model.entity';
import CommentModel from './comment-model.entity';

export interface UserModel {
  userId: string;
  storage: StorageModel[];
}

export interface StorageModel {
  clientId: string;
  firstIndex: number | null;
  lastIndex: number | null;
  comment: CommentModel | null;
  viewportData: SelectionModel | null;
  hostData: SelectionModel | null;
}
