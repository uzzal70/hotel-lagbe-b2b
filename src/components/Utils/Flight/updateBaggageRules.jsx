const addBaggage = [
  {
    passengerType: 'ADT',
    baggagRule: [{ Value: '46', Unit: 'kg' }],
  },
  {
    passengerType: 'CNN',
    baggagRule: [{ Value: '46', Unit: 'kg' }],
  },
  {
    passengerType: 'CHD',
    baggagRule: [{ Value: '46', Unit: 'kg' }],
  },
  {
    passengerType: 'INF',
    baggagRule: [{ Value: '46', Unit: 'kg' }],
  },
];

export const updateBaggageRules = (priceBreakdown) => {
  return priceBreakdown.map((item) => {
    const matchingBaggage = addBaggage.find(
      (b) => b.passengerType === item.passengerType
    );

    if (!matchingBaggage) return item;

    return {
      ...item,
      baggageRule: matchingBaggage.baggagRule, // directly replace
    };
  });
};
