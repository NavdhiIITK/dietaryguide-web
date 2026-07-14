export type PaymentMethod = "cod" | "razorpay";
export type PaymentStatus = "pending" | "paid" | "failed";

export interface PaymentResult {
  status: PaymentStatus;
  method: PaymentMethod;
  paymentId?: string;
}

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  pending: "Pending Offline Payment (COD)",
  paid: "Paid",
  failed: "Payment Failed",
};

/**
 * Payment is bypassed until Razorpay is integrated — every checkout is
 * accepted as Cash on Delivery / pending offline payment.
 *
 * CartDrawer calls this BEFORE createOrder (not the other way around),
 * because a real payment step needs to show the user a UI (Razorpay's
 * checkout modal) and wait for it to resolve before the order can be
 * finalized. Keeping that seam here means adding Razorpay later is:
 *   1. Create a Razorpay order for `amountInRupees` via a backend endpoint
 *      (Razorpay's key secret must never be used from the browser)
 *   2. Open Razorpay's checkout.js with that order id
 *   3. On the success callback, verify the payment signature via the backend
 *   4. Return { status: "paid", method: "razorpay", paymentId }
 * No other file in the checkout flow needs to change.
 */
export async function processPayment(amountInRupees: number): Promise<PaymentResult> {
  return { status: "pending", method: "cod" };
}
