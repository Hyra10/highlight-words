import CommentModel from '../Interfaces/comment-model.entity';

export default class CommentData implements CommentModel {

  constructor(
    public text: string = '',
    public editable: boolean = false) {}
}
