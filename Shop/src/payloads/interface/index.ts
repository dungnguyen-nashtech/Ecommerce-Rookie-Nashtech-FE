export interface IHeaderItem {
  name: string,
  path: string,
  children?: IHeaderItem[]
}

export interface IFieldRequestDto {
  field: string;
  operator: string;
  value: string;
}