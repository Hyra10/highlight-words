import { StorageModel } from '../Interfaces/storage-model.entity';

export default class Utils {

  /**
   * add the highlighted line to the current html file
   * @param currentText string containing all the  html for the article
   * @param firstIndex first index of the selected text
   * @param lastIndex last lndex of the selected text
   * @returns model that contains the first and last index plus the complete html text
   */
  static addHighlightedLine(currentText: string, firstIndex: number, lastIndex: number): string {

    const firstIteration = currentText.substring(0, firstIndex);
    const secondIteration = `<span class="highlighted">${currentText.substring(firstIndex, lastIndex)}</span>`;
    const thirdIteration = currentText.substring(lastIndex);

    return firstIteration + secondIteration + thirdIteration;

  }


  /**
   * add all the highlighted lines for the current html text
   * @param htmlText string containing all the  html for the article
   * @param data the data containing the data we have
   * @returns the html with the highlighted options
   */
  static addAllHighlightedLines(htmlText: string, data: StorageModel[]): string {

    let html = htmlText;
    data.forEach((commentData) => {
      html = Utils.addHighlightedLine(html, commentData.firstIndex, commentData.lastIndex);
    });

    return html;
  }

  /**
   * static class to generate new GUID to use for the clientId and the userId
   */
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;// tslint:disable-line
      const v = c === 'x' ? r : (r & 0x3 | 0x8);// tslint:disable-line
      return v.toString(16);
    });
  }

}
