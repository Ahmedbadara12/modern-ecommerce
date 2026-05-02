import { Injectable, signal, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private document = inject(DOCUMENT);

  currentLang = signal<'en' | 'ar'>('en');

  private translations: any = {
    en: {
      HOME: 'Home',
      DISCOVER: 'Discover',
      CATEGORIES: 'Categories',
      DEALS: 'Deals',
      SEARCH_PLACEHOLDER: 'Search for gear...',
      HERO_TITLE: 'Next-Gen Tech For True Creators',
      HERO_SUBTITLE: 'Experience the future of gaming and productivity with our premium collection of ultra-responsive gear.',
      SHOP_COLLECTION: 'Shop Collection',
      WATCH_VIDEO: 'Watch Video',
      TRENDING_GEAR: 'Trending Gear',
      FILTER_ALL: 'All',
      LOADING: 'Loading the latest gear...',
      ADD_TO_CART: 'Add to Cart',
      QUICK_ADD: 'Quick Add',
      NEW: 'New',
      REVIEWS: 'Reviews',
      FREE_SHIPPING: 'Free Shipping',
      WARRANTY: '2 Year Warranty',
      RETURNS: '30-Day Returns',
      PRODUCT_NOT_FOUND: 'Product Not Found',
      GO_BACK: 'Go Back Home',
      CART: 'Cart',
      CHECKOUT: 'Checkout'
    },
    ar: {
      HOME: 'الرئيسية',
      DISCOVER: 'اكتشف',
      CATEGORIES: 'الفئات',
      DEALS: 'عروض',
      SEARCH_PLACEHOLDER: 'ابحث عن المعدات...',
      HERO_TITLE: 'تقنية الجيل القادم للمبدعين',
      HERO_SUBTITLE: 'جرب مستقبل الألعاب والإنتاجية مع مجموعتنا المتميزة من المعدات فائقة الاستجابة.',
      SHOP_COLLECTION: 'تسوق المجموعة',
      WATCH_VIDEO: 'شاهد الفيديو',
      TRENDING_GEAR: 'أحدث المعدات',
      FILTER_ALL: 'الكل',
      LOADING: 'جاري تحميل أحدث المعدات...',
      ADD_TO_CART: 'أضف إلى السلة',
      QUICK_ADD: 'إضافة سريعة',
      NEW: 'جديد',
      REVIEWS: 'مراجعات',
      FREE_SHIPPING: 'شحن مجاني',
      WARRANTY: 'ضمان سنتين',
      RETURNS: 'إرجاع خلال 30 يوم',
      PRODUCT_NOT_FOUND: 'المنتج غير موجود',
      GO_BACK: 'العودة للرئيسية',
      CART: 'عربة التسوق',
      CHECKOUT: 'الدفع'
    }
  };

  constructor() {
    effect(() => {
      const lang = this.currentLang();
      const htmlTag = this.document.documentElement;
      htmlTag.lang = lang;
      htmlTag.dir = lang === 'ar' ? 'rtl' : 'ltr';
    });
  }

  translate(key: string): string {
    return this.translations[this.currentLang()][key] || key;
  }

  toggleLanguage() {
    this.currentLang.update(l => l === 'en' ? 'ar' : 'en');
  }
}
