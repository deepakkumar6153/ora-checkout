import HomePage from "@/components/HomePage";
import { OrderProvider } from "@/context/OrderContext";
import RootLayout from "./layout";

export default function Home() {
  return (
    <OrderProvider>
      <RootLayout>
        <HomePage />
      </RootLayout>
    </OrderProvider>
  );
}
