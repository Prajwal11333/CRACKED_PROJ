import React from 'react';
import { X, Download } from 'lucide-react';

interface QRCodeModalProps {
  url: string;
  onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ url, onClose }) => {
  // Generate QR code URL using the passed URL (original URL for direct access)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(url)}`;

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.download = `qr-code-${Date.now()}.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">QR Code</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

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
          
          <p className="text-gray-600 mb-4 break-all font-mono text-sm bg-gray-50 p-2 rounded-lg">
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



