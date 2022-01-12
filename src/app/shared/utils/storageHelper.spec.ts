import LocalStorageHelper from './storageHelper';

describe('Storage Helper',  () => {
  beforeEach(() => {
    const store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => key in store ? store[key] : null,
      setItem: (key: string, value: any) => store[key] = `${value}`,
      removeItem: (key: string) => delete store[key],
    };

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
  });

  describe('add', () => {
    it('it should set add an item to the local Storage', () => {
      LocalStorageHelper.add('foo', true);

      expect(localStorage.setItem).toHaveBeenCalledWith('foo', 'true');
    });
  });

  describe('get', () => {
    it('it should get an item from the local Storage', () => {
      const data = LocalStorageHelper.get('foo');

      expect(localStorage.getItem).toHaveBeenCalledWith('foo');
      expect(data).toBeNull();
    });
  });


  describe('remove', () => {
    it('it should remove an item from local Storage', () => {
      LocalStorageHelper.remove('foo');

      expect(localStorage.removeItem).toHaveBeenCalledWith('foo');
    });
  });
});
