// Define the sheets we're working with
export const SHEETS = {
  PRODUCTS: 'Products',
  ORDERS: 'Orders'
};

// Define core app properties that should always exist
export const APP_PROPERTIES = {
  PRODUCT: {
    id: '',
    name: '',
    category: '',
    description: '',
    salePrice: 0,
    minSalePrice: 0,
    image: ''
  },
  ORDER: {
    location: '',
    salesId: '',
    productName: '',
    quantity: 0,
    productSalePrice: 0,
    productMinPrice: 0,
    productFinalPrice: 0,
    totalCartPrice: 0,
    customerName: '',
    customerPhone: '',
    notes: ''
  }
};

// Define how sheet columns map to app properties
export const SHEET_TO_APP_MAPPING = {
  [SHEETS.PRODUCTS]: {
    name: 'name',
    category: 'category',
    description: 'description',
    salePrice: 'salePrice',
    minSalePrice: 'minSalePrice',
    image: 'image'
  },
  [SHEETS.ORDERS]: {
    location: 'location',
    salesId: 'salesId',
    productName: 'productName',
    quantity: 'quantity',
    productSalePrice: 'productSalePrice',
    productMinPrice: 'productMinPrice',
    productFinalPrice: 'productFinalPrice',
    totalCartPrice: 'totalCartPrice',
    customerName: 'customerName',
    customerPhone: 'customerPhone',
    notes: 'notes'
  }
};

// Define how app properties map to sheet columns
export const APP_TO_SHEET_MAPPING = {
  [SHEETS.PRODUCTS]: {
    name: 'name',
    category: 'category',
    description: 'description',
    salePrice: 'salePrice',
    minSalePrice: 'minSalePrice',
    image: 'image'
  },
  [SHEETS.ORDERS]: {
    location: 'location',
    salesId: 'salesId',
    productName: 'productName',
    quantity: 'quantity',
    productSalePrice: 'productSalePrice',
    productMinPrice: 'productMinPrice',
    productFinalPrice: 'productFinalPrice',
    totalCartPrice: 'totalCartPrice',
    customerName: 'customerName',
    customerPhone: 'customerPhone',
    notes: 'notes'
  }
};

// Helper function to transform data based on mapping
export const transformData = (data, mapping, sheetType) => {
  if (!Array.isArray(data)) {
    console.error('Data must be an array');
    return [];
  }

  return data.map(item => {
    const transformed = { ...APP_PROPERTIES[sheetType === SHEETS.PRODUCTS ? 'PRODUCT' : 'ORDER'] };
    
    Object.entries(mapping).forEach(([appProp, sheetProp]) => {
      if (item[sheetProp] !== undefined) {
        transformed[appProp] = item[sheetProp];
      }
    });

    return transformed;
  });
};

// Helper function to validate sheet structure
export const validateSheetStructure = (data, mapping) => {
  if (!Array.isArray(data) || data.length === 0) {
    return false;
  }

  const firstRow = data[0];
  const requiredColumns = Object.values(mapping);
  
  return requiredColumns.every(col => col in firstRow);
}; 