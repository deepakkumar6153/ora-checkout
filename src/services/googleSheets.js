// Google Sheets API configuration
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
const SHEET_NAME = 'Orders';

// Function to read products from Google Sheets
export const readProductsFromSheet = async () => {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A:Z?key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    const rows = data.values;
    
    // Skip header row and map data to product objects
    const products = rows.slice(1).map(row => ({
      id: row[0] || '',
      name: row[1] || '',
      category: row[2] || '',
      description: row[3] || '',
      size: row[4] || '',
      material: row[5] || '',
      price: parseFloat(row[6]) || 0,
      salePrice: parseFloat(row[7]) || 0,
      minSalePrice: parseFloat(row[8]) || 0,
      image: row[9] || '',
    }));

    return products;
  } catch (error) {
    console.error('Error reading products from Google Sheets:', error);
    throw error;
  }
};

// Function to write order data to Google Sheets
export const writeOrderToSheet = async (orderData) => {
  try {
    // Format the data for Google Sheets
    const values = orderData.map(order => [
      order.location || '',
      order.salesId || '',
      order.productName || '',
      order.productSalePrice || '',
      order.productMinPrice || '',
      order.productFinalPrice || '',
      order.customerName || '',
      order.customerPhone || '',
      order.notes || '',
      order.quantity || '',
      order.totalCartPrice || '',
      order.timestamp || new Date().toISOString()
    ]);

    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A:K:append?valueInputOption=USER_ENTERED&key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to write order data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error writing order to Google Sheets:', error);
    throw error;
  }
}; 