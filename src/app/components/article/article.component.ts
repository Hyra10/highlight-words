import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import TextSelectEvent from '../../shared/Interfaces/text-select-model.entity';
import { RepositoryService } from 'src/app/shared/services/repository/repository.service';
import article from './article';
import Utils from '../../shared/utils/utils';
import StorageData from '../../shared/models/storage-data.model';
import CommentModel from 'src/app/shared/Interfaces/comment-model.entity';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  highlightedEvent: TextSelectEvent;
  articleInnerHtml: string;

  showComment = false;
  showTooltip = false;

  private storage: StorageData;
  private tempId = '';

  constructor(private repo: RepositoryService) {
    this.storage = new StorageData();
    this.setCommentsAndLines();
  }

  ngOnInit(): void {
    this.repo.textSelected.subscribe((event: TextSelectEvent) => {
      this.onTextSelected(event);
    });

    this.repo.tooltipClicked.subscribe(() => {
      this.onTooltipClicked();
    });

    this.repo.commentClicked.subscribe((comment: CommentModel)  => {
      this.onCommentSaved(comment);
    });
  }

  /**
   * function that is called when the text selection event has fired
   * @param event includes the text selected, and host and viewport metadata
   */
  private onTextSelected(event: TextSelectEvent): void {

    if (this.showComment) {
      return;
    }

    if (!event.text) {
      this.showTooltip = false;
      return;
    }

    this.highlightedEvent = event;

    this.storage.viewportData = event.viewportData;
    this.storage.hostData = event.hostData;
    this.storage.firstIndex = event.firstIndex;
    this.storage.lastIndex = event.lastIndex;

    this.showTooltip = true;
  }

  /**
   * function that is called when the tooltip click event has fired
   */
  private onTooltipClicked(): void {
    this.tempId = Utils.newGuid();
    this.articleInnerHtml = Utils.addHighlightedLine(
      this.articleInnerHtml, this.storage.firstIndex, this.storage.lastIndex
    );

    this.storage.clientId = this.tempId;
    this.storage.comment.editable = true;
    this.showComment = true;
    this.showTooltip = false;

    this.repo.allStorageData.push(this.storage);
  }

  /**
   * function that is called when the save button event has fired
   * @param comment includes the comment and if comment is editable
   */
  private onCommentSaved(comment: CommentModel): void {
    this.storage.comment = comment;

    this.showComment = false;
    this.repo.setNewStorageData(this.storage);
    this.storage = new StorageData();
  }

  /**
   * function that sets the initial highlighted lines and comments
   */
  private setCommentsAndLines() {
    this.repo.allStorageData = this.repo.getStorageData();
    this.articleInnerHtml = Utils.addAllHighlightedLines(article.text, this.repo.allStorageData);
  }
}
