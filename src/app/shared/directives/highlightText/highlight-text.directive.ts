
import { Directive, ElementRef, HostListener } from '@angular/core';
import SelectionModel from '../../Interfaces/selection-model.entity';
import { RepositoryService } from '../../services/repository/repository.service';
import SelectionData from '../../models/selection-data.model';

@Directive({
  selector: '[appTextSelect]',
})
export class HighlightTextDirective {

  private elementRef: ElementRef;
  private selected: boolean;

  constructor(elementRef: ElementRef, private repo: RepositoryService) {
    this.elementRef = elementRef;
    this.selected = false;
  }

  /**
   * get the parent container node
   * @param range the container where we selected the text
   * @returns the parent container node
   */
  private getRangeContainer(range: Range): Node {
    let container = range.commonAncestorContainer;

    while (container.nodeType !== Node.ELEMENT_NODE) {
      container = container.parentNode;
    }

    return container;
  }

  /**
   * the mouse up event that listens when we release the click after text selection
   * this listener is disposed automatically by angular
   * no need to dispose it when using host listener
   */
  @HostListener('mouseup') handleMouseup = (): void => {
    this.processSelection();
  }

  /**
   * it gets the viewport and host rectangle metada
   * it also gets the text selection
   * it emits a event with the data recolected
   */
  private processSelection(): void {

    const selection = document.getSelection();

    if (this.selected) {
      this.selected = false;
      this.repo.textSelected.emit({
        firstIndex: 0,
        lastIndex: 0,
        text: '',
        viewportData: null,
        hostData: null
      });
      return;
    }

    if (!selection.rangeCount || !selection.toString()) {
      return;
    }

    const selectionFromParent = this.getFlatSelectionFromParent(selection, this.elementRef.nativeElement.children[0]);
    const lowerIndex = Math.min(selection.anchorOffset, selection.focusOffset);
    const selectionLength = selection.toString().length;
    let firstIndex = 0;
    let lastIndex = 0;

    if (lowerIndex === selection.focusOffset) {
      firstIndex = selectionFromParent - selectionLength;
      lastIndex = selectionFromParent;
    } else {
      firstIndex = selectionFromParent;
      lastIndex = selectionFromParent + selectionLength;
    }

    const range = selection.getRangeAt(0);
    const rangeContainer = this.getRangeContainer(range);

    if (this.elementRef.nativeElement.contains(rangeContainer)) {

      const viewportRectangle = range.getBoundingClientRect();
      const localRectangle = this.viewportToHost(viewportRectangle, rangeContainer);

      this.selected = true;
      this.repo.textSelected.emit({
        firstIndex,
        lastIndex,
        text: selection.toString(),
        viewportData: new SelectionData(
          viewportRectangle.left, viewportRectangle.top, viewportRectangle.width, viewportRectangle.height),
        hostData: new SelectionData(
          localRectangle.left, localRectangle.top, localRectangle.width, localRectangle.height)
      });
    }
  }

  /**
   * gets the rectagle of the viewport
   * @param viewportRectangle the left, right, width and height of the viewport metadata
   * @param rangeContainer the parent node where the text is contained
   * @returns the left, right, width and height of the host metadata
   */
  private viewportToHost(viewportRectangle: SelectionModel, rangeContainer: Node): SelectionModel {

    const host = this.elementRef.nativeElement;
    const hostRectangle = host.getBoundingClientRect();

    let left = (viewportRectangle.left - hostRectangle.left);
    let top = (viewportRectangle.top - hostRectangle.top);
    let node = rangeContainer;

    while (node !== host) {
      left += (node as Element).scrollLeft;
      top += (node as Element).scrollTop;
      node = node.parentNode;
    }

    return({
      left,
      top,
      width: viewportRectangle.width,
      height: viewportRectangle.height
    });
  }

  /**
   * gets the index of the selected text from the parent node
   * @param sel the selection of the current text
   * @param rootElement the parent element hosting the whole text
   * @returns the offset
   */
  private getFlatSelectionFromParent(sel: Selection, rootElement: HTMLElement): number {
    let selectionOffset = -1;

    if (!sel) {
      return selectionOffset;
    }

    let selNode = sel.anchorNode;

    if (selNode && rootElement.contains(selNode)) {

      for (selectionOffset = sel.anchorOffset || (selNode.nodeType === Node.ELEMENT_NODE ? (selNode as HTMLElement).innerText.length : 0);
        selNode !== rootElement;
        selNode = selNode.parentNode as Node) {
        for (let sibling = selNode.previousSibling; sibling; sibling = sibling.previousSibling) {
          switch (sibling.nodeType) {
            case Node.ELEMENT_NODE:
              selectionOffset += ((sibling as HTMLElement).outerHTML).length;
              break;
            case Node.TEXT_NODE:
              selectionOffset += (sibling.nodeValue || '').length;
              break;
          }
        }
      }
    }

    return selectionOffset;
  }
}
