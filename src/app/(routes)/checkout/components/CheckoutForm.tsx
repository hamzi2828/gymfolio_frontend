"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import "@fortawesome/fontawesome-free/css/all.css";
import { checkoutService, type ShippingAddress } from "../services/checkoutService";
import { getCurrentUser } from "../../../../helper/helper";
import { type Package } from "../../packages/services/packageService";

export interface OrderData {
  orderId: string;
  shippingAddress: ShippingAddress;
  packageId?: string;
  totalAmount: number;
}

interface CheckoutFormProps {
  onOrderCreate?: (orderData: OrderData) => void;
  discountCode?: string;
  discountAmount?: number;
  packageData?: Package | null;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ packageData }) => {
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isPackageCheckout = !!packageData;

  // Form data states
  const [shippingData, setShippingData] = useState<ShippingAddress>({
    email: '',
    country: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    phoneNumber: ''
  });

  // Update shipping data
  const updateShippingData = (field: keyof ShippingAddress, value: string) => {
    setShippingData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Auto-fill user data if logged in
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setShippingData(prev => ({
        ...prev,
        email: currentUser.email || prev.email,
        firstName: currentUser.firstName || prev.firstName,
        lastName: currentUser.lastName || prev.lastName
      }));
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      // Check if package exists (only for package checkout)
      if (isPackageCheckout && !packageData) {
        alert('Package not found. Please select a valid package.');
        setIsSubmitting(false);
        return;
      }

      // Validate shipping address
      const shippingValidation = checkoutService.validateShippingAddress(shippingData);
      if (!shippingValidation.valid) {
        const newErrors: Record<string, string> = {};
        shippingValidation.errors.forEach(error => {
          if (error.includes('Email')) newErrors.email = error;
          if (error.includes('First name')) newErrors.firstName = error;
          if (error.includes('Last name')) newErrors.lastName = error;
          if (error.includes('Country')) newErrors.country = error;
          if (error.includes('Address')) newErrors.address = error;
          if (error.includes('City')) newErrors.city = error;
          if (error.includes('Phone')) newErrors.phoneNumber = error;
        });
        setErrors(newErrors);
        alert('Please fix the form errors');
        setIsSubmitting(false);
        return;
      }

      // If payment method is Stripe, create checkout session
      if (paymentMethod === 'stripe') {
        try {
          const shippingWithState = {
            ...shippingData,
            state: shippingData.state || 'N/A'
          };

          // Handle package checkout
          if (isPackageCheckout && packageData) {
            await checkoutService.createPackageStripeCheckout(
              packageData._id,
              shippingWithState
            );
            return;
          } else {
            alert('Cart checkout not yet implemented for packages');
            setIsSubmitting(false);
          }
        } catch (error: unknown) {
          console.error('Stripe checkout error:', error);
          const errorMessage = error instanceof Error ? error.message : 'Failed to initialize payment. Please try again.';
          alert(errorMessage);
          setIsSubmitting(false);
        }
        return;
      }
    } catch (error) {
      console.error('Order creation error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="text-center lg:text-left">
        <h1 className="checkout-section-title text-2xl font-bold">
          {isPackageCheckout ? 'Package Subscription Checkout' : 'Checkout Form'}
        </h1>
        {isPackageCheckout && packageData && (
          <p className="text-gray-600 mt-2">Subscribing to: {packageData.name}</p>
        )}
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Email Section */}
        <div className="space-y-2">
          <label className="checkout-label block font-medium">
            Email
            {getCurrentUser() && (
              <span className="text-sm text-green-600 font-normal ml-2">
                <i className="fas fa-check-circle mr-1"></i>
                Auto-filled from your account
              </span>
            )}
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={shippingData.email}
            onChange={(e) => updateShippingData('email', e.target.value)}
            className={`checkout-input w-full px-4 py-3 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Delivery Section */}
        <div className="space-y-6">
          <h2 className="checkout-section-title text-xl font-bold">Contact Information</h2>

          {/* Country */}
          <div className="space-y-2">
            <label className="checkout-label block font-medium">Country</label>
            <div className="relative">
              <select
                value={shippingData.country}
                onChange={(e) => updateShippingData('country', e.target.value)}
                className={`checkout-input w-full px-4 py-3 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all duration-200 ${
                  errors.country ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                <option value="">Select your country</option>
                <option value="Pakistan">Pakistan</option>
                <option value="India">India</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
              <i className="fas fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="checkout-label block font-medium">
                First Name
                {getCurrentUser()?.firstName && (
                  <span className="text-sm text-green-600 font-normal ml-2">
                    <i className="fas fa-check-circle mr-1"></i>
                    Auto-filled
                  </span>
                )}
              </label>
              <input
                type="text"
                placeholder="First Name"
                value={shippingData.firstName}
                onChange={(e) => updateShippingData('firstName', e.target.value)}
                className={`checkout-input w-full px-4 py-3 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>
            <div className="space-y-2">
              <label className="checkout-label block font-medium">
                Last Name
                {getCurrentUser()?.lastName && (
                  <span className="text-sm text-green-600 font-normal ml-2">
                    <i className="fas fa-check-circle mr-1"></i>
                    Auto-filled
                  </span>
                )}
              </label>
              <input
                type="text"
                placeholder="Last Name"
                value={shippingData.lastName}
                onChange={(e) => updateShippingData('lastName', e.target.value)}
                className={`checkout-input w-full px-4 py-3 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="checkout-label block font-medium">Address</label>
            <input
              type="text"
              placeholder="Street address, apartment, suite, etc."
              value={shippingData.address}
              onChange={(e) => updateShippingData('address', e.target.value)}
              className={`checkout-input w-full px-4 py-3 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          {/* City and State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="checkout-label block font-medium">City</label>
              <input
                type="text"
                placeholder="City"
                value={shippingData.city}
                onChange={(e) => updateShippingData('city', e.target.value)}
                className={`checkout-input w-full px-4 py-3 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>
            <div className="space-y-2">
              <label className="checkout-label block font-medium">State/Province</label>
              <input
                type="text"
                placeholder="State/Province"
                value={shippingData.state}
                onChange={(e) => updateShippingData('state', e.target.value)}
                className="checkout-input w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Postal Code */}
          <div className="space-y-2">
            <label className="checkout-label block font-medium">Postal Code (optional)</label>
            <input
              type="text"
              placeholder="Postal Code"
              value={shippingData.postalCode}
              onChange={(e) => updateShippingData('postalCode', e.target.value)}
              className="checkout-input w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="checkout-label block font-medium">Phone Number</label>
            <input
              type="tel"
              placeholder="+92 987382 8967"
              value={shippingData.phoneNumber}
              onChange={(e) => updateShippingData('phoneNumber', e.target.value)}
              className={`checkout-input w-full px-4 py-3 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
          </div>
        </div>

        {/* Payment Section */}
        <div className="space-y-6">
          <h2 className="checkout-section-title text-xl font-bold">Payment</h2>

          <div className="space-y-4">
            <label className="checkout-label block font-medium">Payment Method</label>

            {/* Stripe Payment Option */}
            <label className="bg-gray-50 border border-gray-300 rounded-lg p-4 shadow-sm cursor-pointer block">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-3">
                    <input
                      type="radio"
                      name="payment_method"
                      value="stripe"
                      className="checkout-radio mt-1"
                      checked={paymentMethod === "stripe"}
                      onChange={() => setPaymentMethod("stripe")}
                    />
                    <div>
                      <p className="checkout-label font-medium">Pay with Credit/Debit Card (Stripe)</p>
                      <p className="checkout-input text-sm text-gray-600">Secure payment via Stripe Checkout</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-6 relative">
                      <Image src="/images/MasterCard.svg" alt="Mastercard" fill style={{ objectFit: "contain" }} />
                    </div>
                    <div className="w-8 h-3 relative">
                      <Image src="/images/Visa.svg" alt="Visa" fill style={{ objectFit: "contain" }} />
                    </div>
                  </div>
                </div>

                {/* Stripe Information */}
                {paymentMethod === "stripe" && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <i className="fas fa-info-circle mr-2"></i>
                      You will be securely redirected to Stripe to complete your payment.
                      Your card details are never stored on our servers.
                    </p>
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>

        {/* Pay Now Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="checkout-green-bg w-full mx-auto lg:mx-0 px-6 py-3 rounded-lg flex items-center justify-center space-x-2 text-black font-semibold hover:opacity-90 transition-opacity duration-200 bg-green-400 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Pay Now"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                <span className="font-semibold">Processing...</span>
              </>
            ) : (
              <>
                <span className="font-semibold">Pay Now</span>
                <i className="fas fa-arrow-right" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
