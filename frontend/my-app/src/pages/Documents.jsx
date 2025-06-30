import React, { useState, useEffect } from 'react';
import { Upload, FileText, Check, Clock, AlertCircle } from 'lucide-react';

const REQUIRED_DOCUMENTS = [
  'National ID',
  'Proof of Address',
  'Tax Compliance Certificate',
  'Signed Agreement',
];

export default function Documents() {
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [files, setFiles] = useState({}); // Track files per document index
  const [uploadingDocIndex, setUploadingDocIndex] = useState(null);
  const [draggedOver, setDraggedOver] = useState(null);
  const [isUploading, setIsUploading] = useState({}); // Track upload status per document
  const [justUploaded, setJustUploaded] = useState({}); // Track animation state

  useEffect(() => {
    // Using in-memory storage instead of localStorage for Claude environment
    const storedDocs = [];
    setUploadedDocs(storedDocs);
  }, []);

  const handleUpload = async (e, docName, index) => {
    e.preventDefault();
    const file = files[index];
    if (!file) {
      alert('Please select a file first');
      return;
    }

    // Set uploading state
    setIsUploading(prev => ({ ...prev, [index]: true }));

    const reader = new FileReader();
    reader.onloadend = () => {
      // Remove any existing document with the same name (for re-upload)
      const filteredDocs = uploadedDocs.filter(doc => doc.name !== docName);
      
      const newDoc = {
        id: Date.now(),
        name: docName,
        fileName: file.name,
        fileData: reader.result,
        uploadedAt: new Date().toISOString(),
      };
      
      const updatedDocs = [...filteredDocs, newDoc];
      setUploadedDocs(updatedDocs);
      
      // Clear states after successful upload
      setFiles(prev => {
        const newFiles = { ...prev };
        delete newFiles[index];
        return newFiles;
      });
      setUploadingDocIndex(null);
      setIsUploading(prev => ({ ...prev, [index]: false }));
      
      // Trigger success animation
      setJustUploaded(prev => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setJustUploaded(prev => ({ ...prev, [index]: false }));
      }, 2000);
    };
    
    reader.onerror = () => {
      alert('Error reading file. Please try again.');
      setIsUploading(prev => ({ ...prev, [index]: false }));
    };
    
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDraggedOver(index);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDraggedOver(null);
  };

  const handleReupload = (docName, index) => {
    setUploadingDocIndex(index);
    // Clear any existing file for this index
    setFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[index];
      return newFiles;
    });
  };

  const handleDrop = (e, docName, index) => {
    e.preventDefault();
    setDraggedOver(null);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFiles(prev => ({ ...prev, [index]: droppedFile }));
      setUploadingDocIndex(index);
    }
  };

  const handleFileSelect = (e, index) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFiles(prev => ({ ...prev, [index]: selectedFile }));
      setUploadingDocIndex(index);
    }
  };

  const isDocumentUploaded = (docName) => {
    return uploadedDocs.some(doc => doc.name === docName);
  };

  const getUploadedDoc = (docName) => {
    return uploadedDocs.find(doc => doc.name === docName);
  };

  const completedCount = REQUIRED_DOCUMENTS.filter(doc => isDocumentUploaded(doc)).length;
  const progressPercentage = (completedCount / REQUIRED_DOCUMENTS.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-semibold text-slate-900 mb-2">Document Management</h1>
              <p className="text-slate-600 text-lg">Upload and manage your required documentation</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{completedCount}/{REQUIRED_DOCUMENTS.length}</div>
              <div className="text-sm text-slate-500 uppercase tracking-wide">Completed</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Required Documents Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-medium text-slate-900 mb-8">Required Documents</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {REQUIRED_DOCUMENTS.map((doc, idx) => {
              const isUploaded = isDocumentUploaded(doc);
              const uploadedDoc = getUploadedDoc(doc);
              const isCurrentlyUploading = uploadingDocIndex === idx;
              const currentFile = files[idx];
              const isProcessing = isUploading[idx];
              const showSuccessAnimation = justUploaded[idx];
              
              return (
                <div
                  key={idx}
                  className={`relative bg-white rounded-lg border-2 transition-all duration-200 ${
                    draggedOver === idx 
                      ? 'border-blue-400 bg-blue-50' 
                      : isUploaded 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, doc, idx)}
                >
                  <div className="p-6">
                    {/* Document Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                          isUploaded ? 'bg-green-100' : 'bg-slate-100'
                        }`}>
                          {isUploaded ? (
                            <Check className="w-5 h-5 text-green-600" />
                          ) : (
                            <FileText className="w-5 h-5 text-slate-500" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-900">{doc}</h3>
                          {isUploaded && uploadedDoc && (
                            <p className="text-sm text-slate-500 mt-1">{uploadedDoc.fileName}</p>
                          )}
                        </div>
                      </div>
                      {isUploaded && (
                        <div className="flex items-center text-green-600 text-sm font-medium">
                          <Check className="w-4 h-4 mr-1" />
                          Complete
                        </div>
                      )}
                    </div>

                    {/* Upload Area */}
                    {(!isUploaded || isCurrentlyUploading) && (
                      <div className="space-y-4">
                        {!currentFile && !isProcessing && (
                          <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                            draggedOver === idx 
                              ? 'border-blue-400 bg-blue-50' 
                              : 'border-slate-300 hover:border-slate-400'
                          }`}>
                            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                            <div className="space-y-2">
                              <p className="text-slate-600">
                                <span className="font-medium">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-slate-500">PDF, JPG, PNG up to 10MB</p>
                            </div>
                            <input
                              type="file"
                              onChange={(e) => handleFileSelect(e, idx)}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              accept=".pdf,.jpg,.jpeg,.png"
                            />
                          </div>
                        )}

                        {currentFile && !isProcessing && (
                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 text-blue-600 mr-2" />
                              <span className="text-sm text-blue-700">Ready to upload: {currentFile.name}</span>
                            </div>
                            <button
                              onClick={(e) => handleUpload(e, doc, idx)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                            >
                              Upload
                            </button>
                          </div>
                        )}

                        {isProcessing && (
                          <div className="flex items-center justify-center p-6 bg-blue-50 rounded-lg">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                            <span className="text-sm text-blue-700">Uploading...</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Uploaded Document Info */}
                    {isUploaded && uploadedDoc && !isCurrentlyUploading && (
                      <div className="mt-4">
                        {showSuccessAnimation ? (
                          <div className="bg-green-50 rounded-lg p-6 text-center">
                            <div className="flex items-center justify-center mb-3">
                              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <Check className="w-8 h-8 text-green-600 animate-bounce" />
                              </div>
                            </div>
                            <h3 className="text-lg font-medium text-green-900 mb-1">Upload Successful!</h3>
                            <p className="text-sm text-green-700">{uploadedDoc.fileName} has been uploaded</p>
                          </div>
                        ) : (
                          <div className="bg-green-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="text-sm text-green-700">
                                <div className="font-medium">{uploadedDoc.fileName}</div>
                                <div>Uploaded on {new Date(uploadedDoc.uploadedAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}</div>
                              </div>
                              <a
                                href={uploadedDoc.fileData}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-700 font-medium text-sm underline"
                              >
                                View Document
                              </a>
                            </div>
                            <button
                              onClick={() => handleReupload(doc, idx)}
                              className="w-full mt-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors border border-slate-200"
                            >
                              Upload Again
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Uploaded Documents Summary */}
        {uploadedDocs.length > 0 && (
          <div>
            <h2 className="text-2xl font-medium text-slate-900 mb-6">Document Archive</h2>
            <div className="bg-white rounded-lg border border-slate-200">
              <div className="divide-y divide-slate-200">
                {uploadedDocs.map((doc, index) => (
                  <div key={doc.id} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-900">{doc.name}</h3>
                          <div className="flex items-center mt-1 space-x-4 text-sm text-slate-500">
                            <span>{doc.fileName}</span>
                            <span>•</span>
                            <span>Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <a
                        href={doc.fileData}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium text-sm rounded-md transition-colors"
                      >
                        View Document
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {uploadedDocs.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No documents uploaded</h3>
            <p className="text-slate-500">Start by uploading your required documents above.</p>
          </div>
        )}
      </div>
    </div>
  );
}