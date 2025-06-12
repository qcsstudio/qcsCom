'use client';

import React, { useState, useEffect, useContext } from 'react';
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
import { Dropdown } from 'primereact/dropdown';
import ReceiptList from './FeeReceptTableComponent';
import { cardcontext } from '@/context/scrollcardcontext';

const FeeReceptComponent = () => {
    const toast = useRef(null);
    const { showTable, setShowTable, prefillData, setPrefillData } = useContext(cardcontext);

    const [formData, setFormData] = useState({
        receiptNo: '',
        date: null,
        studentName: '',
        courseName: '',
        courseFee: null,
        feeReceived: null,
        dueFee: null,
        studentId: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [receiptLoading, setReceiptLoading] = useState(true);
    const [calculatingDue, setCalculatingDue] = useState(false);

    const courseOptions = [
        { label: 'Web Development', value: 'Web Development' },
        { label: 'Data Science', value: 'Data Science' },
        { label: 'Digital Marketing', value: 'Digital Marketing' },
        { label: 'Graphic Design', value: 'Graphic Design' },
        { label: 'Cyber Security', value: 'Cyber Security' }
    ];

    const generateStudentId = async () => {
        try {
            const res = await fetch('/api/fee-receipt/generateStudentId'); // 🔁 your new GET API
            const data = await res.json();
            console.log("data", data.studentId);
            return data.studentId || '';
        } catch (err) {
            console.error('Failed to fetch student ID:', err);
            return '';
        }
    };


    useEffect(() => {
        const initializeForm = async () => {
            const newReceiptNo = await fetchReceiptNumber();

            if (prefillData) {
                setFormData({
                    receiptNo: newReceiptNo,
                    studentId: prefillData.studentId || await generateStudentId(),
                    date: null, // Always reset
                    studentName: prefillData.studentName || '',
                    courseName: prefillData.courseName || '',
                    courseFee: prefillData.courseFee || null,
                    feeReceived: null, // Always empty
                    dueFee: null,       // Always empty
                });
            } else {
                setFormData({
                    receiptNo: newReceiptNo,
                    studentId: await generateStudentId(),
                    date: null,
                    studentName: '',
                    courseName: '',
                    courseFee: null,
                    feeReceived: null,
                    dueFee: null,
                });
            }
        };

        initializeForm();
    }, [prefillData]);

    const handleTextChange = (e, field, value = null) => {
        setFormData(prev => ({
            ...prev,
            [field]: value ?? e.target.value
        }));
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
                studentId: String(formData.studentId || ''), // 🆕 Include it
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

            await fetch('/api/fee-receipt/generateStudentId', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ studentId: formData.studentId }),
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
            resetForm(); 
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

    const handleCalculateDueFee = async () => {
        if (!formData.studentId || formData.feeReceived === null || formData.courseFee === null) return;

        try {
            setCalculatingDue(true);

            const res = await fetch('/api/fee-receipt/calculate-due', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentId: formData.studentId,
                    currentFeeReceived: formData.feeReceived,
                    courseFee: formData.courseFee,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setFormData((prev) => ({
                    ...prev,
                    dueFee: data.leftFee ?? 0,
                }));
                toast.current.show({
                    severity: 'success',
                    summary: 'Calculated',
                    detail: 'Due fee updated',
                    life: 2000,
                });
            } else {
                throw new Error(data.error || 'Unknown error');
            }
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: error.message,
                life: 3000,
            });
            console.error('Calculate due error:', error);
        } finally {
            setCalculatingDue(false);
            
        }
    };

    const resetForm = async () => {
        const newReceiptNo = await fetchReceiptNumber();
        const newStudentId = await generateStudentId();

        setFormData({
            receiptNo: newReceiptNo,
            studentId: newStudentId,
            date: null,
            studentName: '',
            courseName: '',
            courseFee: null,
            feeReceived: null,
            dueFee: null,
        });
        setFormErrors({});
    };

    return (
        <>


            <Toast ref={toast} />
            <div className='flex justify-end mx-3'>
                <button onClick={() => { setShowTable(true) }}
                    className="bg-blue-600! hover:bg-blue-700! hover:cursor-pointer text-white font-semibold py-2 px-6 rounded-2xl shadow-lg transition-all duration-300 ease-in-out">
                    See All Receipts
                </button>
            </div>

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
                                    <Dropdown
                                        id="courseName"
                                        value={formData.courseName}
                                        options={courseOptions}
                                        onChange={(e) => handleTextChange(e, 'courseName', e.value)}
                                        className="min-w-[220px]"
                                    />
                                    <label htmlFor="courseName">Course Name</label>
                                </FloatLabel>
                                {formErrors.courseName && (
                                    <small className="text-red-600 font-bold">{formErrors.courseName}</small>
                                )}
                            </div>

                            <div>
                                <FloatLabel>
                                    <InputText
                                        id="studentId"
                                        value={formData.studentId}
                                        disabled
                                        className="w-full bg-gray-100"
                                    />
                                    <label htmlFor="studentId">Student ID</label>
                                </FloatLabel>

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
                            <div className="md:col-span-3 text-right">
                                <Button
                                    label="Calculate Due Fee"
                                    icon="pi pi-calculator"
                                    onClick={handleCalculateDueFee}
                                    loading={calculatingDue}
                                    disabled={!formData.feeReceived}
                                    className="p-button-primary"
                                />
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