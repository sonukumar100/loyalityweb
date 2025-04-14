export namespace GenericNS {
  export type LoadingType = boolean;
  export type ErrorType = null | string[];
  export type ValidatorError = {
    value: string;
    msg: string;
    param: string;
    location: string;
  };
}