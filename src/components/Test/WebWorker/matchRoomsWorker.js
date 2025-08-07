// matchRoomsWorker.js
import { v4 as uuidv4 } from 'uuid';

self.onmessage = function (e) {
  const roomRateData = e.data;

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
          uuid: uuidv4(),
          hotelInfo,
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
          fare: {
            finalRate: rate.finalRate
              ? rate.finalRate / rate.occupancies.length
              : 0,
          },
          policy: {
            checkIn,
            checkOut,
          },
          currency: rate.currency || null,
          image: standardizedRooms?.[occupancy.stdRoomId]?.images || [],
        });
      }
    }
  }

  matchedRooms.sort((a, b) => a.fare.finalRate - b.fare.finalRate);

  self.postMessage({ matchedRooms });
};
