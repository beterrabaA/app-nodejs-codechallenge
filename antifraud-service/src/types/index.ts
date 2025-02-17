export enum EVENTS {
  CREATED = "transaction-created",
  VALIDATED = "transaction-validated",
  APPROVED = "transaction-approved",
  REJECTED = "transaction-rejected",
}

export interface TrMessage {
  id: string;
  value: number;
}
