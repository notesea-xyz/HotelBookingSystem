export const calculatePrice = (basePrice, nights, options = {}) => {
  const {
    taxRate = 0.1,
    serviceFeeRate = 0.05,
    cleaningFee = 25,
    discount = 0,
  } = options

  const subtotal = basePrice * nights
  const taxes = subtotal * taxRate
  const serviceFee = subtotal * serviceFeeRate
  const total = subtotal + taxes + serviceFee + cleaningFee - discount

  return {
    basePrice,
    nights,
    subtotal,
    taxes,
    serviceFee,
    cleaningFee,
    discount,
    total: Math.round(total * 100) / 100,
  }
}

export const calculateRefund = (totalPrice, cancellationPolicy, daysBeforeCheckIn) => {
  let refundPercentage = 0

  switch (cancellationPolicy) {
    case 'flexible':
      refundPercentage = daysBeforeCheckIn >= 1 ? 100 : 0
      break
    case 'moderate':
      if (daysBeforeCheckIn >= 5) refundPercentage = 100
      else if (daysBeforeCheckIn >= 2) refundPercentage = 50
      else refundPercentage = 0
      break
    case 'strict':
      refundPercentage = daysBeforeCheckIn >= 14 ? 100 : 0
      break
    default:
      refundPercentage = 0
  }

  return (totalPrice * refundPercentage) / 100
}

export const applySeasonalPricing = (basePrice, checkInDate) => {
  const date = new Date(checkInDate)
  const month = date.getMonth()

  // Peak season (June-August, December)
  if ([5, 6, 7, 11].includes(month)) {
    return basePrice * 1.5
  }

  // Shoulder season (April, May, September, October)
  if ([3, 4, 8, 9].includes(month)) {
    return basePrice * 1.2
  }

  // Low season (January-March, November)
  return basePrice
}
