'use client';
import { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

export default function ReceiptForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    courseName: '',
    courseFee: '',
    feeReceived: '',
    receiptNo: '',
    date: new Date().toLocaleDateString('en-GB'), // Default to current date
  });

  // Calculate due fee automatically
  const dueFee = Math.max(
    0, 
    Number(formData.courseFee) - Number(formData.feeReceived)
  ).toString();

  const generatePdf = async () => {
    try {
      // Fetch PDF template from public directory
      const templatePath = '/templates/test.pdf';
      const response = await fetch(templatePath);
      const existingPdfBytes = await response.arrayBuffer();
      
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const page = pdfDoc.getPages()[0];
      
      // Use standard font instead of Helvetica
      const font = await pdfDoc.embedFont('Helvetica');

      // Adjusted coordinates based on template structure
      page.drawText(formData.receiptNo, { x: 130, y: 680, size: 10, font });
      page.drawText(formData.date, { x: 500, y: 680, size: 10, font });
      page.drawText(formData.studentName, { x: 180, y: 640, size: 10, font });
      page.drawText(formData.courseName, { x: 180, y: 610, size: 10, font });
      page.drawText(formData.courseFee, { x: 130, y: 580, size: 10, font });
      page.drawText(formData.feeReceived, { x: 300, y: 580, size: 10, font });
      page.drawText(dueFee, { x: 450, y: 580, size: 10, font });

      // Generate and download PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Receipt_${formData.receiptNo}.pdf`;
      link.click();
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Check console for details.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Fill Receipt Details</h2>
      
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block mb-1">Receipt No:</label>
          <input
            className="border p-2 w-full rounded"
            value={formData.receiptNo}
            onChange={(e) => setFormData({ ...formData, receiptNo: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block mb-1">Date:</label>
          <input
            type="date"
            className="border p-2 w-full rounded"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block mb-1">Student Name:</label>
          <input
            className="border p-2 w-full rounded"
            value={formData.studentName}
            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block mb-1">Course Name:</label>
          <input
            className="border p-2 w-full rounded"
            value={formData.courseName}
            onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block mb-1">Course Fee (₹):</label>
          <input
            type="number"
            className="border p-2 w-full rounded"
            value={formData.courseFee}
            onChange={(e) => setFormData({ ...formData, courseFee: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block mb-1">Fee Received (₹):</label>
          <input
            type="number"
            className="border p-2 w-full rounded"
            value={formData.feeReceived}
            onChange={(e) => setFormData({ ...formData, feeReceived: e.target.value })}
          />
        </div>
        
        <div className="bg-gray-100 p-3 rounded">
          <strong>Due Fee: ₹{dueFee}</strong>
        </div>
      </div>

      <button 
        onClick={generatePdf}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
      >
        Download PDF Receipt
      </button>
    </div>
  );
}