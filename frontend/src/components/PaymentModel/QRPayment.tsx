import { QrCode } from "lucide-react";

export default function QRPayment() {
  return (
    <div className="flex flex-col items-center py-8">
      <div className="w-52 h-52 bg-gray-100 rounded-2xl flex items-center justify-center">
        <QrCode size={120} />
      </div>

      <p className="mt-4 text-gray-500 text-center">
        Scan KHQR using ABA, ACLEDA, Wing Bank or any supported banking app.
      </p>
    </div>
  );
}
