export const calculateTotalPrice = (basePrice, nights, extras = {}) => {
  let total = basePrice * nights
  
  // Add taxes
  if (extras.taxRate) {
    total += total * extras.taxRate
  }
  
  // Add service fees
  if (extras.serviceFee) {
    total += extras.serviceFee
  }
  
  // Add cleaning fee
  if (extras.cleaningFee) {
    total += extras.cleaningFee
  }
  
  // Apply discount
  if (extras.discount) {
    total -= extras.discount
  }
  
  return total
}

export const calculatePriceBreakdown = (basePrice, nights, options = {}) => {
  const subtotal = basePrice * nights
  const taxRate = options.taxRate || 0.10 // 10% default tax
  const serviceFee = options.serviceFee || subtotal * 0.05 // 5% service fee
  const cleaningFee = options.cleaningFee || 25
  const discount = options.discount || 0
  
  const taxes = subtotal * taxRate
  const total = subtotal + taxes + serviceFee + cleaningFee - discount
  
  return {
    basePrice,
    nights,
    subtotal,
    taxes,
    serviceFee,
    cleaningFee,
    discount,
    total,
  }
}

export const calculateRefundAmount = (totalPrice, cancellationPolicy, daysBeforeCheckIn) => {
  switch (cancellationPolicy) {
    case 'flexible':
      return daysBeforeCheckIn >= 1 ? totalPrice : 0
    case 'moderate':
      return daysBeforeCheckIn >= 5 ? totalPrice : totalPrice * 0.5
    case 'strict':
      return daysBeforeCheckIn >= 14 ? totalPrice : 0
    default:
      return 0
  }
}

export const applyDiscountCode = (price, discountCode) => {
  // This would typically call an API to validate the discount code
  // For now, returning mock values
  const discounts = {
    'SAVE10': { type: 'percentage', value: 10 },
    'SAVE50': { type: 'fixed', value: 50 },
    'WELCOME': { type: 'percentage', value: 15 },
  }
  
  const discount = discounts[discountCode]
  if (!discount) return { discountedPrice: price, discount: 0 }
  
  const discountAmount = discount.type === 'percentage' 
    ? price * (discount.value / 100)
    : discount.value
  
  return {
    discountedPrice: price - discountAmount,
    discount: discountAmount,
    discountType: discount.type,
    discountValue: discount.value,
  }
}
