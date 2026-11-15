import { ProductCollection, ProductSize, ProductStatus } from "../lib/enums/product.enum";

export interface Product { // Shape of a product read from the database and returned by the service.
  _id: string; // MongoDB-generated ID for this product.
  productStatus?: ProductStatus; // Optional current availability state.
  productCollection: ProductCollection; // Required category.
  productName: string; // Required display name.
  productPrice: number; // Required price.
  productLeftCount: number; // Required remaining inventory.
  productSize?: ProductSize; // Optional size variant.
  productVolume?: number; // Optional drink volume.
  productDesc?: string; // Optional description text.
  productImages?: string[]; // Optional list of stored image references.
  productViews?: number; // Optional aggregate view counter.
  createdAt?: Date; 
}

export interface ProductInquiry { // Filters and pagination values used to fetch a product list.
  order: string; // Field name used for sorting results.
  page: number; // One-based page number requested by the client.
  limit: number; // Maximum number of products to return on that page.
  productCollection?: ProductCollection; // Optional category restriction.
  search?: string; // Optional case-insensitive name search text.
} 