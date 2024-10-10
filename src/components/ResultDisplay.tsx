import React from 'react';

interface Room {
  x: number;
  y: number;
  width: number;
  height: number;
  area: string;
}

interface ResultDisplayProps {
  results: {
    rooms: Room[];
  };
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ results }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Analysis Results</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Room</th>
              <th className="py-2 px-4 border-b">Area (m²)</th>
              <th className="py-2 px-4 border-b">Dimensions (m)</th>
            </tr>
          </thead>
          <tbody>
            {results.rooms.map((room, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="py-2 px-4 border-b">Room {index + 1}</td>
                <td className="py-2 px-4 border-b text-right">{room.area}</td>
                <td className="py-2 px-4 border-b text-right">
                  {(room.width * room.height).toFixed(2)} x {(room.height * room.height).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultDisplay;