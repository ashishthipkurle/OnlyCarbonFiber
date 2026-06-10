import { createBrowserRouter } from "react-router";
import { Layout } from "./components/common/Layout";
import { Home } from "./pages/Home";
import { Marketplace } from "./pages/Marketplace";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { OrderSuccess } from "./pages/OrderSuccess";
import { Orders } from "./pages/Orders";
import { Auth } from "./pages/Auth";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { FAQ } from "./pages/FAQ";
import { Account } from "./pages/Account";
import { Wishlist } from "./pages/Wishlist";
import { ShippingPolicy } from "./pages/ShippingPolicy";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Marketplace },
      { path: "product/:id", Component: ProductDetail },
      { path: "cart", Component: Cart },
      { path: "checkout", element: <Checkout /> },
      { path: "order-success", element: <OrderSuccess /> },
      { path: "orders", element: <Orders /> },
      { path: "auth", element: <Auth /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "faq", element: <FAQ /> },
      { path: "account", element: <Account /> },
      { path: "account/wishlist", element: <Wishlist /> },
      { path: "shipping-policy", element: <ShippingPolicy /> },
      { path: "privacy", element: <div className="pt-32 px-12 pb-24 min-h-screen text-center"><h1 className="text-4xl font-['Cormorant_Garamond'] mb-4">Privacy Policy</h1><p className="text-[#6B6B6B]">Static content to be provided.</p></div> },
      { path: "terms", element: <div className="pt-32 px-12 pb-24 min-h-screen text-center"><h1 className="text-4xl font-['Cormorant_Garamond'] mb-4">Terms of Service</h1><p className="text-[#6B6B6B]">Static content to be provided.</p></div> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);
