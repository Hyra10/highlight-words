import { UserModel, StorageModel } from '../Interfaces/storage-model.entity';
import SelectionModel from '../Interfaces/selection-model.entity';
import CommentData from './comment-data.model';
import SelectionData from './selection-data.model';
import CommentModel from '../Interfaces/comment-model.entity';


export class UserData implements UserModel {
  constructor(
    public userId: string = '',
    public storage: StorageModel[] = [new StorageData()]) {}
}

export default class StorageData implements StorageModel {

  constructor(
    public clientId: string = '',
    public firstIndex: number = 0,
    public lastIndex: number = 0,
    public comment: CommentModel = new CommentData(),
    public viewportData: SelectionModel = new SelectionData(),
    public hostData: SelectionModel = new SelectionData()) {}
}
