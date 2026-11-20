import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Language,
  Product,
  CartItem,
  Order,
  OrderStatus,
  CateringRequest,
  Coupon,
  StoreSettings,
  UserProfile,
  ProductCategory,
  CustomBoxConfig,
  BulkQuotationRequest,
  BoxTemplate,
  InventoryItem,
  CartSchedule,
} from '../types';
import {
  initialProducts,
  initialStoreSettings,
  initialCoupons,
  initialOrders,
  initialCateringRequests,
  initialBulkQuotations,
  initialBoxTemplates,
  initialPackagingSupplies,
  demoUser,
} from '../data/mockData';
import { translations } from '../translations';
import { testFirebaseConnection } from '../firebase/config';
import {
  getLiveProducts,
  addLiveProduct,
  updateLiveProduct,
  deleteLiveProduct,
  getLiveOrders,
  addLiveOrder,
  updateLiveOrderStatus,
  getLiveCateringRequests,
  addLiveCateringRequest,
  updateLiveCateringStatus,
  getLiveCoupons,
  addLiveCoupon,
  updateLiveCoupon,
  toggleLiveCoupon,
  deleteLiveCoupon,
  getLiveStoreSettings,
  updateLiveStoreSettings,
  saveLiveUser,
  getLiveUser,
  getLiveBulkQuotations,
  addLiveBulkQuotation,
  updateLiveBulkQuotationStatus,
  getLiveBoxTemplates,
  saveLiveBoxTemplate,
  deleteLiveBoxTemplate,
  getLiveInventory,
  saveLiveInventoryItem,
  updateLiveUserWishlist,
} from '../firebase/dbService';

export type AppView =
  | 'home'
  | 'shop'
  | 'mini-sandwiches'
  | 'finger-sandwiches'
  | 'mini-croissants'
  | 'mini-clubs'
  | 'premium-sandwiches'
  | 'ready-made-boxes'
  | 'individual-boxes'
  | 'custom-box'
  | 'group-boxes'
  | 'bakery-croissants'
  | 'bakery-cakes'
  | 'cakes-desserts'
  | 'chocolates-gifts'
  | 'catering-events'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'account'
  | 'track-order'
  | 'about'
  | 'contact'
  | 'admin';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  selectedCategory: ProductCategory | 'all';
  setSelectedCategory: (cat: ProductCategory | 'all') => void;
  formatPrice: (amount: number) => string;
  
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<boolean>;
  updateProduct: (product: Product) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  updateStock: (id: string, delta: number) => Promise<boolean>;

  // Inventory Packaging Supplies
  packagingSupplies: InventoryItem[];
  updatePackagingStock: (id: string, delta: number) => Promise<boolean>;

  // Box Templates
  boxTemplates: BoxTemplate[];
  saveBoxTemplate: (template: BoxTemplate) => Promise<boolean>;
  deleteBoxTemplate: (id: string) => Promise<boolean>;
  
  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id' | 'totalPrice'>) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  cartSchedule: CartSchedule;
  setCartSchedule: React.Dispatch<React.SetStateAction<CartSchedule>>;

  // Wishlist
  wishlist: string[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isWishlistDrawerOpen: boolean;
  setIsWishlistDrawerOpen: (open: boolean) => void;
  
  // Pricing & Coupons
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, 'id'>) => Promise<boolean>;
  updateCoupon: (coupon: Coupon) => Promise<boolean>;
  toggleCoupon: (id: string) => Promise<boolean>;
  deleteCoupon: (id: string) => Promise<boolean>;
  cartSubtotal: number;
  cartDiscount: number;
  cartDeliveryFee: number;
  cartTotal: number;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => Promise<Order>;
  updateOrderStatus: (
    orderId: string,
    status: OrderStatus,
    notes?: string,
    deliveryDate?: string,
    deliveryTimeSlot?: string
  ) => Promise<boolean>;
  currentOrder: Order | null;
  setCurrentOrder: (order: Order | null) => void;
  orderToTrack: Order | null;
  setOrderToTrack: (order: Order | null) => void;

  // Bulk Quotations
  bulkQuotations: BulkQuotationRequest[];
  createBulkQuotation: (request: Omit<BulkQuotationRequest, 'id' | 'createdAt' | 'status'>) => Promise<boolean>;
  updateBulkQuotationStatus: (id: string, status: BulkQuotationRequest['status'], unitPrice?: number, notes?: string) => Promise<boolean>;
  convertQuotationToOrder: (quotationId: string) => Promise<Order | null>;
  isBulkModalOpen: boolean;
  setIsBulkModalOpen: (open: boolean) => void;
  bulkModalTargetBox: string;
  setBulkModalTargetBox: (target: string) => void;

  // Catering
  cateringRequests: CateringRequest[];
  createCateringRequest: (request: Omit<CateringRequest, 'id' | 'createdAt' | 'status'>) => Promise<boolean>;
  updateCateringStatus: (id: string, status: CateringRequest['status'], quote?: number, notes?: string) => Promise<boolean>;
  isCateringModalOpen: boolean;
  setIsCateringModalOpen: (open: boolean) => void;

  // Store Settings
  storeSettings: StoreSettings;
  updateStoreSettings: (settings: StoreSettings) => Promise<boolean>;

  // Users & Auth
  user: UserProfile | null;
  loginCustomer: (email: string) => Promise<boolean>;
  registerCustomer: (name: string, email: string, phone: string) => Promise<boolean>;
  logoutCustomer: () => void;
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<boolean>;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;

  // Modals
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (product: Product | null) => void;
  selectedOrderForInvoice: Order | null;
  setSelectedOrderForInvoice: (order: Order | null) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;

  // Firebase status
  isFirebaseConnected: boolean;
  isDbLoading: boolean;
  dbError: string | null;
  refreshCloudData: () => Promise<boolean>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LANG: 'ft_lang',
  CART: 'ft_cart',
  SCHEDULE: 'ft_schedule',
  WISHLIST: 'ft_wishlist',
  USER: 'ft_user',
  ADMIN: 'ft_is_admin',
};

const getTodayDateString = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const ORDER_TIME_SLOTS = [
  '09:00 AM - 11:00 AM',
  '11:00 AM - 01:00 PM',
  '01:00 PM - 03:00 PM',
  '03:00 PM - 05:00 PM',
  '05:00 PM - 07:00 PM',
  '07:00 PM - 09:30 PM',
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Language & Direction
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    return saved === 'en' ? 'en' : 'ar';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = translations[language];

  // Routing View
  const [activeView, setActiveView] = useState<AppView>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');

  // Firebase connection and state loading
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(false);
  const [isDbLoading, setIsDbLoading] = useState<boolean>(true);
  const [dbError, setDbError] = useState<string | null>(null);

  // Products
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Inventory Packaging Supplies
  const [packagingSupplies, setPackagingSupplies] = useState<InventoryItem[]>(initialPackagingSupplies);

  // Box Templates
  const [boxTemplates, setBoxTemplates] = useState<BoxTemplate[]>(initialBoxTemplates);

  // Orders
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  // Bulk Quotations
  const [bulkQuotations, setBulkQuotations] = useState<BulkQuotationRequest[]>(initialBulkQuotations);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkModalTargetBox, setBulkModalTargetBox] = useState('Ready-Made Box');

  // Catering Requests
  const [cateringRequests, setCateringRequests] = useState<CateringRequest[]>(initialCateringRequests);

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  // Store Settings
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(initialStoreSettings);

  // Currency Formatter Helper
  const formatPrice = (amount: number): string => {
    const curr = storeSettings.currency || 'EGP';
    if (language === 'ar') {
      const arCurr = curr === 'EGP' ? 'ج.م' : curr === 'SAR' ? 'ر.س' : curr;
      return `${amount} ${arCurr}`;
    }
    return `${amount} ${curr}`;
  };

  // User & Admin
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return demoUser;
  });

  const [isAdmin, setIsAdminState] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ADMIN);
    return saved === 'true';
  });

  const setIsAdmin = (val: boolean) => {
    setIsAdminState(val);
    if (val) {
      localStorage.setItem(STORAGE_KEYS.ADMIN, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN);
    }
  };

  const refreshCloudData = async (): Promise<boolean> => {
    setIsDbLoading(true);
    setDbError(null);
    try {
      const connected = await testFirebaseConnection();
      setIsFirebaseConnected(connected);

      const results = await Promise.allSettled([
        getLiveProducts(),
        getLiveOrders(),
        getLiveCateringRequests(),
        getLiveCoupons(),
        getLiveStoreSettings(),
        getLiveBulkQuotations(),
        getLiveBoxTemplates(),
        getLiveInventory(),
      ]);

      const errors: string[] = [];
      const [prodsRes, ordsRes, catsRes, coupsRes, settingsRes, quotesRes, tplsRes, invRes] = results;

      if (prodsRes.status === 'fulfilled' && prodsRes.value.length > 0) setProducts(prodsRes.value);
      else if (prodsRes.status === 'rejected') errors.push('products');

      if (ordsRes.status === 'fulfilled' && ordsRes.value.length > 0) setOrders(ordsRes.value);
      else if (ordsRes.status === 'rejected') errors.push('orders');

      if (catsRes.status === 'fulfilled' && catsRes.value.length > 0) setCateringRequests(catsRes.value);
      else if (catsRes.status === 'rejected') errors.push('cateringRequests');

      if (coupsRes.status === 'fulfilled' && coupsRes.value.length > 0) setCoupons(coupsRes.value);
      else if (coupsRes.status === 'rejected') errors.push('coupons');

      if (settingsRes.status === 'fulfilled' && settingsRes.value) setStoreSettings(settingsRes.value);
      else if (settingsRes.status === 'rejected') errors.push('settings');

      if (quotesRes.status === 'fulfilled' && quotesRes.value.length > 0) setBulkQuotations(quotesRes.value);
      else if (quotesRes.status === 'rejected') errors.push('quotations');

      if (tplsRes.status === 'fulfilled' && tplsRes.value.length > 0) setBoxTemplates(tplsRes.value);
      else if (tplsRes.status === 'rejected') errors.push('boxTemplates');

      if (invRes.status === 'fulfilled' && invRes.value.length > 0) setPackagingSupplies(invRes.value);
      else if (invRes.status === 'rejected') errors.push('inventory');

      if (errors.length > 0) {
        setDbError(`Sync warning on: ${errors.join(', ')}`);
        return false;
      }
      setIsFirebaseConnected(connected);
      return connected;
    } catch (err) {
      console.error('Failed to initialize live Firestore collections:', err);
      setDbError(err instanceof Error ? err.message : 'Firestore sync failed');
      return false;
    } finally {
      setIsDbLoading(false);
    }
  };

  // Initial Firebase connection & live Firestore fetch on mount
  useEffect(() => {
    refreshCloudData();
  }, []);

  // Products mutations
  const addProduct = async (prodData: Omit<Product, 'id'>): Promise<boolean> => {
    const newProduct: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
    };
    try {
      await addLiveProduct(newProduct);
      setProducts((prev) => [newProduct, ...prev]);
      return true;
    } catch (err) {
      console.error('Error adding product to Firestore:', err);
      return false;
    }
  };

  const updateProduct = async (updated: Product): Promise<boolean> => {
    try {
      await updateLiveProduct(updated);
      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      return true;
    } catch (err) {
      console.error('Error updating product in Firestore:', err);
      return false;
    }
  };

  const deleteProduct = async (id: string): Promise<boolean> => {
    try {
      await deleteLiveProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (err) {
      console.error('Error deleting product from Firestore:', err);
      return false;
    }
  };

  const updateStock = async (id: string, delta: number): Promise<boolean> => {
    const target = products.find((p) => p.id === id);
    if (!target) return false;
    const newStock = Math.max(0, target.stock + delta);
    const updated = { ...target, stock: newStock, isAvailable: newStock > 0 };
    try {
      await updateLiveProduct(updated);
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      return true;
    } catch (err) {
      console.error('Error updating product stock:', err);
      return false;
    }
  };

  const updatePackagingStock = async (id: string, delta: number): Promise<boolean> => {
    const target = packagingSupplies.find((item) => item.id === id);
    if (!target) return false;
    const updated: InventoryItem = { ...target, stock: Math.max(0, target.stock + delta) };
    try {
      await saveLiveInventoryItem(updated);
      setPackagingSupplies((prev) => prev.map((item) => (item.id === id ? updated : item)));
      return true;
    } catch (err) {
      console.error('Error updating packaging stock:', err);
      return false;
    }
  };

  // Box Templates
  const saveBoxTemplate = async (template: BoxTemplate): Promise<boolean> => {
    try {
      await saveLiveBoxTemplate(template);
      setBoxTemplates((prev) => {
        const idx = prev.findIndex((t) => t.id === template.id);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = template;
          return copy;
        }
        return [template, ...prev];
      });
      return true;
    } catch (err) {
      console.error('Error saving box template:', err);
      return false;
    }
  };

  const deleteBoxTemplate = async (id: string): Promise<boolean> => {
    try {
      await deleteLiveBoxTemplate(id);
      setBoxTemplates((prev) => prev.filter((t) => t.id !== id));
      return true;
    } catch (err) {
      console.error('Error deleting box template:', err);
      return false;
    }
  };

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Wishlist (persisted to localStorage + synced to Firestore user profile)
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const savedWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    if (savedWishlist) {
      try {
        const parsed = JSON.parse(savedWishlist);
        if (Array.isArray(parsed)) {
          return parsed.filter((id): id is string => typeof id === 'string');
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (user?.wishlist && Array.isArray(user.wishlist)) {
      return user.wishlist;
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);

  const syncWishlistToUser = (nextWishlist: string[]) => {
    if (!user) return;
    const updatedUser: UserProfile = { ...user, wishlist: nextWishlist };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    updateLiveUserWishlist(user.id, nextWishlist).catch((err) => {
      console.error('Error syncing wishlist to Firestore:', err);
    });
  };

  const isInWishlist = (productId: string): boolean => wishlist.includes(productId);

  const toggleWishlist = (productId: string) => {
    const nextWishlist = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [productId, ...wishlist];
    setWishlist(nextWishlist);
    syncWishlistToUser(nextWishlist);
  };

  const removeFromWishlist = (productId: string) => {
    if (!wishlist.includes(productId)) return;
    const nextWishlist = wishlist.filter((id) => id !== productId);
    setWishlist(nextWishlist);
    syncWishlistToUser(nextWishlist);
  };

  const clearWishlist = () => {
    setWishlist([]);
    syncWishlistToUser([]);
  };

  const [cartSchedule, setCartSchedule] = useState<CartSchedule>(() => {
    const today = getTodayDateString();
    const fallback: CartSchedule = {
      orderType: 'delivery',
      timingMode: 'asap',
      scheduledDate: today,
      scheduledTimeSlot: ORDER_TIME_SLOTS[1],
      customTime: '14:00',
    };
    const saved = localStorage.getItem(STORAGE_KEYS.SCHEDULE);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<CartSchedule>;
        const validDate =
          parsed.scheduledDate && parsed.scheduledDate >= today ? parsed.scheduledDate : today;
        return {
          orderType: parsed.orderType === 'pickup' ? 'pickup' : 'delivery',
          timingMode: parsed.timingMode === 'scheduled' ? 'scheduled' : 'asap',
          scheduledDate: validDate,
          scheduledTimeSlot: parsed.scheduledTimeSlot || ORDER_TIME_SLOTS[1],
          customTime: parsed.customTime || '14:00',
        };
      } catch (e) {
        console.error(e);
      }
    }
    return fallback;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(cartSchedule));
  }, [cartSchedule]);

  const addToCart = (item: Omit<CartItem, 'id' | 'totalPrice'>) => {
    const totalPrice = item.unitPrice * item.quantity;
    if (
      item.productId &&
      !item.customBox &&
      !item.selectedBread &&
      (!item.selectedOptions || item.selectedOptions.length === 0)
    ) {
      setCart((prev) => {
        const existingIdx = prev.findIndex((i) => i.productId === item.productId && !i.customBox && !i.selectedBread);
        if (existingIdx >= 0) {
          const updated = [...prev];
          const newQty = updated[existingIdx].quantity + item.quantity;
          updated[existingIdx] = {
            ...updated[existingIdx],
            quantity: newQty,
            totalPrice: updated[existingIdx].unitPrice * newQty,
          };
          return updated;
        }
        return [...prev, { ...item, id: `line-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`, totalPrice }];
      });
    } else {
      setCart((prev) => [
        ...prev,
        { ...item, id: `line-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`, totalPrice },
      ]);
    }
    setIsCartDrawerOpen(true);
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
              totalPrice: item.unitPrice * quantity,
            }
          : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCartSchedule({
      orderType: 'delivery',
      timingMode: 'asap',
      scheduledDate: getTodayDateString(),
      scheduledTimeSlot: ORDER_TIME_SLOTS[1],
      customTime: '14:00',
    });
  };

  // Store Settings
  const updateStoreSettings = async (newSettings: StoreSettings): Promise<boolean> => {
    try {
      await updateLiveStoreSettings(newSettings);
      setStoreSettings(newSettings);
      return true;
    } catch (err) {
      console.error('Error saving store settings:', err);
      return false;
    }
  };

  // Coupons
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const cartDiscount = appliedCoupon
    ? appliedCoupon.discountType === 'percentage'
      ? (cartSubtotal * appliedCoupon.discountValue) / 100
      : Math.min(cartSubtotal, appliedCoupon.discountValue)
    : 0;

  const cartDeliveryFee =
    cartSubtotal === 0 ||
    cartSchedule.orderType === 'pickup' ||
    cartSubtotal >= storeSettings.freeDeliveryThreshold
      ? 0
      : storeSettings.deliveryFee;

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartDeliveryFee);

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode && c.isActive);
    if (!found) {
      return { success: false, message: t.cart.invalidCoupon };
    }
    if (cartSubtotal < found.minOrderValue) {
      const msg =
        language === 'ar'
          ? `الحد الأدنى لتطبيق هذا الكوبون هو ${formatPrice(found.minOrderValue)}`
          : `Minimum order value for this coupon is ${formatPrice(found.minOrderValue)}`;
      return { success: false, message: msg };
    }
    setAppliedCoupon(found);
    return { success: true, message: t.cart.couponApplied };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const addCoupon = async (couponData: Omit<Coupon, 'id'>): Promise<boolean> => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `coup-${Date.now()}`,
    };
    try {
      await addLiveCoupon(newCoupon);
      setCoupons((prev) => [newCoupon, ...prev]);
      return true;
    } catch (err) {
      console.error('Error adding coupon:', err);
      return false;
    }
  };

  const updateCoupon = async (coupon: Coupon): Promise<boolean> => {
    try {
      await updateLiveCoupon(coupon);
      setCoupons((prev) => prev.map((c) => (c.id === coupon.id ? coupon : c)));
      return true;
    } catch (err) {
      console.error('Error updating coupon:', err);
      return false;
    }
  };

  const toggleCoupon = async (id: string): Promise<boolean> => {
    const target = coupons.find((c) => c.id === id);
    if (!target) return false;
    const newStatus = !target.isActive;
    try {
      await toggleLiveCoupon(id, newStatus);
      setCoupons((prev) => prev.map((c) => (c.id === id ? { ...c, isActive: newStatus } : c)));
      return true;
    } catch (err) {
      console.error('Error toggling coupon:', err);
      return false;
    }
  };

  const deleteCoupon = async (id: string): Promise<boolean> => {
    try {
      await deleteLiveCoupon(id);
      setCoupons((prev) => prev.filter((c) => c.id !== id));
      return true;
    } catch (err) {
      console.error('Error deleting coupon:', err);
      return false;
    }
  };

  // Orders
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orderToTrack, setOrderToTrack] = useState<Order | null>(null);

  const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `FT-2026-${randomDigits}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    // Save directly to Firebase Cloud Firestore
    await addLiveOrder(newOrder);

    setOrders((prev) => [newOrder, ...prev]);

    // Update stock in Firestore
    orderData.items.forEach((item) => {
      if (item.productId) {
        updateStock(item.productId, -item.quantity);
      }
    });

    clearCart();
    setCurrentOrder(newOrder);
    return newOrder;
  };

  const updateOrderStatus = async (
    orderId: string,
    status: OrderStatus,
    notes?: string,
    deliveryDate?: string,
    deliveryTimeSlot?: string
  ): Promise<boolean> => {
    try {
      await updateLiveOrderStatus(orderId, status, notes, deliveryDate, deliveryTimeSlot);
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId
            ? {
                ...o,
                status,
                statusNotes: notes !== undefined ? notes : o.statusNotes,
                deliveryDate: deliveryDate !== undefined ? deliveryDate : o.deliveryDate,
                deliveryTimeSlot: deliveryTimeSlot !== undefined ? deliveryTimeSlot : o.deliveryTimeSlot,
              }
            : o
        )
      );
      if (currentOrder && currentOrder.id === orderId) {
        setCurrentOrder((prev) =>
          prev
            ? {
                ...prev,
                status,
                statusNotes: notes !== undefined ? notes : prev.statusNotes,
                deliveryDate: deliveryDate !== undefined ? deliveryDate : prev.deliveryDate,
                deliveryTimeSlot: deliveryTimeSlot !== undefined ? deliveryTimeSlot : prev.deliveryTimeSlot,
              }
            : null
        );
      }
      return true;
    } catch (err) {
      console.error('Error updating order status in Firestore:', err);
      return false;
    }
  };

  // Bulk Quotations
  const createBulkQuotation = async (
    requestData: Omit<BulkQuotationRequest, 'id' | 'createdAt' | 'status'>
  ): Promise<boolean> => {
    const newQuote: BulkQuotationRequest = {
      ...requestData,
      id: `bulk-q-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    try {
      await addLiveBulkQuotation(newQuote);
      setBulkQuotations((prev) => [newQuote, ...prev]);
      return true;
    } catch (err) {
      console.error('Error creating bulk quotation:', err);
      return false;
    }
  };

  const updateBulkQuotationStatus = async (
    id: string,
    status: BulkQuotationRequest['status'],
    unitPrice?: number,
    notes?: string
  ): Promise<boolean> => {
    try {
      await updateLiveBulkQuotationStatus(id, status, unitPrice, notes);
      setBulkQuotations((prev) =>
        prev.map((q) =>
          q.id === id
            ? {
                ...q,
                status,
                quotedUnitPrice: unitPrice !== undefined ? unitPrice : q.quotedUnitPrice,
                quotedTotal: unitPrice !== undefined ? unitPrice * q.boxQuantity : q.quotedTotal,
                adminNotes: notes !== undefined ? notes : q.adminNotes,
              }
            : q
        )
      );
      return true;
    } catch (err) {
      console.error('Error updating quotation status:', err);
      return false;
    }
  };

  const convertQuotationToOrder = async (quotationId: string): Promise<Order | null> => {
    const quote = bulkQuotations.find((q) => q.id === quotationId);
    if (!quote) return null;

    const unitPrice = quote.quotedUnitPrice || 75;
    const totalAmount = unitPrice * quote.boxQuantity;
    const randomDigits = Math.floor(1000 + Math.random() * 9000);

    const newOrder: Order = {
      id: `FT-BULK-${randomDigits}`,
      createdAt: new Date().toISOString(),
      customer: {
        name: quote.customerName,
        phone: quote.phone,
        email: quote.email,
        address: quote.deliveryAddress,
        city: 'Cairo',
        notes: `Converted from Bulk Quotation ${quote.id} (${quote.organizationName || 'Corporate'})`,
        organization: quote.organizationName,
      },
      orderType: 'delivery',
      deliveryDate: quote.eventDate,
      deliveryTimeSlot: '10:00 AM - 12:00 PM',
      items: [
        {
          id: `line-bulk-${Date.now()}`,
          quantity: quote.boxQuantity,
          unitPrice,
          totalPrice: totalAmount,
          specialInstructions: `Bulk Order: ${quote.boxQuantity}x ${quote.targetBoxName || 'Individual Boxes'}`,
        },
      ],
      subtotal: totalAmount,
      deliveryFee: 0,
      discount: 0,
      total: totalAmount,
      paymentMethod: 'bank_transfer',
      paymentStatus: 'pending',
      status: 'confirmed',
      statusNotes: `Confirmed bulk distribution of ${quote.boxQuantity} boxes.`,
      isBulkOrder: true,
    };

    try {
      await addLiveOrder(newOrder);
      await updateLiveBulkQuotationStatus(quotationId, 'converted_to_order');
      setOrders((prev) => [newOrder, ...prev]);
      setBulkQuotations((prev) =>
        prev.map((q) => (q.id === quotationId ? { ...q, status: 'converted_to_order' } : q))
      );
      return newOrder;
    } catch (err) {
      console.error('Error converting quotation to order:', err);
      return null;
    }
  };

  // Catering Requests
  const [isCateringModalOpen, setIsCateringModalOpen] = useState(false);

  const createCateringRequest = async (
    requestData: Omit<CateringRequest, 'id' | 'createdAt' | 'status'>
  ): Promise<boolean> => {
    const newReq: CateringRequest = {
      ...requestData,
      id: `cat-req-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    try {
      await addLiveCateringRequest(newReq);
      setCateringRequests((prev) => [newReq, ...prev]);
      return true;
    } catch (err) {
      console.error('Error saving catering request:', err);
      return false;
    }
  };

  const updateCateringStatus = async (
    id: string,
    status: CateringRequest['status'],
    quote?: number,
    notes?: string
  ): Promise<boolean> => {
    try {
      await updateLiveCateringStatus(id, status, quote, notes);
      setCateringRequests((prev) =>
        prev.map((r) =>
          r.id === id
            ? {
                ...r,
                status,
                quoteAmount: quote !== undefined ? quote : r.quoteAmount,
                adminNotes: notes !== undefined ? notes : r.adminNotes,
              }
            : r
        )
      );
      return true;
    } catch (err) {
      console.error('Error updating catering request:', err);
      return false;
    }
  };

  // Users & Auth
  const loginCustomer = async (email: string): Promise<boolean> => {
    const userId = `usr-${email.replace(/[^a-zA-Z0-9]/g, '_')}`;
    let userProfile = await getLiveUser(userId);
    if (!userProfile) {
      userProfile = {
        id: userId,
        name: email.split('@')[0],
        email,
        phone: '+201000000000',
        role: 'customer',
        savedAddresses: demoUser.savedAddresses,
        wishlist,
      };
      await saveLiveUser(userProfile);
    } else {
      const mergedWishlist = Array.from(new Set([...(userProfile.wishlist || []), ...wishlist]));
      if (mergedWishlist.length !== (userProfile.wishlist || []).length) {
        userProfile = { ...userProfile, wishlist: mergedWishlist };
        await updateLiveUserWishlist(userId, mergedWishlist).catch((err) => {
          console.error('Error syncing merged wishlist:', err);
        });
      }
      setWishlist(mergedWishlist);
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(mergedWishlist));
    }
    setUser(userProfile);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userProfile));
    return true;
  };

  const registerCustomer = async (name: string, email: string, phone: string): Promise<boolean> => {
    const userId = `usr-${email.replace(/[^a-zA-Z0-9]/g, '_')}`;
    const newUser: UserProfile = {
      id: userId,
      name,
      email,
      phone,
      role: 'customer',
      savedAddresses: [],
      wishlist,
    };
    await saveLiveUser(newUser);
    setUser(newUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    return true;
  };

  const logoutCustomer = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
  };

  const updateUserProfile = async (profile: Partial<UserProfile>): Promise<boolean> => {
    if (!user) return false;
    const updated = { ...user, ...profile };
    await saveLiveUser(updated);
    setUser(updated);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
    return true;
  };

  // Modals state
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<Order | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        activeView,
        setActiveView,
        selectedCategory,
        setSelectedCategory,
        formatPrice,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        packagingSupplies,
        updatePackagingStock,
        boxTemplates,
        saveBoxTemplate,
        deleteBoxTemplate,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        cartSchedule,
        setCartSchedule,
        wishlist,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        isWishlistDrawerOpen,
        setIsWishlistDrawerOpen,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        coupons,
        addCoupon,
        updateCoupon,
        toggleCoupon,
        deleteCoupon,
        cartSubtotal,
        cartDiscount,
        cartDeliveryFee,
        cartTotal,
        orders,
        createOrder,
        updateOrderStatus,
        currentOrder,
        setCurrentOrder,
        orderToTrack,
        setOrderToTrack,
        bulkQuotations,
        createBulkQuotation,
        updateBulkQuotationStatus,
        convertQuotationToOrder,
        isBulkModalOpen,
        setIsBulkModalOpen,
        bulkModalTargetBox,
        setBulkModalTargetBox,
        cateringRequests,
        createCateringRequest,
        updateCateringStatus,
        isCateringModalOpen,
        setIsCateringModalOpen,
        storeSettings,
        updateStoreSettings,
        user,
        loginCustomer,
        registerCustomer,
        logoutCustomer,
        updateUserProfile,
        isAdmin,
        setIsAdmin,
        selectedProductForModal,
        setSelectedProductForModal,
        selectedOrderForInvoice,
        setSelectedOrderForInvoice,
        isSearchModalOpen,
        setIsSearchModalOpen,
        isFirebaseConnected,
        isDbLoading,
        dbError,
        refreshCloudData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
