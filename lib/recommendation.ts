import { recommendationConfig } from "./config";

export interface WhyItWorks {
  title?: string;
  description?: string;
  price?: string;
  cta?: string;
}

export interface RecommendationSuggestion {
  title?: string;
  description?: string;
  price?: string;
  cta?: string;
  why_it_works: WhyItWorks;
}

/**
 * Fetch AI recommendations for a product
 * @param productUrl The URL of the product
 * @returns Promise with an array of suggestions containing all elements
 */
export async function fetchRecommendations(
  productUrl: string
): Promise<RecommendationSuggestion[]> {
  try {
    const url = `${recommendationConfig.baseUrl}/recommendation/get-by-product-url`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productUrl,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Keep this error log as it's important for error handling
    console.error("Error fetching recommendations:", error);
    return [];
  }
}
