// Google Apps Script configuration
const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

// Import column mappings
import { 
  SHEET_TO_APP_MAPPING, 
  APP_TO_SHEET_MAPPING, 
  transformData, 
  validateSheetStructure,
  SHEETS 
} from '@/constants/columnMappings';

// Function to read products from Google Sheet
export const readProductsFromSheet = async () => {
  try {
    if (!SCRIPT_URL) {
      throw new Error('SCRIPT_URL is not defined. Please check your .env.local file');
    }

    console.log('Fetching products from Google Sheet...');
    const response = await fetch(SCRIPT_URL);
    const rawData = await response.json();
    console.log('Raw data received from sheet:', rawData);

    // If we have data but structure doesn't match, try to map what we can
    if (rawData.length > 0) {
      console.log('First product raw data:', rawData[0]);
      console.log('Available columns in raw data:', Object.keys(rawData[0]));
      console.log('Expected columns from mapping:', Object.keys(SHEET_TO_APP_MAPPING[SHEETS.PRODUCTS]));
      
      // Transform data and add incremental count as unique key
      const products = transformData(rawData, SHEET_TO_APP_MAPPING[SHEETS.PRODUCTS], SHEETS.PRODUCTS)
        .map((product, index) => ({
          ...product,
          uniqueKey: `${product.id}_${index + 1}`, // Add unique key combining original id and index
          id: `${product.id}_${index + 1}` // Replace id with unique key to ensure React treats them uniquely
        }));

      console.log('Transformed products:', products);
      console.log('First transformed product:', products[0]);
      return products;
    }
    
    throw new Error('No data found in sheet');
  } catch (error) {
    console.error('Error reading products from Google Sheet:', error);
    throw error;
  }
};

// Function to submit order to Google Sheet
export const submitOrderToSheet = async (orderData) => {
  try {
    if (!SCRIPT_URL) {
      throw new Error('SCRIPT_URL is not defined. Please check your .env.local file');
    }

    console.log('Preparing order data for submission...');
    console.log('Original order data:', orderData);

    // Transform data to match Google Sheet columns while using camelCase keys
    const sheetData = orderData.map(order => ({
      timestamp: new Date().toISOString(),
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
      notes: order.notes
    }));
    
    console.log('Final sheet data to be sent:', sheetData);
    
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'submitOrder',
        data: sheetData
      })
    });

    const result = await response.json();
    console.log('Response from sheet submission:', result);
    return result.success;
  } catch (error) {
    console.error('Error submitting order to Google Sheet:', error);
    throw error;
  }
}; 