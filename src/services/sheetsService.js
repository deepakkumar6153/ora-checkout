import {
  SHEET_TO_APP_MAPPING,
  APP_TO_SHEET_MAPPING,
  transformData,
  validateSheetStructure,
  SHEETS,
} from "@/constants/columnMappings";
import { getISTISOString, getCurrentISTTimestamp, isTimestampValid } from '@/utils/timeUtils';

const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

// Log environment and URL (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Using Script URL:', SCRIPT_URL);
  console.log('All env variables:', process.env);
}

// Cache constants
const PRODUCTS_CACHE_KEY = 'ora_products_cache';
const CACHE_EXPIRY_HOURS = 8;

// Function to read products from Google Sheet
export const readProductsFromSheet = async (forceRefresh = false) => {
  try {
    if (!SCRIPT_URL) {
      console.error('Environment variables:', process.env);
      throw new Error(
        `SCRIPT_URL is not defined. Current value: ${SCRIPT_URL}. Please check your .env.local file and ensure NEXT_PUBLIC_GOOGLE_SCRIPT_URL is set correctly.`
      );
    }

    // Check cache first if not forcing refresh
    if (!forceRefresh) {
      const cachedData = localStorage.getItem(PRODUCTS_CACHE_KEY);
      if (cachedData) {
        const { products, timestamp } = JSON.parse(cachedData);
        if (isTimestampValid(timestamp, CACHE_EXPIRY_HOURS * 60 * 60 * 1000)) {
          console.log("Using cached products data from localStorage");
          return products;
        }
      }
    }

    // Only fetch if we don't have valid cached data or if forceRefresh is true
    console.log("Fetching products from Google Sheet...");
    console.log("Using Script URL:", SCRIPT_URL);
    const response = await fetch(SCRIPT_URL);
    const rawData = await response.json();
    console.log("Raw data received from sheet:", rawData);

    // If we have data but structure doesn't match, try to map what we can
    if (rawData.length > 0) {
      console.log("First product raw data:", rawData[0]);
      console.log("Available columns in raw data:", Object.keys(rawData[0]));
      console.log(
        "Expected columns from mapping:",
        Object.keys(SHEET_TO_APP_MAPPING[SHEETS.PRODUCTS])
      );

      // Transform data and add incremental count as unique key
      const products = transformData(
        rawData,
        SHEET_TO_APP_MAPPING[SHEETS.PRODUCTS],
        SHEETS.PRODUCTS
      ).map((product, index) => ({
        ...product,
        uniqueKey: `${product.id}_${index + 1}`,
        id: `${product.id}_${index + 1}`,
      }));

      // Cache the products in localStorage
      try {
        localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify({
          products,
          timestamp: getCurrentISTTimestamp()
        }));
        console.log("Products cached in localStorage successfully");
      } catch (error) {
        console.error("Error caching products in localStorage:", error);
      }

      console.log("Transformed products:", products);
      console.log("First transformed product:", products[0]);
      return products;
    }

    throw new Error("No data found in sheet");
  } catch (error) {
    console.error("Error reading products from Google Sheet:", error);
    throw error;
  }
};

// Function to submit order to Google Sheet
export const submitOrderToSheet = async (orderData) => {
  try {
    if (!SCRIPT_URL) {
      throw new Error(
        "SCRIPT_URL is not defined. Please check your .env.local file"
      );
    }

    console.log("Preparing order data for submission...");
    console.log("Original order data:", orderData);

    // Transform data to match Google Sheet columns while using camelCase keys
    const sheetData = orderData.map((order) => ({
      timestamp: getISTISOString(), // Use IST time for order timestamp
      location: order.location,
      salesId: order.salesId,
      productName: order.productName,
      quantity: order.quantity,
      productSalePrice: order.productSalePrice,
      productMinPrice: order.productMinPrice,
      productFinalPrice: order.productFinalPrice,
      totalCartPrice: order.totalCartPrice,
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      notes: order.notes,
    }));

    console.log("Final sheet data to be sent:", sheetData);

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      body: JSON.stringify({
        action: "submitOrder",
        data: sheetData,
      }),
    });

    const result = true;
    return result;
  } catch (error) {
    console.error("Error submitting order to Google Sheet:", error);
    throw error;
  }
};
