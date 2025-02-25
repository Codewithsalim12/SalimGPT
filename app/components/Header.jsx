import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 text-center fixed top-0 w-full z-1000">
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-yellow-400 flex items-center">
          {/* <span className="text-yellow-400">Welcome to</span> */} SaleemGPT
        </h1>
        {/* Hide the logo on smaller devices, show only on sm+ */}
        {/* <div className="hidden sm:block">
          <Image
            src="/logo.jpg"
            width={40}
            height={40}
            alt="SalimGPT Logo"
            className="rounded-full shadow-md"
          />
        </div> */}
      </div>
      <p className="text-xs sm:text-sm mt-2 px-2">
        This AI can make mistakes. Verify important information.
      </p>
    </header>
  );
}
