import { HighlightTextDirective } from './highlight-text.directive';
import { StorageModel } from '../../Interfaces/storage-model.entity';

describe('HighlightTextDirective', () => {
  let elRefMock: any;
  let serviceMock: any;

  beforeEach(() => {
    elRefMock = {
      nativeElement: document.createElement('div')
    };

    serviceMock = {
      setNewStorageData: (data: StorageModel) => {},
      getStorageData: () => {},
      getAllData: () => {},
      getUserData: () => {},
    };
  });
  it('should create an instance', () => {
    const directive = new HighlightTextDirective(elRefMock, serviceMock);
    expect(directive).toBeTruthy();
  });
});
