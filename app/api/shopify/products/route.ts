import { shopifyConfig } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get cursor from query params if it exists
    const searchParams = request.nextUrl.searchParams;
    const cursor = searchParams.get("cursor");
    const limit = searchParams.get("limit") || "10";

    // Construct the Shopify API URL
    const url = new URL(
      `${shopifyConfig.storeUrl}/admin/api/${shopifyConfig.apiVersion}/products.json`
    );

    // Add pagination parameters
    url.searchParams.append("limit", limit);
    if (cursor) {
      url.searchParams.append("page_info", cursor);
    }

    // Make the request to Shopify API
    const response = await fetch(url.toString(), {
      headers: {
        "X-Shopify-Access-Token": shopifyConfig.apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    // Get the data and Link header for pagination
    const data = await response.json();
    const linkHeader = response.headers.get("Link");

    // Parse pagination info from Link header
    let pageInfo = {
      hasNextPage: false,
      endCursor: null as string | null,
    };

    if (linkHeader) {
      const nextLink = linkHeader
        .split(",")
        .find((link) => link.includes('rel="next"'));

      if (nextLink) {
        pageInfo.hasNextPage = true;
        const matches = nextLink.match(/page_info=([^&>]*)/);
        if (matches && matches[1]) {
          pageInfo.endCursor = matches[1];
        }
      }
    }

    // Format the products to match our interface
    const formattedProducts = data.products.map((product: any) => {
      const price =
        product.variants && product.variants[0]
          ? product.variants[0].price
          : "0.00";

      return {
        id: product.id.toString(),
        title: product.title,
        handle: product.handle,
        vendor: product.vendor,
        product_type: product.product_type,
        body_html: product.body_html,
        price,
        image: product.image,
        variants: product.variants.map((variant: any) => ({
          id: variant.id.toString(),
          price: variant.price,
        })),
      };
    });

    // Return the formatted response
    return NextResponse.json({
      products: formattedProducts,
      pageInfo,
    });
  } catch (error) {
    console.error("Error fetching Shopify products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products from Shopify" },
      { status: 500 }
    );
  }
}
