export const getPackageDetails = (item, simCards) => {
  const perDayPackage = item?.packageType === 'PER_DAY_PACKAGE';
  const totalPackage = item?.packageType === 'TOTAL_PACKAGE';
  const unLimited = item?.packageType === 'UNLIMITED_PACKAGE';

  const travellers = item?.passengers?.length;
  const pax = item?.passengers;
  const price = item?.dataSimAgentPrice;
  const amount =
    item?.eSimActivationCost !== undefined
      ? item.eSimActivationCost
      : price * (travellers || simCards);

  const totalAmount = item?.dataAmount * item?.dataValidity;
  const priceType = perDayPackage ? totalAmount : item?.dataAmount;
  const pricePer = (priceType / 1024).toFixed(2);
  const perDay = totalAmount > 1023 ? pricePer : priceType;
  const type =
    item?.dataAmount * item?.dataValidity > 1023 ? 'GB' : item?.dataUnit;

  // If `unLimit` is true, set `dataPack` to an empty string.
  const dataPack = unLimited ? '' : `${Number(perDay)?.toFixed(1)} ${type}`;

  const title = unLimited
    ? 'Unlimited Package'
    : totalPackage
    ? `${item?.dataAmount} ${item?.dataUnit}`
    : dataPack + ' Package';

  const limit = unLimited
    ? 'No Limit'
    : perDayPackage
    ? `${item?.dataAmount} ${item?.dataUnit} Per day use`
    : 'No daily limit';

  return {
    title,
    limit,
    price,
    amount,
    travellers,
    pax,
    perDayPackage,
    totalPackage,
    unLimited,
  };
};
