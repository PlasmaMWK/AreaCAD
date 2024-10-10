import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, FileText, Ruler } from 'lucide-react';
import FileUploader from './components/FileUploader';
import ImageProcessor from './components/ImageProcessor';
import ScaleInput from './components/ScaleInput';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [scale, setScale] = useState<number>(0);
  const [results, setResults] = useState<any>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
    },
  });

  const handleScaleSubmit = (value: number) => {
    setScale(value);
  };

  const handleProcessing = (processedResults: any) => {
    setResults(processedResults);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">House Plan Analyzer</h1>
        
        {!file && (
          <FileUploader
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
          />
        )}

        {file && !scale && (
          <ScaleInput onSubmit={handleScaleSubmit} />
        )}

        {file && scale > 0 && !results && (
          <ImageProcessor file={file} scale={scale} onProcessingComplete={handleProcessing} />
        )}

        {results && (
          <ResultDisplay results={results} />
        )}
      </div>
    </div>
  );
}

export default App;