export interface RevenueRecord {
  _id: string;
  userId: string;
  productType: string;
  sourceType: string;
  customerCount: number;
  productQuantity: number;
  revenue: number;
  reportDate: Date;
  createdAt: string;
}