// calculateFinalRate.js
export function calculateTotalFinalRate(selectionRoomRate, rates) {
    return selectionRoomRate.reduce((total, item) => {
        const mainRoom = rates.find(
            (r) => r.uuid === item?.rateId || r.id === item?.rateId
        );

        if (!mainRoom || !mainRoom.occupancies?.length) return total;

        const perOccupancyRate = mainRoom.finalRate / mainRoom.occupancies.length;

        return total + perOccupancyRate;
    }, 0);
}
