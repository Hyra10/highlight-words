import SelectionModel from '../Interfaces/selection-model.entity';

export default class SelectionData implements SelectionModel {

  constructor(
    public left: number = 0,
    public top: number = 0,
    public width: number = 0,
    public height: number = 0) {

  }
}
