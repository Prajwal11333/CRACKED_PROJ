import React from 'react';
import { X, Download } from 'lucide-react';

interface QRCodeModalProps {
  url: string;
  originalUrl: string;
  onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ url, originalUrl, onClose }) => {
  // Use the original URL for QR code so it redirects properly
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(originalUrl)}`;

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.download = `qr-code-${Date.now()}.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">QR Code</h3>

        <div className="text-center">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl mb-4">
            <img
              src={qrCodeUrl}
              alt="QR Code"
              className="mx-auto rounded-lg shadow-lg"
              width={256}
              height={256}
            />
          </div>
          
          <p className="text-blue-600 font-mono text-sm bg-blue-50 p-2 rounded-lg mb-4 break-all">
            {url}
          </p>

          <button
            onClick={downloadQRCode}
            className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02]"
          >
            <Download className="w-4 h-4" />
            <span>Download QR Code</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;




