function Header() {
  return (
    <header className="flex justify-between items-center max-w-6xl mx-auto bg-[#f4f7f5]">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-[#1e293b]">
          Payment Confirmations
        </h1>
        <p className="text-sm text-gray-500 font-medium mt-0.5">
          Review and verify incoming kitchen transactions
        </p>
      </div>
    </header>
  );
}

export default Header;
