export interface QueryOptions {
  skip?: number;
  limit?: number;
  sort?: Sort;
}
export interface Sort {
  [key: string]: number;
}

export interface AnyObject {
  [key: string]: number | string | boolean | AnyObject;
}
