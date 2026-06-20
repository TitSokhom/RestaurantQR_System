import { CreditCard, Wallet, QrCode, Building2, User2 } from "lucide-react";
import type { PaymentMethod } from "../../types/payment";

interface Props {
  activeTab: PaymentMethod;
  setActiveTab: (tab: PaymentMethod) => void;
}

export default function PaymentTabs({ activeTab, setActiveTab }: Props) {
  const tabs = [
    { id: "card", label: "Card", icon: CreditCard },
    { id: "wallets", label: "Wallet", icon: Wallet },
    { id: "upi_qr", label: "QR", icon: QrCode },
    { id: "bank_qr", label: "Bank", icon: Building2 },
    { id: "cashier", label: "Cashier", icon: User2 },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 bg-gray-50 p-2 rounded-xl">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as PaymentMethod)}
            className={`
              flex flex-col items-center
              py-2 sm:py-3
              px-1 sm:px-2
              rounded-xl
              border
              transition
              ${
                isActive
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-600"
              }
            `}
          >
            <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="text-[10px] sm:text-xs mt-1">
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}