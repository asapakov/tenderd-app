interface IWebSocketPayload {
  event: string;
  payload: any;
}

export interface IWebSocketData {
  message: IWebSocketPayload;
}
