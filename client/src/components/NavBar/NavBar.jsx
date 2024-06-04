import Link from "next/link";
import Image from "next/image";
import imgSrc from './4m.png';

export default function NavBar() {
  return (
    <div className="w-full bg-gray-300 p-2 shadow-md fixed top-0 left-0 z-50">
      <nav className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
        <div className="flex items-center">
          <Image src={imgSrc} alt="Logo" width={50} height={50} className="ml-5" />
          <Link href="/OrdersPage">
            <h2 className="hover:underline cursor-pointer ml-5">PEDIDOS</h2>
          </Link>
          <Link href="/CreateOrderPage">
            <h2 className="hover:underline cursor-pointer ml-5">NUEVO PEDIDO</h2>
          </Link>
        </div>
      </nav>
    </div>
  );
}
