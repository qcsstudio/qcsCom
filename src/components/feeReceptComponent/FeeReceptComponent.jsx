'use client';

import React, { useState, useEffect } from 'react';
import { fillReceiptTemplate } from '@/utils/fillReceipt';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const FeeReceptComponent = () => {
    const toast = useRef(null);

    const [formData, setFormData] = useState({
        receiptNo: '',
        date: null,
        studentName: '',
        courseName: '',
        courseFee: null,
        feeReceived: null,
        dueFee: null,
    });

    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [receiptLoading, setReceiptLoading] = useState(true);

    const generateReceiptNo = () => {
        const now = new Date();
        const year = String(now.getFullYear()).slice(2);
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const randomSuffix = Math.random().toString(36).substring(2, 5).toUpperCase();
        return `RCT-${year}${month}${day}-${randomSuffix}`;
    };

    const resetForm = async () => {
        const newReceiptNo = await fetchReceiptNumber();
        setFormData({
            receiptNo: newReceiptNo,
            date: null,
            studentName: '',
            courseName: '',
            courseFee: null,
            feeReceived: null,
            dueFee: null,
        });
        setFormErrors({});
    };

    useEffect(() => {
        resetForm();
    }, []);

    useEffect(() => {
        const courseFeeNum = Number(formData.courseFee) || 0;
        const feeReceivedNum = Number(formData.feeReceived) || 0;
        const due = courseFeeNum - feeReceivedNum >= 0 ? courseFeeNum - feeReceivedNum : 0;
        if (due !== formData.dueFee) {
            setFormData(prev => ({ ...prev, dueFee: due }));
        }
    }, [formData.courseFee, formData.feeReceived]);

    const handleTextChange = (e, name) => {
        setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    };

    const handleNumberChange = (value, name) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (e) => {
        setFormData((prev) => ({ ...prev, date: e.value }));
    };

    const formatDate = (dateObj) => {
        if (!dateObj) return '';
        const dd = String(dateObj.getDate()).padStart(2, '0');
        const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
        const yyyy = dateObj.getFullYear();
        return `${dd}-${mm}-${yyyy}`;
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.date) errors.date = 'Date is required';
        if (!formData.studentName.trim()) errors.studentName = 'Student Name is required';
        if (!formData.courseName.trim()) errors.courseName = 'Course Name is required';
        if (formData.courseFee === null || formData.courseFee === undefined) errors.courseFee = 'Course Fee is required';
        if (formData.feeReceived === null || formData.feeReceived === undefined) errors.feeReceived = 'Fee Received is required';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleDownload = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);

            const response = await fetch('/templates/Fee_Recipt.pdf');
            const templateBuffer = await response.arrayBuffer();

            const formattedData = {
                receiptNo: String(formData.receiptNo || ''),
                date: formData.date ? formatDate(formData.date) : '',
                studentName: String(formData.studentName || ''),
                courseName: String(formData.courseName || ''),
                courseFee: String(formData.courseFee ?? ''),
                feeReceived: String(formData.feeReceived ?? ''),
                dueFee: String(formData.dueFee ?? ''),
            };

            const filledPdfBytes = await fillReceiptTemplate(templateBuffer, formattedData);

            const pdfBlob = new Blob([filledPdfBytes], { type: 'application/pdf' });
            const form = new FormData();
            form.append('pdf', pdfBlob);
            form.append('meta', JSON.stringify({
                ...formattedData,
                date: formData.date || new Date()
            }));

            await fetch('/api/fee-receipt', {
                method: 'POST',
                body: form,
            });

            const url = URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${formData.studentName || 'receipt'}.pdf`;
            a.click();

            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Fee receipt generated and downloaded',
                life: 3000,
            });

            // 🔥 Increment receipt number AFTER success
            await incrementReceiptNumber();

        } catch (err) {
            console.error('Error:', err);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to generate receipt',
                life: 3000,
            });
        } finally {
            setLoading(false);
            resetForm(); // fetch new (non-incrementing) number
        }
    };


const fetchReceiptNumber = async () => {
    try {
        setReceiptLoading(true); // start spinner
        const res = await fetch('/api/fee-receipt/generate-receipt-no');
        const data = await res.json();
        return data.receiptNo || '';
    } catch (err) {
        console.error('Failed to fetch receipt number:', err);
        return '';
    } finally {
        setReceiptLoading(false); // stop spinner
    }
};

    const incrementReceiptNumber = async () => {
        try {
            const res = await fetch('/api/fee-receipt/generate-receipt-no', {
                method: 'PUT',
            });
            const data = await res.json();
            return data.receiptNo || '';
        } catch (err) {
            console.error('Failed to increment receipt number:', err);
            return '';
        }
    };

    return (
        <>
            <Toast ref={toast} />

            <div className="max-w-5xl mx-auto py-10 px-6">
                <div className="bg-white shadow-2xl rounded-2xl p-10 space-y-10 border border-gray-200">
                    <h2 className="text-4xl font-bold text-center text-gray-800">🎓 Fee Receipt Generator</h2>

                    {/* Receipt Details */}
                    <div>
                        <h3 className="text-xl font-semibold mb-6 text-blue-800">📄 Receipt Details</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                        <FloatLabel>
    <div className="relative w-full">
        <InputText
            id="receiptNo"
            value={receiptLoading ? 'Generating Receipt No…' : formData.receiptNo}
            disabled
            className="w-full bg-gray-100 pr-10"
        />
        {receiptLoading && (
            <i className="pi pi-spin pi-spinner absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 text-sm" />
        )}
    </div>
    <label htmlFor="receiptNo">Receipt No</label>
</FloatLabel>

                            <div>
                                <FloatLabel>
                                    <Calendar
                                        inputId="date"
                                        value={formData.date}
                                        onChange={handleDateChange}
                                        dateFormat="dd-mm-yy"
                                        showIcon
                                        className="w-full"
                                    />
                                    <label htmlFor="date">Date</label>
                                </FloatLabel>
                                {formErrors.date && <small className="text-red-600! font-bold">{formErrors.date}</small>}
                            </div>
                        </div>
                    </div>

                    {/* Student Info */}
                    <div>
                        <h3 className="text-xl font-semibold mb-6 text-green-800">👨‍🎓 Student Information</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <FloatLabel>
                                    <InputText
                                        id="studentName"
                                        value={formData.studentName}
                                        onChange={(e) => handleTextChange(e, 'studentName')}
                                        className="w-full"
                                    />
                                    <label htmlFor="studentName">Student Name</label>
                                </FloatLabel>
                                {formErrors.studentName && <small className="text-red-600! font-bold">{formErrors.studentName}</small>}
                            </div>

                            <div>
                                <FloatLabel>
                                    <InputText
                                        id="courseName"
                                        value={formData.courseName}
                                        onChange={(e) => handleTextChange(e, 'courseName')}
                                        className="w-full"
                                    />
                                    <label htmlFor="courseName">Course Name</label>
                                </FloatLabel>
                                {formErrors.courseName && <small className="text-red-600! font-bold">{formErrors.courseName}</small>}
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div>
                        <h3 className="text-xl font-semibold mb-6 text-purple-800">💳 Payment Information</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <FloatLabel>
                                    <InputNumber
                                        id="courseFee"
                                        value={formData.courseFee}
                                        onValueChange={(e) => handleNumberChange(e.value, 'courseFee')}
                                        className="w-full"
                                        mode="decimal"
                                        min={0}
                                    />
                                    <label htmlFor="courseFee">Course Fee</label>
                                </FloatLabel>
                                {formErrors.courseFee && <small className="text-red-600! font-bold">{formErrors.courseFee}</small>}
                            </div>

                            <div>
                                <FloatLabel>
                                    <InputNumber
                                        id="feeReceived"
                                        value={formData.feeReceived}
                                        onValueChange={(e) => handleNumberChange(e.value, 'feeReceived')}
                                        className="w-full"
                                        mode="decimal"
                                        min={0}
                                    />
                                    <label htmlFor="feeReceived">Fee Received</label>
                                </FloatLabel>
                                {formErrors.feeReceived && <small className="text-red-600! font-bold">{formErrors.feeReceived}</small>}
                            </div>

                            <FloatLabel>
                                <InputNumber
                                    id="dueFee"
                                    value={formData.dueFee}
                                    disabled
                                    className="w-full bg-gray-100"
                                    mode="decimal"
                                    min={0}
                                />
                                <label htmlFor="dueFee">Due Fee</label>
                            </FloatLabel>
                        </div>
                    </div>

                    {/* Download Button */}
                    <div className="pt-6">
                        <Button
                            label="Download Fee Receipt"
                            icon="pi pi-download"
                            loading={loading}
                            className="w-full p-button-lg p-button-success"
                            onClick={handleDownload}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default FeeReceptComponent;
