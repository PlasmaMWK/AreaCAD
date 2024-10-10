import React, { useState } from 'react';
import { Ruler } from 'lucide-react';

interface ScaleInputProps {
  onSubmit: (scale: number) => void;
}

const ScaleInput: React.FC<ScaleInputProps> = ({ onSubmit }) => {
  const [scaleValue, setScaleValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const scale = parseFloat(scaleValue);
    if (!isNaN(scale) && scale > 0) {
      onSubmit(scale);
    }
  };

  return (
    <div className="text-center">
      <Ruler className="mx-auto h-12 w-12 text-blue-500 mb-4" />
      <h2 className="text-xl font-semibold mb-4">Set the Scale</h2>
      <p className="mb-4 text-gray-600">
        Enter the scale of your house plan (e.g., 1 pixel = X meters)
      </p>
      <form onSubmit={handleSubmit} className="flex justify-center items-center space-x-2">
        <input
          type="number"
          value={scaleValue}
          onChange={(e) => setScaleValue(e.target.value)}
          placeholder="Enter scale"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          step="0.01"
          min="0"
          required
        />
        <span className="text-gray-600">meters/pixel</span>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Set Scale
        </button>
      </form>
    </div>
  );
};

export default ScaleInput;