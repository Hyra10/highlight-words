import Utils from './utils';
import StorageData from '../models/storage-data.model';

describe('Utils', () => {
  const html = 'the html for the article';

  describe('addHighlightedLine', () => {
    it('it should return the html with the highlighted tag', () => {
      const finalHtml = Utils.addHighlightedLine(html, 4, 8);

      expect(finalHtml).toEqual('the <span class="highlighted">html</span> for the article',);
    });
  });

  describe('newGuid', () => {
    it('it should return a random Guid', () => {
      const guid = Utils.newGuid();

      expect(guid).not.toEqual('');
    });
  });

});
