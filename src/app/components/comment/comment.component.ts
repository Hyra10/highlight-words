import { Component, AfterViewInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { RepositoryService } from 'src/app/shared/services/repository/repository.service';
import SelectionModel from 'src/app/shared/Interfaces/selection-model.entity';
import CommentData from 'src/app/shared/models/comment-data.model';
import CommentModel from 'src/app/shared/Interfaces/comment-model.entity';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements AfterViewInit {
  @Input() comment: CommentModel;
  @Input() hostData: SelectionModel;

  constructor(private repo: RepositoryService, private elRef: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    const div = this.elRef.nativeElement.children[0];
    const divHeight = div.getBoundingClientRect() as ClientRect;
    const top = this.hostData.top - (divHeight.height / 4);

    this.renderer.setStyle(div, 'top', `${top}px`);
  }

  /**
   * function that is called when we click the save button
   */
  onClickComment(): void {
    this.comment.editable = false;
    this.repo.commentClicked.emit(new CommentData(this.comment.text));
  }

  onEditComment(): void {
    this.comment.editable = true;
  }

}
