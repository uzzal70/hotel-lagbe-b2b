import { useEffect, useState } from 'react';
// import { createWorker } from '../utils/createWorker';
import workerUrl from '../workers/matchRoomsWorker.js?worker';
import { createWorker } from './createWorker';

export default function MianWorkar({ roomRateData }) {
  const [matchedRooms, setMatchedRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!roomRateData) return;

    setLoading(true);
    const worker = createWorker(workerUrl);
    worker.postMessage(roomRateData);

    worker.onmessage = (e) => {
      setMatchedRooms(e.data.matchedRooms);
      setLoading(false);
      worker.terminate(); // Clean up
    };

    worker.onerror = (err) => {
      console.error('Worker error:', err);
      setLoading(false);
      worker.terminate();
    };

    return () => {
      worker.terminate(); // Clean up on unmount
    };
  }, [roomRateData]);

  return (
    <div>
      {loading ? (
        <p>Processing rooms...</p>
      ) : (
        matchedRooms.map((room) => (
          <div key={room.uuid}>
            {room.roomName} - ${room.fare.finalRate}
          </div>
        ))
      )}
    </div>
  );
}
