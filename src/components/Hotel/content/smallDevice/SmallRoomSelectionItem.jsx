/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { toggleRoomSelection } from '../../../../redux/slices/roomSelectionSlice';
import SmallRoomSelectionItemList from './SmallRoomSelectionItemList';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const SmallRoomSelectionItem = ({ roomData }) => {

    const dispatch = useDispatch();
    const { roomsNumber } = useParams();
    const { selectedRooms, activeRecommendationId, isSelectedMap } = useSelector((state) => state.roomSelection);


    const handleSelect = (room, index) => {
        if (selectedRooms.length === roomsNumber) {
            toast.warning(`You can select up to ${roomsNumber} rooms only.`);
        } else {
            dispatch(toggleRoomSelection({ room, originalIndex: index }));
        }
    };

    const isRoomSelected = (room, index) => {
        const key = `${room.stdRoomName}-${room.recommendationId}-${index}`;
        return !!isSelectedMap[key];
    }
    return (
        <>

            {roomData.map((room) => {
                const shouldDisplay =
                    !activeRecommendationId ||
                    room.recommendationId === activeRecommendationId;
                if (!shouldDisplay) return null;

                const isSelected = isRoomSelected(room, room?.uuid);

                return (
                    <>

                        <SmallRoomSelectionItemList item={room} isSelected={isSelected} onClick={() => handleSelect(room, room?.uuid)} />

                    </>
                );
            })}
        </>
    )
}

export default SmallRoomSelectionItem
