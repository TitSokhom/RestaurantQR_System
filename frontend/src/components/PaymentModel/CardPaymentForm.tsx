import { CreditCard, Lock } from "lucide-react";

interface Props {
  cardName: string;
  setCardName: (value: string) => void;

  cardNumber: string;
  setCardNumber: (value: string) => void;

  expiry: string;
  setExpiry: (value: string) => void;

  cvv: string;
  setCvv: (value: string) => void;
}

export default function CardPaymentForm({
  cardName,
  setCardName,
  cardNumber,
  setCardNumber,
  expiry,
  setExpiry,
  cvv,
  setCvv,
}: Props) {
  return (
    <div className="space-y-4">

      <div>
        <label className="block text-sm font-semibold mb-2">
          Cardholder Name
        </label>

        <input
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="John Doe"
          className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Card Number
        </label>

        <div className="relative">
          <input
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            className="w-full border rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <CreditCard
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-semibold mb-2">
            Expiry
          </label>

          <input
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="block text-sm font-semibold mb-2">
            CVV
          </label>

          <div className="relative">
            <input
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              className="w-full border rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <Lock
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

      </div>

    </div>
  );
}