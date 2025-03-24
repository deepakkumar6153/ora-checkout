// Google Apps Script configuration
const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

// Function to read products from Google Sheet
export const readProductsFromSheet = async () => {
  try {
    const response = await fetch(SCRIPT_URL);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error reading products from Google Sheet:', error);
    throw error;
  }
};

// Function to submit order data
export const submitOrderToSheet = async (orderData) => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit order');
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error submitting order to Google Sheet:', error);
    throw error;
  }
}; 