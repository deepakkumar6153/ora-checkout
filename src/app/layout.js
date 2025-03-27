"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { OrderProvider } from "@/context/OrderContext";
import { MenuProvider } from "@/context/MenuContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showBackButton = pathname.startsWith('/cart') || pathname.startsWith('/details');

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <OrderProvider>
          <MenuProvider>
            <div className="min-h-screen flex flex-col bg-white">
              <Header showBackButton={showBackButton} />
              <main className="flex-1 pt-14 px-4 pb-4 bg-white">
                {children}
              </main>
              <Footer />
            </div>
          </MenuProvider>
        </OrderProvider>
      </body>
    </html>
  );
}

// import { usePathname, useRouter } from "next/navigation";
// import { IoArrowBackOutline, IoReloadOutline } from "react-icons/io5";
// import { useOrder } from "@/context/OrderContext";

// export const Layout = function Layout({ children }) {
//   const router = useRouter();
//   const { resetOrder } = useOrder(); // Access reset function from context
//   const pathname = usePathname(); // Correct for App Router

//   // Handle reset logic
//   const handleReset = () => {
//     resetOrder(); // Clear order/cart
//     router.push("/"); // Redirect to home page
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center relative">
//       {/* Back Button */}
//       {pathname !== "/" && (
//         <button
//           onClick={() => router.back()}
//           className="absolute top-6 left-6 p-3 bg-white/60 backdrop-blur-lg rounded-full shadow-md hover:bg-white/80 active:scale-95 transition duration-150"
//         >
//           <IoArrowBackOutline className="text-gray-700 w-6 h-6" />
//         </button>
//       )}

//       {/* Reset/Restart Button (Top-Right) */}
//       <button
//         onClick={handleReset}
//         className="absolute top-6 right-6 p-3 bg-white/60 backdrop-blur-lg rounded-full shadow-md hover:bg-white/80 active:scale-95 transition duration-150"
//       >
//         <IoReloadOutline className="text-gray-700 w-6 h-6" />
//       </button>

//       {/* Main Content */}
//       <main className="w-full max-w-4xl p-4 sm:p-6 flex-1">{children}</main>
//     </div>
//   );
// };
