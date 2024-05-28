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

export interface IFormLogin {
  email: string;
  password: string;
}

export interface IFormRegister {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}