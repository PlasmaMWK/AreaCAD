import React from 'react';
import { Upload, Image as ImageIcon, FileText } from 'lucide-react';

interface FileUploaderProps {
  getRootProps: any;
  getInputProps: any;
  isDragActive: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ getRootProps, getInputProps, isDragActive }) => {
  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive
          ? "Drop the file here"
          : "Drag 'n' drop a house plan image or PDF, or click to select"}
      </p>
      <div className="mt-4 flex justify-center space-x-4">
        <div className="flex items-center">
          <ImageIcon className="h-6 w-6 text-gray-400 mr-2" />
          <span className="text-sm text-gray-500">Images</span>
        </div>
        <div className="flex items-center">
          <FileText className="h-6 w-6 text-gray-400 mr-2" />
          <span className="text-sm text-gray-500">PDF</span>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;