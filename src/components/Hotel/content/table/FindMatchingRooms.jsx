import { v4 as uuidv4 } from 'uuid';
const breakfastTypes = ['BedAndBreakfast', 'HalfBoard', 'FullBoard'];
export default function FindMatchingRooms(roomRateData) {
  const checkIn = roomRateData?.checkinInfo?.beginTime;
  const checkOut = roomRateData?.checkoutInfo?.time;
  const roomRate = roomRateData?.roomRate?.[0] || {};
  const hotelInfo = roomRateData?.hotelInfo || {};
  const recommendations = roomRate.recommendations || {};
  const standardizedRooms = roomRate.standardizedRooms || {};
  const allRooms = roomRate.rooms || {};
  const ratesMap = roomRate.rates || {};
  const matchedRooms = [];

  for (const [recId, recommendation] of Object.entries(recommendations)) {
    for (const rateId of recommendation.rates || []) {
      const rate = ratesMap[rateId];
      if (!rate?.occupancies?.length) continue;

      for (const occupancy of rate.occupancies) {
        const matchedRoom = allRooms[occupancy.roomId];
        if (!matchedRoom) continue;

        matchedRooms.push({
          uuid: uuidv4(), // Consider skipping if not needed immediately
          hotelInfo,
          occupanciesrates: `rates:${recommendation.rates.length}, occupancies: ${rate.occupancies.length}`,
          rateType: `${recommendation.rates.length}`,
          rates: recommendation.rates.length,
          occupancies: rate.occupancies.length,
          recommendationId: recId,
          groupId: recommendation.groupId,
          roomId: matchedRoom.id,
          rateId: rate.id,
          stdRoomId: occupancy.stdRoomId || null,
          roomName: matchedRoom.name,
          stdRoomName: matchedRoom.stdRoomName,
          numberOfAdults: occupancy.numOfAdults || 0,
          numberOfChilds: occupancy.numOfChildren || 0,
          childAges: occupancy.childAges || [],
          IsPassportMandatory: rate?.IsPassportMandatory,
          IsPANMandatory: rate?.IsPANMandatory,
          fare: {
            baseRate: rate.baseRate || 0,
            finalRate: rate.finalRate
              ? rate.finalRate / rate.occupancies.length
              : 0,
            finalRateall: rate.finalRate || 0,
            finalRateInRoe: rate.finalRateInRoe,
            sellRate: rate.sellRate || 0,
            taxAmount: rate.taxAmount || 0,
            salesTax: rate.salesTax || 0,
            finalRateWithDefaultAgentMarkup:
              rate.finalRateWithDefaultAgentMarkup || 0,
            totalDefaultMarkup: rate.totalDefaultMarkup || 0,
            affiliateDiscount: rate.affiliateDiscount || 0,
          },
          policy: {
            refundable: rate.refundable || false,
            refundability: rate.refundability || 'NonRefundable',
            allGuestsInfoRequired: rate.allGuestsInfoRequired || false,
            onlineCancellable: rate.onlineCancellable || false,
            specialRequestSupported: rate.specialRequestSupported || false,
            payAtHotel: rate.payAtHotel || false,
            cardRequired: rate.cardRequired || false,
            cancellationPolicies: rate.cancellationPolicies || [],
            offers: rate.offers || [],
            boardBasis: rate.boardBasis || [],
            includes: rate.includes || [],
            policies: rate.policies || [],
            checkIn,
            checkOut,
          },
          currency: rate.currency || null,
          roomDetails: matchedRoom,
          image: standardizedRooms?.[occupancy.stdRoomId]?.images || [],
          refundable: rate.refundable || false,
          // hasBreakfast: Array.isArray(rate?.includes)
          //   ? rate.includes?.some((inc) =>
          //       inc?.toLowerCase()?.includes('breakfast')
          //     )
          //   : false,
          hasBreakfast:
            breakfastTypes.includes(rate?.boardBasis?.type) || false,
          estimatedValue:
            rate?.cancellationPolicies?.[0]?.rules?.[0]?.estimatedValue,
          freeCancelation:
            rate?.cancellationPolicies?.[0]?.rules?.[0]?.estimatedValue != null
              ? rate.cancellationPolicies[0].rules[0].estimatedValue <= 0
              : false,
        });
      }
    }
  }

  matchedRooms.sort((a, b) => a.fare.finalRate - b.fare.finalRate);
  return { matchedRooms };
}
