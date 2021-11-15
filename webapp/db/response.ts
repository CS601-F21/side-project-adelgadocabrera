export function success<DataType>(data: DataType) {
  return builder(200, data, undefined);
}

export function failure<DataType>(errMsg: string) {
  return builder<DataType>(400, undefined, errMsg);
}

function builder<DataType>(
  statusCode: number,
  data?: DataType,
  errMsg?: string
) {
  return {
    statusCode,
    data,
    errMsg,
  };
}

export interface Response<DataType> {
  statusCode: number;
  data: DataType;
  errMsg: string;
}
