export enum OfferStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REVOKED = "revoked",
}

export type Offer = {
  id: string;
  created: number;
  status: OfferStatus;
  acceptedDate?: number;
  role: string;
  owner: string;
};
