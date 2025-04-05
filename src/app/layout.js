"use client";
import './globals.css'
import { Inter } from 'next/font/google'
import { OrderProvider } from '@/context/OrderContext'
import { MenuProvider } from '@/context/MenuContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showBackButton = pathname !== '/';
  const showFooter = pathname !== '/';

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <title>ORA LIVING</title>
      </head>
      <body className={`${inter.className} bg-white`}>
        <OrderProvider>
          <MenuProvider>
            <Header showBackButton={showBackButton} />
            <main className="min-h-screen pb-4 bg-white">
              {children}
            </main>
            {showFooter && <Footer />}
          </MenuProvider>
        </OrderProvider>
      </body>
    </html>
  )
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
