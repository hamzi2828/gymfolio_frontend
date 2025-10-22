import React, { useState } from 'react';
import { type Package } from '../../packages/services/packageService';

interface OrderSummaryProps {
  packageData?: Package | null;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  packageData
}) => {
  const [discountInput, setDiscountInput] = useState('');
  const [applyingDiscount, setApplyingDiscount] = useState(false);

  const isPackageCheckout = !!packageData;

  const handleApplyDiscount = async () => {
    if (!discountInput.trim()) {
      alert('Please enter a discount code');
      return;
    }

    try {
      setApplyingDiscount(true);
      // Placeholder for discount logic
      // In real implementation, validate with backend
      alert('Discount codes coming soon!');
    } catch {
      alert('Failed to apply discount code');
    } finally {
      setApplyingDiscount(false);
    }
  };

  // Calculate totals based on checkout type
  let subtotalAmount = 0;
  if (isPackageCheckout && packageData) {
    subtotalAmount = parseFloat(packageData.price);
  }

  const finalSubtotal = subtotalAmount;
  const finalTotal = finalSubtotal;

  if (!isPackageCheckout || !packageData) {
    return (
      <div className="lg:pl-8">
        <div className="sticky top-24 bg-white rounded-lg shadow-sm p-6">
          <div className="text-center py-8">
            <div className="text-gray-500 mb-4">
              No package selected
            </div>
            <a href="/packages" className="text-blue-600 hover:text-blue-800">
              Browse packages
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-8">
      <div className="sticky top-24 bg-white rounded-lg shadow-sm p-6 space-y-8">
        {/* Package Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="checkout-product-title font-semibold text-lg">
                    {packageData.name} Package
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {packageData.period}
                  </p>
                </div>
                <div className="checkout-shipping-price font-bold text-lg">
                  {packageData.currency} {packageData.price}
                </div>
              </div>

              {packageData.features && packageData.features.length > 0 && (
                <div className="border-t pt-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Package Features:</p>
                  <ul className="space-y-1">
                    {packageData.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                    {packageData.features.length > 3 && (
                      <li className="text-sm text-gray-500 italic">
                        +{packageData.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Discount Code Field */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Discount code or gift card"
                value={discountInput}
                onChange={(e) => setDiscountInput(e.target.value)}
                className="checkout-input w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                disabled={applyingDiscount}
              />
            </div>
            <button
              type="button"
              onClick={handleApplyDiscount}
              disabled={applyingDiscount}
              className="px-6 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors checkout-input duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {applyingDiscount ? 'APPLYING...' : 'APPLY'}
            </button>
          </div>


        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          {/* Subtotal */}
          <div className="flex items-center justify-between">
            <span className="checkout-subtotal-label text-gray-600">
              Package Price
            </span>
            <span className="checkout-shipping-price font-medium">
              {packageData.currency} {subtotalAmount.toLocaleString()}
            </span>
          </div>




          {/* Total */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="checkout-total-label font-bold text-lg">Total</span>
              <span className="checkout-total-price font-bold text-lg">
                {packageData.currency} {finalTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
