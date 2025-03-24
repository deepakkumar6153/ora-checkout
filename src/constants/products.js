export const products = [
  // Bedsheets
  {
    id: "bedsheet-1",
    name: "Cotton Bedsheet Set",
    category: "Bedsheets",
    description: "Premium cotton bedsheet set with 2 pillow covers",
    size: "King Size",
    material: "100% Cotton",
    price: 2499,
    salePrice: 2499,
    minSalePrice: 2374, // 95% of sale price
    finalPrice: 2499, // Will be calculated at checkout
    image: "/images/bedsheet-1.jpg",
  },
  {
    id: "bedsheet-2",
    name: "Silk Bedsheet Set",
    category: "bedsheets",
    price: 3999,
    salePrice: 2999,
    minSalePrice: 2499,
    description: "Luxury silk bedsheet set with 2 pillow covers",
    size: "Queen Size",
    material: "Silk Blend",
    image: "/images/bedsheet-2.jpg"
  },

  // Quilts
  {
    id: "quilt-1",
    name: "Winter Quilt",
    category: "Quilts",
    description: "Warm and cozy winter quilt",
    size: "King Size",
    material: "Cotton Blend",
    price: 3999,
    salePrice: 3999,
    minSalePrice: 3799, // 95% of sale price
    finalPrice: 3999,
    image: "/images/quilt-1.jpg",
  },
  {
    id: "quilt-2",
    name: "Light Summer Quilt",
    category: "quilts",
    price: 2999,
    salePrice: 2499,
    minSalePrice: 1999,
    description: "Lightweight summer quilt perfect for warm weather",
    size: "Queen Size",
    material: "Cotton",
    image: "/images/quilt-2.jpg"
  },

  // Cushion Covers
  {
    id: "cushion-1",
    name: "Decorative Cushion Cover",
    category: "Cushion Covers",
    description: "Beautiful printed cushion cover",
    size: "Standard",
    material: "Cotton",
    price: 799,
    salePrice: 799,
    minSalePrice: 759, // 95% of sale price
    finalPrice: 799,
    image: "/images/cushion-1.jpg",
  },
  {
    id: "cushion-2",
    name: "Printed Cushion Cover",
    category: "cushion-covers",
    price: 799,
    salePrice: 599,
    minSalePrice: 499,
    description: "Modern printed cushion cover with vibrant colors",
    size: "16x16 inches",
    material: "Cotton",
    image: "/images/cushion-2.jpg"
  },

  // Table Covers
  {
    id: "table-1",
    name: "Elegant Table Runner",
    category: "table-covers",
    price: 1499,
    salePrice: 1299,
    minSalePrice: 999,
    description: "Elegant table runner with lace trim",
    size: "72x12 inches",
    material: "Cotton",
    image: "/images/table-1.jpg"
  },
  {
    id: "table-2",
    name: "Festive Table Cloth",
    category: "table-covers",
    price: 1999,
    salePrice: 1699,
    minSalePrice: 1499,
    description: "Festive table cloth with decorative patterns",
    size: "60x60 inches",
    material: "Cotton",
    image: "/images/table-2.jpg"
  },

  // Bathrobes
  {
    id: "bathrobe-1",
    name: "Cotton Bathrobe",
    category: "bathrobes",
    price: 2499,
    salePrice: 1999,
    minSalePrice: 1799,
    description: "Comfortable cotton bathrobe with hood",
    size: "One Size",
    material: "Cotton",
    image: "/images/bathrobe-1.jpg"
  },
  {
    id: "bathrobe-2",
    name: "Silk Bathrobe",
    category: "bathrobes",
    price: 3999,
    salePrice: 3499,
    minSalePrice: 2999,
    description: "Luxury silk bathrobe with belt",
    size: "One Size",
    material: "Silk",
    image: "/images/bathrobe-2.jpg"
  },

  // Towels
  {
    id: "towel-1",
    name: "Bath Towel Set",
    category: "towels",
    price: 1999,
    salePrice: 1699,
    minSalePrice: 1499,
    description: "Set of 4 premium bath towels",
    size: "Standard",
    material: "Cotton",
    image: "/images/towel-1.jpg"
  },
  {
    id: "towel-2",
    name: "Beach Towel",
    category: "towels",
    price: 1499,
    salePrice: 1299,
    minSalePrice: 999,
    description: "Large beach towel with quick-dry material",
    size: "Large",
    material: "Microfiber",
    image: "/images/towel-2.jpg"
  },

  // Bags
  {
    id: "bag-1",
    name: "Laundry Bag",
    category: "bags",
    price: 999,
    salePrice: 799,
    minSalePrice: 599,
    description: "Durable laundry bag with drawstring",
    size: "Large",
    material: "Cotton",
    image: "/images/bag-1.jpg"
  },
  {
    id: "bag-2",
    name: "Storage Bag",
    category: "bags",
    price: 1499,
    salePrice: 1299,
    minSalePrice: 999,
    description: "Vacuum storage bag for seasonal items",
    size: "Extra Large",
    material: "Plastic",
    image: "/images/bag-2.jpg"
  },

  // Kitchen Textiles
  {
    id: "kitchen-1",
    name: "Apron Set",
    category: "kitchen-textiles",
    price: 999,
    salePrice: 799,
    minSalePrice: 599,
    description: "Set of 2 kitchen aprons with pockets",
    size: "One Size",
    material: "Cotton",
    image: "/images/kitchen-1.jpg"
  },
  {
    id: "kitchen-2",
    name: "Oven Mitts",
    category: "kitchen-textiles",
    price: 799,
    salePrice: 599,
    minSalePrice: 499,
    description: "Heat-resistant oven mitts with grip",
    size: "Standard",
    material: "Cotton + Silicon",
    image: "/images/kitchen-2.jpg"
  },

  // Curtains
  {
    id: "curtain-1",
    name: "Blackout Curtains",
    category: "curtains",
    price: 3999,
    salePrice: 3499,
    minSalePrice: 2999,
    description: "Blackout curtains with thermal insulation",
    size: "52x84 inches",
    material: "Polyester",
    image: "/images/curtain-1.jpg"
  },
  {
    id: "curtain-2",
    name: "Sheer Curtains",
    category: "curtains",
    price: 2999,
    salePrice: 2499,
    minSalePrice: 1999,
    description: "Light and airy sheer curtains",
    size: "52x84 inches",
    material: "Polyester",
    image: "/images/curtain-2.jpg"
  }
];


