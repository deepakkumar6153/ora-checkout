// Mock data for local testing
export const mockProducts = [
  {
    id: "PROD_1",
    name: "Cotton Bedsheet Set",
    category: "bedsheets",
    description: "Premium cotton bedsheet set with 2 pillow covers",
    salePrice: 1999,
    minSalePrice: 1899,
    image: "/images/bedsheet.jpg",
    price: 1999
  },
  {
    id: "PROD_2",
    name: "Silk Cushion Cover",
    category: "cushion-covers",
    description: "Luxury silk cushion cover with zipper",
    salePrice: 799,
    minSalePrice: 759,
    image: "/images/cushion.jpg",
    price: 799
  },
  {
    id: "PROD_3",
    name: "Cotton Towel Set",
    category: "towels",
    description: "Set of 4 premium cotton towels",
    salePrice: 1299,
    minSalePrice: 1234,
    image: "/images/towel.jpg",
    price: 1299
  }
];

// Mock order data structure
export const mockOrderData = {
  location: "Store A",
  salesId: "SALE_001",
  productName: "Cotton Bedsheet Set",
  quantity: 2,
  productSalePrice: 1999,
  productMinPrice: 1899,
  productFinalPrice: 1950,
  totalCartPrice: 3900,
  customerName: "John Doe",
  customerPhone: "9876543210",
  notes: "Delivery required"
}; 