/**
 * Configuration file that uses environment variables for sensitive information
 */

// Shopify API Configuration
export const shopifyConfig = {
  storeUrl:
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL ||
    "https://example.myshopify.com",
  apiKey: process.env.SHOPIFY_API_KEY || "",
  apiVersion: process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || "2023-10",
};

// Recommendation API Configuration
export const recommendationConfig = {
  baseUrl:
    process.env.NEXT_PUBLIC_RECOMMENDATION_API_URL || "https://example.com",
};
