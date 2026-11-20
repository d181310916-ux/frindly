export type Language = 'en' | 'ar';

export type ProductCategory =
  | 'mini-sandwiches'
  | 'finger-sandwiches'
  | 'mini-croissants'
  | 'mini-clubs'
  | 'premium-sandwiches'
  | 'ready-made-boxes'
  | 'group-boxes'
  | 'bakery-croissants'
  | 'cakes-desserts'
  | 'chocolates-gifts'
  | 'catering-events'
  // Backward compatibility aliases
  | 'individual-boxes'
  | 'bakery-cakes';

export interface LocalizedString {
  en: string;
  ar: string;
}

export interface ProductOption {
  id: string;
  name: LocalizedString;
  priceDelta: number;
}

export interface Product {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  offerEndsAt?: string;
  image: string;
  additionalImages?: string[];
  stock: number;
  isAvailable: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  ingredients?: LocalizedString;
  allergens?: LocalizedString;
  servingSize?: LocalizedString;
  options?: ProductOption[];
  minPeople?: number;
  maxPeople?: number;
  boxContents?: LocalizedString; // For ready-made boxes
  breadOptions?: string[]; // For premium sandwiches
  piecesCountOptions?: number[]; // E.g. [12, 24, 48, 96]
}

export interface CustomBoxItem {
  productId: string;
  quantity: number;
  name: LocalizedString;
  price: number;
  category: string;
}

export interface CustomBoxConfig {
  id: string;
  boxSize: 'individual' | 'small' | 'medium' | 'large' | 'party' | 'corporate';
  boxSizeName: LocalizedString;
  peopleCount: number;
  packagingStyle: 'classic-pink' | 'gold-ribbon' | 'wooden-hamper' | 'eco-kraft' | 'kids-party' | 'corporate';
  packagingName: LocalizedString;
  eventName?: string;
  items: CustomBoxItem[];
  specialMessage?: string;
  totalPrice: number;
  boxQuantity?: number; // Bulk number of identical custom boxes
}

export interface CartItem {
  id: string; // unique cart line id
  productId?: string;
  product?: Product;
  customBox?: CustomBoxConfig;
  quantity: number;
  selectedOptions?: ProductOption[];
  selectedBread?: string;
  specialInstructions?: string;
  unitPrice: number;
  totalPrice: number;
}

export type FulfillmentTiming = 'asap' | 'scheduled';

export interface CartSchedule {
  orderType: 'delivery' | 'pickup';
  timingMode: FulfillmentTiming;
  scheduledDate: string;
  scheduledTimeSlot: string;
  customTime?: string;
}

export type OrderStatus =
  | 'new'
  | 'confirmed'
  | 'preparing'
  | 'ready_for_pickup'
  | 'out_for_delivery'
  | 'completed'
  | 'cancelled';

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  notes?: string;
  organization?: string;
}

export interface Order {
  id: string; // unique order code e.g. FT-2026-8941
  createdAt: string;
  customer: CustomerInfo;
  orderType: 'delivery' | 'pickup';
  deliveryDate: string;
  deliveryTimeSlot: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: 'cash_on_delivery' | 'bank_transfer' | 'card_online';
  paymentStatus: 'pending' | 'verified' | 'paid';
  status: OrderStatus;
  statusNotes?: string;
  isBulkOrder?: boolean;
}

export interface CateringRequest {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email: string;
  eventType: 'birthday' | 'family_gathering' | 'office_meeting' | 'corporate_event' | 'school_university' | 'conference' | 'wedding_celebration';
  guestCount: number;
  eventDate: string;
  location: string;
  estimatedBudget?: string;
  requestedCategories: ProductCategory[];
  specialRequirements: string;
  status: 'pending' | 'quoted' | 'approved' | 'converted_to_order' | 'declined';
  quoteAmount?: number;
  adminNotes?: string;
}

export interface BulkQuotationRequest {
  id: string;
  createdAt: string;
  customerName: string;
  organizationName?: string;
  phone: string;
  email: string;
  boxType: 'ready_made' | 'custom_box' | 'sandwich_platters';
  targetBoxName?: string;
  boxQuantity: number; // 50, 100, 200, 500+
  eventDate: string;
  deliveryAddress: string;
  eventType: string;
  specialInstructions?: string;
  status: 'pending' | 'under_review' | 'quoted' | 'approved' | 'converted_to_order' | 'declined';
  quotedUnitPrice?: number;
  quotedTotal?: number;
  adminNotes?: string;
}

export interface BoxTemplate {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  category: 'ready-made' | 'custom-size';
  basePrice: number;
  capacity: number;
  defaultContents?: LocalizedString;
  image: string;
  isAvailable: boolean;
  minOrderQuantity: number;
  maxOrderQuantity: number;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  expiresAt: string;
  isActive: boolean;
  usageCount: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  wishlist?: string[];
  savedAddresses: Array<{
    id: string;
    label: string;
    address: string;
    city: string;
  }>;
}

export interface StoreSettings {
  storeName: LocalizedString;
  tagline: LocalizedString;
  whatsappNumber: string;
  supportPhone: string;
  supportEmail: string;
  address: LocalizedString;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  bankDetails: {
    bankName: string;
    accountName: string;
    iban: string;
  };
  announcementEn: string;
  announcementAr: string;
  currency: string; // e.g. 'EGP'
}

export interface InventoryItem {
  id: string;
  name: string;
  nameAr: string;
  stock: number;
  minThreshold: number;
}
