import { Component, Input, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { RepositoryService } from 'src/app/shared/services/repository/repository.service';
import SelectionModel from 'src/app/shared/Interfaces/selection-model.entity';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements AfterViewInit {
  @Input() hostData: SelectionModel | null;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private repo: RepositoryService) {}

  ngAfterViewInit(): void {
    const div = this.elRef.nativeElement.children[0];

    this.renderer.setStyle(div, 'left', `${this.hostData.left + 20}px`);
    this.renderer.setStyle(div, 'top', `${this.hostData.top - 10 }px`);
    this.renderer.setStyle(div, 'width', `${this.hostData.width}px`);
  }

  /**
   * function that is called when we click on the tooltip
   * to prevent the text selection to be lost
   * @param event the click event
   */
  onMouseDown(event: Event): void {
    event.preventDefault();
  }

  /**
   * function that is called when we release the click
   * it stops the bubbling and calls shareSelection function
   * @param event the click event
   */
  onMouseUp(event: Event): void {
    event.stopPropagation();
    this.shareSelection();
  }

  /**
   * it emits an event and deselect what was already selected
   */
  private shareSelection(): void {
    this.repo.tooltipClicked.emit();
    document.getSelection().removeAllRanges();
  }

}
