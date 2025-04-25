import { shopifyConfig } from "./config";

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  product_type: string;
  body_html?: string;
  price: string;
  image: {
    src: string;
  } | null;
  variants: Array<{
    id: string;
    price: string;
  }>;
}

export interface ShopifyProductsResponse {
  products: ShopifyProduct[];
  pageInfo?: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
}

/**
 * Fetch products from Shopify API with pagination
 * @param limit Number of products to fetch per page
 * @param cursor Pagination cursor for fetching next page
 * @returns Promise with products and pagination info
 */
export async function fetchShopifyProducts(
  limit: number = 10,
  cursor?: string
): Promise<ShopifyProductsResponse> {
  try {
    // Build the URL with query parameters
    const url = new URL("/api/shopify/products", window.location.origin);
    url.searchParams.append("limit", limit.toString());
    if (cursor) {
      url.searchParams.append("cursor", cursor);
    }

    // Fetch from our API route
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    // The API route already formats the data for us
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching Shopify products:", error);
    return { products: [], pageInfo: { hasNextPage: false, endCursor: null } };
  }
}
