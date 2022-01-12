import { Injectable, EventEmitter } from '@angular/core';
import TextSelectModel from '../../Interfaces/text-select-model.entity';
import LocalStorageHelper from '../../utils/storageHelper';
import { UserModel, StorageModel } from '../../Interfaces/storage-model.entity';
import { UserData } from '../../models/storage-data.model';
import CommentModel from '../../Interfaces/comment-model.entity';
import { AuthRepositoryService } from '../auth-repository/auth-repository.service';

@Injectable({ providedIn: 'root' })
export class RepositoryService {

  readonly articleData = 'articleData';
  allStorageData: StorageModel[];

  textSelected = new EventEmitter<TextSelectModel>();
  tooltipClicked = new EventEmitter<TextSelectModel>();
  commentClicked = new EventEmitter<CommentModel>();

  constructor(private authRepo: AuthRepositoryService) { }

  /**
   * checks if data for a  specific user exists if not
   * it sets the new data related to the user and saves it into the local storage
   * @param data the comment specific data
   */
  setNewStorageData(data: StorageModel): void {
    const userId = (LocalStorageHelper.get(this.authRepo.userId) || '') as string;
    const newData = this.allStorageData.map(sd => sd.clientId === data.clientId ? data : sd);
    const allData = this.getAllData();
    let uData = allData.find(x => x.userId === userId)  || new UserData();

    if (uData.userId === '') {
      uData = new UserData(userId, newData);
      allData.push(uData);
    } else {
      uData.storage = newData;
    }

    LocalStorageHelper.add(this.articleData, allData);

    this.allStorageData = newData;
  }

  /**
   * retrieves the user data and stores it into the allStorageData variable
   */
  getStorageData(): StorageModel[] {
    this.allStorageData = (this.getUserData() || { storage: []}).storage;

    return this.allStorageData;
  }

  /**
   * gets all the lists of users with the storage info inside
   */
  private getAllData(): UserModel[] {
    return (LocalStorageHelper.get(this.articleData) as UserModel[]) || [];
  }

  /**
   * gets user data and filter the list with given Id
   */
  private getUserData(): UserModel {
    const userId = LocalStorageHelper.get(this.authRepo.userId);
    return this.getAllData().find(x => x.userId === userId);
  }

}
