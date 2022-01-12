import SelectionModel from './selection-model.entity';

export default interface TextSelectModel {
  firstIndex: number;
  lastIndex: number;
  text: string;
  viewportData: SelectionModel | null;
  hostData: SelectionModel | null;
}
