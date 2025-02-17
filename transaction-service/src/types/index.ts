export type transactionType = {
  accountExternalIdDebit: string;
  accountExternalIdCredit: string;
  tranferTypeId: number;
  value: number;
};

export enum EVENTS {
  CREATED = "transaction-created",
  VALIDATED = "transaction-validated",
  APPROVED = "transaction-approved",
  REJECTED = "transaction-rejected",
}
