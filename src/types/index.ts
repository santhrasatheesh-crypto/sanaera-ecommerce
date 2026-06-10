export interface IProduct {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  images: string[];
  category: string;
  categoryId: string;
  stock: number;
  sku: string;
  ratings?: number;
  reviews?: number;
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface IUser {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  image?: string;
  role: 'CUSTOMER' | 'ADMIN' | 'VENDOR';
  createdAt: Date;
}

export interface IAddress {
  id: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
  isDefault: boolean;
}

export interface ICartItem {
  id: string;
  productId: string;
  product: IProduct;
  quantity: number;
  size?: string;
  color?: string;
}

export interface IOrder {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  items: IOrderItem[];
  subtotal: number;
  tax: number;
  shippingCost: number;
  discountAmount: number;
  total: number;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderItem {
  id: string;
  productName: string;
  productImage?: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export interface ICoupon {
  id: string;
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
  maxDiscount?: number;
  minOrderValue?: number;
  validUntil: Date;
  isActive: boolean;
}

export interface IReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment?: string;
  isVerified: boolean;
  createdAt: Date;
}
