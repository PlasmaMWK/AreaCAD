import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import cv from '@techstark/opencv-js';

interface ImageProcessorProps {
  file: File;
  scale: number;
  onProcessingComplete: (results: any) => void;
}

const ImageProcessor: React.FC<ImageProcessorProps> = ({ file, scale, onProcessingComplete }) => {
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processImage = async () => {
      const img = await createImageBitmap(file);
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (imageData) {
        const src = cv.matFromImageData(imageData);
        const gray = new cv.Mat();
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

        const thresh = new cv.Mat();
        cv.threshold(gray, thresh, 0, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU);

        const contours = new cv.MatVector();
        const hierarchy = new cv.Mat();
        cv.findContours(thresh, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

        const rooms = [];
        for (let i = 0; i < contours.size(); ++i) {
          const contour = contours.get(i);
          const area = cv.contourArea(contour);
          if (area > 1000) {
            const rect = cv.boundingRect(contour);
            const roomArea = rect.width * rect.height * (scale * scale);
            rooms.push({
              x: rect.x,
              y: rect.y,
              width: rect.width,
              height: rect.height,
              area: roomArea.toFixed(2)
            });
          }
          contour.delete();
        }

        src.delete(); gray.delete(); thresh.delete();
        contours.delete(); hierarchy.delete();

        onProcessingComplete({ rooms });
        setIsProcessing(false);
      }
    };

    cv.onRuntimeInitialized = processImage;
  }, [file, scale, onProcessingComplete]);

  if (isProcessing) {
    return (
      <div className="text-center py-8">
        <Loader2 className="animate-spin h-8 w-8 mx-auto text-blue-500" />
        <p className="mt-2 text-gray-600">Processing image...</p>
      </div>
    );
  }

  return null;
};

export default ImageProcessor;