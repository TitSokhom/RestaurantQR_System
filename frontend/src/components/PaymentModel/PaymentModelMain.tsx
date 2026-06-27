import { useState } from "react";

import type { CartItem, PaymentMethod } from "../../types/payment";

import PaymentTabs from "./PaymentTabs";
import CardPaymentForm from "./CardPaymentForm";
import QRPayment from "./QRPayment";
import WalletPayment from "./WalletPayment";
import CashierPayment from "./CashierPayment";
import OrderSummary from "./OrderSummary";
import { createPayment } from "../../services/payment.service";

interface PaymentProps {
  tableNumber: number;
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onPaymentSuccess: () => void;
  // tableId: string
  orderId :string
}

function PaymentModalMain({
  tableNumber,
  isOpen,
  onClose,
  items,
  onPaymentSuccess,
  orderId,
}: PaymentProps) {
  const [activeTab, setActiveTab] = useState<PaymentMethod>("card");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const serviceFee = subtotal * 0.05;
  const vat = subtotal * 0.1;
  const total = subtotal + serviceFee + vat;

  const isCardValid =
    cardName.trim() && cardNumber.trim() && expiry.trim() && cvv.trim();

  const handlePay = async () => {
  if (isProcessing) return;

  try {
    setIsProcessing(true);

    await createPayment({
      orderId: orderId,
      amount: total,
      method: activeTab === "card" ? "CARD" :
           activeTab === "cashier" ? "CASH" :
           activeTab === "upi_qr" ? "KHQR" :
           "KHQR",
    });

    setIsSuccess(true);
  } catch (error) {
    console.error(error);
  } finally {
    setIsProcessing(false);
  }
};

  if (!isOpen) return null;

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-sm rounded-2xl p-6 text-center shadow-2xl">
          <div className="text-5xl mb-3">🎉</div>

          <h2 className="text-xl font-bold text-green-600">
            Payment Successful
          </h2>

          <p className="text-gray-500 mt-2 text-sm">
            Your order has been paid successfully
          </p>

          <button
            onClick={() => {
              onPaymentSuccess();
              setIsSuccess(false);
              onClose();
            }}
            className="mt-5 w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/50
        flex items-center justify-center
        p-2 sm:p-4
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-white
          w-full
          max-w-[95vw]
          sm:max-w-xl
          md:max-w-3xl
          lg:max-w-5xl
          xl:max-w-6xl
          max-h-[95vh]
          rounded-2xl
          shadow-2xl
          overflow-y-auto
        "
      >
        {/* CONTENT WRAPPER (NO INTERNAL SCROLL) */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT = ORDER SUMMARY (FIRST) */}
          <div className="bg-emerald-50 border-b lg:border-b-0 lg:border-r">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              serviceFee={serviceFee}
              vat={vat}
              total={total}
            />
          </div>

          {/* RIGHT = PAYMENT */}
          <div className="flex flex-col">
            {/* HEADER */}
            <div
              className="
              flex items-center justify-between
              p-4 sm:p-5
              border-b
            "
            >
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                  Complete Your Order
                </h2>

                <div className="mt-2">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                    Table {tableNumber}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            {/* PAYMENT CONTENT */}
            <div className="p-4 sm:p-5">
              <PaymentTabs activeTab={activeTab} setActiveTab={setActiveTab} />

              <div className="mt-6">
                {activeTab === "card" && (
                  <CardPaymentForm
                    cardName={cardName}
                    setCardName={setCardName}
                    cardNumber={cardNumber}
                    setCardNumber={setCardNumber}
                    expiry={expiry}
                    setExpiry={setExpiry}
                    cvv={cvv}
                    setCvv={setCvv}
                  />
                )}

                {activeTab === "upi_qr" && <QRPayment />}
                {activeTab === "wallets" && <WalletPayment />}
                {activeTab === "cashier" && <CashierPayment />}
                {activeTab === "bank_qr" && <QRPayment />}
              </div>
            </div>

            {/* FOOTER */}
            <div className="border-t p-4 sm:p-5 bg-white">
              <button
                disabled={activeTab === "card" && !isCardValid}
                onClick={handlePay}
                className="
    w-full
    bg-emerald-600 hover:bg-emerald-700
    disabled:bg-gray-300
    text-white
    py-3
    rounded-xl
    font-semibold
  "
              >
                {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PaymentModalMain;
