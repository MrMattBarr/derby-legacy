export enum OfferStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
  REVOKED = "revoked",
}

export type Offer = {
  id: string;
  created: number;
  status: OfferStatus;
  acceptedDate?: number;
  role: string;
  talent?: string;
  owner: string;
};
