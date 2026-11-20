import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db } from './config';
import { handleFirestoreError, OperationType } from './errors';
import {
  Product,
  Order,
  CateringRequest,
  Coupon,
  StoreSettings,
  UserProfile,
  BulkQuotationRequest,
  BoxTemplate,
  InventoryItem,
} from '../types';
import {
  initialProducts,
  initialOrders,
  initialCateringRequests,
  initialCoupons,
  initialStoreSettings,
  initialBulkQuotations,
  initialBoxTemplates,
  initialPackagingSupplies,
  DEFAULT_ITEM_PHOTO_MAP,
  getFriendlyTablePhotoForItem,
} from '../data/mockData';

const SHARED_FALLBACK_IMAGES = new Set([
  '/assets/images/celebration_cake_cupcakes_1794559679772.jpg',
  '/assets/images/chocolate_praline_gift_box_1794559680523.jpg',
  '/assets/images/ready_meal_snack_box_1794559679358.jpg',
]);

function needsDescriptionPhotoSync(item: { id: string; image?: string }): boolean {
  if (!item.image || item.image.includes('images.unsplash.com')) return true;
  const canonical = DEFAULT_ITEM_PHOTO_MAP[item.id];
  if (!canonical || item.image === canonical) return false;
  if (item.image.startsWith('/assets/aistudio/') || SHARED_FALLBACK_IMAGES.has(item.image)) {
    return true;
  }
  return false;
}

// PRODUCTS
export async function getLiveProducts(): Promise<Product[]> {
  const colPath = 'products';
  try {
    const snap = await getDocs(collection(db, colPath));
    if (snap.empty) {
      console.log('Seeding initial products into Cloud Firestore...');
      for (const prod of initialProducts) {
        await setDoc(doc(db, colPath, prod.id), prod);
      }
      return initialProducts;
    }
    const loaded = snap.docs.map((d) => d.data() as Product);
    // Sync legacy unsplash, mismatched sandwich photos, and refined Arabic hospitality terms
    const migrated: Product[] = [];
    for (const p of loaded) {
      let updated = p;
      const patch: Partial<Product> = {};
      if (needsDescriptionPhotoSync(p)) {
        const targetImg = getFriendlyTablePhotoForItem(p);
        patch.image = targetImg;
        updated = { ...updated, image: targetImg };
      }
      if (p.name?.ar?.includes('تموين')) {
        const refinedArName = p.name.ar.replace(/التموين/g, 'الضيافة').replace(/تموين/g, 'ضيافة');
        patch.name = { ...p.name, ar: refinedArName };
        updated = { ...updated, name: patch.name };
      }
      if (Object.keys(patch).length > 0) {
        setDoc(doc(db, colPath, p.id), patch, { merge: true }).catch(console.error);
      }
      migrated.push(updated);
    }
    return migrated;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, colPath);
    return initialProducts;
  }
}

export async function addLiveProduct(product: Product): Promise<void> {
  const colPath = 'products';
  try {
    await setDoc(doc(db, colPath, product.id), product);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, `${colPath}/${product.id}`);
  }
}

export async function updateLiveProduct(product: Product): Promise<void> {
  const docPath = `products/${product.id}`;
  try {
    const cleanPayload = Object.fromEntries(
      Object.entries(product).filter(([, val]) => val !== undefined)
    ) as Product;
    await setDoc(doc(db, 'products', product.id), cleanPayload);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, docPath);
  }
}

export async function deleteLiveProduct(id: string): Promise<void> {
  const docPath = `products/${id}`;
  try {
    await deleteDoc(doc(db, 'products', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, docPath);
  }
}

// BOX TEMPLATES
export async function getLiveBoxTemplates(): Promise<BoxTemplate[]> {
  const colPath = 'boxTemplates';
  try {
    const snap = await getDocs(collection(db, colPath));
    if (snap.empty) {
      console.log('Seeding initial box templates into Cloud Firestore...');
      for (const tpl of initialBoxTemplates) {
        await setDoc(doc(db, colPath, tpl.id), tpl);
      }
      return initialBoxTemplates;
    }
    return snap.docs.map((d) => {
      const tpl = d.data() as BoxTemplate;
      if (needsDescriptionPhotoSync(tpl)) {
        const targetImg = getFriendlyTablePhotoForItem(tpl);
        setDoc(doc(db, colPath, tpl.id), { image: targetImg }, { merge: true }).catch(console.error);
        return { ...tpl, image: targetImg };
      }
      return tpl;
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, colPath);
    return initialBoxTemplates;
  }
}

export async function saveLiveBoxTemplate(template: BoxTemplate): Promise<void> {
  const docPath = `boxTemplates/${template.id}`;
  try {
    await setDoc(doc(db, 'boxTemplates', template.id), template, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, docPath);
  }
}

export async function deleteLiveBoxTemplate(id: string): Promise<void> {
  const docPath = `boxTemplates/${id}`;
  try {
    await deleteDoc(doc(db, 'boxTemplates', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, docPath);
  }
}

// ORDERS
export async function getLiveOrders(): Promise<Order[]> {
  const colPath = 'orders';
  try {
    const snap = await getDocs(collection(db, colPath));
    if (snap.empty) {
      console.log('Seeding initial orders into Cloud Firestore...');
      for (const ord of initialOrders) {
        await setDoc(doc(db, colPath, ord.id), ord);
      }
      return initialOrders;
    }
    const orders = snap.docs.map((d) => d.data() as Order);
    return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, colPath);
    return initialOrders;
  }
}

export async function addLiveOrder(order: Order): Promise<void> {
  const docPath = `orders/${order.id}`;
  try {
    await setDoc(doc(db, 'orders', order.id), order);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, docPath);
  }
}

export async function updateLiveOrderStatus(
  orderId: string,
  status: Order['status'],
  notes?: string,
  deliveryDate?: string,
  deliveryTimeSlot?: string
): Promise<void> {
  const docPath = `orders/${orderId}`;
  try {
    const updateData: any = { status };
    if (notes !== undefined) updateData.statusNotes = notes;
    if (deliveryDate !== undefined) updateData.deliveryDate = deliveryDate;
    if (deliveryTimeSlot !== undefined) updateData.deliveryTimeSlot = deliveryTimeSlot;
    await updateDoc(doc(db, 'orders', orderId), updateData);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, docPath);
  }
}

// BULK QUOTATION REQUESTS
export async function getLiveBulkQuotations(): Promise<BulkQuotationRequest[]> {
  const colPath = 'quotations';
  try {
    const snap = await getDocs(collection(db, colPath));
    if (snap.empty) {
      console.log('Seeding initial bulk quotations into Cloud Firestore...');
      for (const q of initialBulkQuotations) {
        await setDoc(doc(db, colPath, q.id), q);
      }
      return initialBulkQuotations;
    }
    const quotes = snap.docs.map((d) => d.data() as BulkQuotationRequest);
    return quotes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, colPath);
    return initialBulkQuotations;
  }
}

export async function addLiveBulkQuotation(quote: BulkQuotationRequest): Promise<void> {
  const docPath = `quotations/${quote.id}`;
  try {
    await setDoc(doc(db, 'quotations', quote.id), quote);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, docPath);
  }
}

export async function updateLiveBulkQuotationStatus(
  id: string,
  status: BulkQuotationRequest['status'],
  unitPrice?: number,
  notes?: string
): Promise<void> {
  const docPath = `quotations/${id}`;
  try {
    const updateData: any = { status };
    if (unitPrice !== undefined) {
      updateData.quotedUnitPrice = unitPrice;
    }
    if (notes !== undefined) {
      updateData.adminNotes = notes;
    }
    await updateDoc(doc(db, 'quotations', id), updateData);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, docPath);
  }
}

// CATERING REQUESTS
export async function getLiveCateringRequests(): Promise<CateringRequest[]> {
  const colPath = 'cateringRequests';
  try {
    const snap = await getDocs(collection(db, colPath));
    if (snap.empty) {
      console.log('Seeding initial catering requests into Cloud Firestore...');
      for (const req of initialCateringRequests) {
        await setDoc(doc(db, colPath, req.id), req);
      }
      return initialCateringRequests;
    }
    const requests = snap.docs.map((d) => d.data() as CateringRequest);
    return requests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, colPath);
    return initialCateringRequests;
  }
}

export async function addLiveCateringRequest(request: CateringRequest): Promise<void> {
  const docPath = `cateringRequests/${request.id}`;
  try {
    await setDoc(doc(db, 'cateringRequests', request.id), request);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, docPath);
  }
}

export async function updateLiveCateringStatus(
  id: string,
  status: CateringRequest['status'],
  quote?: number,
  notes?: string
): Promise<void> {
  const docPath = `cateringRequests/${id}`;
  try {
    const updateData: any = { status };
    if (quote !== undefined) updateData.quoteAmount = quote;
    if (notes !== undefined) updateData.adminNotes = notes;
    await updateDoc(doc(db, 'cateringRequests', id), updateData);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, docPath);
  }
}

// COUPONS
export async function getLiveCoupons(): Promise<Coupon[]> {
  const colPath = 'coupons';
  try {
    const snap = await getDocs(collection(db, colPath));
    if (snap.empty) {
      console.log('Seeding initial coupons into Cloud Firestore...');
      for (const coup of initialCoupons) {
        await setDoc(doc(db, colPath, coup.id), coup);
      }
      return initialCoupons;
    }
    return snap.docs.map((d) => d.data() as Coupon);
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, colPath);
    return initialCoupons;
  }
}

export async function addLiveCoupon(coupon: Coupon): Promise<void> {
  const docPath = `coupons/${coupon.id}`;
  try {
    await setDoc(doc(db, 'coupons', coupon.id), coupon);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, docPath);
  }
}

export async function updateLiveCoupon(coupon: Coupon): Promise<void> {
  const docPath = `coupons/${coupon.id}`;
  try {
    await setDoc(doc(db, 'coupons', coupon.id), coupon, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, docPath);
  }
}

export async function toggleLiveCoupon(id: string, isActive: boolean): Promise<void> {
  const docPath = `coupons/${id}`;
  try {
    await updateDoc(doc(db, 'coupons', id), { isActive });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, docPath);
  }
}

export async function deleteLiveCoupon(id: string): Promise<void> {
  const docPath = `coupons/${id}`;
  try {
    await deleteDoc(doc(db, 'coupons', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, docPath);
  }
}

// STORE SETTINGS
export async function getLiveStoreSettings(): Promise<StoreSettings> {
  const docPath = 'settings/general';
  try {
    const snap = await getDoc(doc(db, 'settings', 'general'));
    if (!snap.exists()) {
      console.log('Seeding initial store settings into Cloud Firestore...');
      await setDoc(doc(db, 'settings', 'general'), initialStoreSettings);
      return initialStoreSettings;
    }
    const existing = snap.data() as StoreSettings;
    // Migrate legacy SAR / Riyadh / +966 defaults to EGP / Cairo if previously seeded
    const needsEgyptMigration =
      existing.currency === 'SAR' ||
      existing.whatsappNumber?.startsWith('+966') ||
      existing.supportPhone?.startsWith('+966') ||
      existing.address?.en?.includes('Riyadh') ||
      existing.announcementEn?.includes('SAR') ||
      existing.announcementAr?.includes('ر.س');

    if (needsEgyptMigration) {
      const updatedSettings: StoreSettings = {
        ...existing,
        currency: 'EGP',
        whatsappNumber: existing.whatsappNumber?.startsWith('+966')
          ? initialStoreSettings.whatsappNumber
          : existing.whatsappNumber,
        supportPhone: existing.supportPhone?.startsWith('+966')
          ? initialStoreSettings.supportPhone
          : existing.supportPhone,
        address:
          existing.address?.en?.includes('Riyadh') || existing.address?.ar?.includes('الرياض')
            ? initialStoreSettings.address
            : existing.address,
        bankDetails: existing.bankDetails?.iban?.startsWith('SA')
          ? initialStoreSettings.bankDetails
          : existing.bankDetails,
        deliveryFee: existing.deliveryFee === 18 ? initialStoreSettings.deliveryFee : existing.deliveryFee,
        freeDeliveryThreshold:
          existing.freeDeliveryThreshold === 200
            ? initialStoreSettings.freeDeliveryThreshold
            : existing.freeDeliveryThreshold,
        announcementEn: existing.announcementEn?.includes('SAR')
          ? initialStoreSettings.announcementEn
          : existing.announcementEn,
        announcementAr: existing.announcementAr?.includes('ر.س')
          ? initialStoreSettings.announcementAr
          : existing.announcementAr,
      };
      setDoc(doc(db, 'settings', 'general'), updatedSettings, { merge: true }).catch(console.error);
      return updatedSettings;
    }
    return existing;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, docPath);
    return initialStoreSettings;
  }
}

export async function updateLiveStoreSettings(settings: StoreSettings): Promise<void> {
  const docPath = 'settings/general';
  try {
    await setDoc(doc(db, 'settings', 'general'), settings);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, docPath);
  }
}

// INVENTORY / PACKAGING SUPPLIES
export async function getLiveInventory(): Promise<InventoryItem[]> {
  const colPath = 'inventory';
  try {
    const snap = await getDocs(collection(db, colPath));
    if (snap.empty) {
      for (const item of initialPackagingSupplies) {
        await setDoc(doc(db, colPath, item.id), item);
      }
      return initialPackagingSupplies;
    }
    return snap.docs.map((d) => d.data() as InventoryItem);
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, colPath);
    return initialPackagingSupplies;
  }
}

export async function saveLiveInventoryItem(item: InventoryItem): Promise<void> {
  const docPath = `inventory/${item.id}`;
  try {
    await setDoc(doc(db, 'inventory', item.id), item, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, docPath);
  }
}

// USERS
export async function saveLiveUser(user: UserProfile): Promise<void> {
  const docPath = `users/${user.id}`;
  try {
    await setDoc(doc(db, 'users', user.id), user, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, docPath);
  }
}

export async function getLiveUser(id: string): Promise<UserProfile | null> {
  const docPath = `users/${id}`;
  try {
    const snap = await getDoc(doc(db, 'users', id));
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, docPath);
    return null;
  }
}

export async function updateLiveUserWishlist(userId: string, wishlist: string[]): Promise<void> {
  const docPath = `users/${userId}`;
  try {
    await setDoc(doc(db, 'users', userId), { wishlist }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, docPath);
  }
}
