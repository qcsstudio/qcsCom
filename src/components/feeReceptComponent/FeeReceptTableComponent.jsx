'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { FilterMatchMode } from 'primereact/api';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const ReceiptList = () => {
    const toast = useRef(null);
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    useEffect(() => {
        const fetchReceipts = async () => {
            try {
                const res = await fetch('/api/fee-receipt');
                const data = await res.json();
                setReceipts(data);
            } catch (err) {
                console.error('Failed to fetch receipts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReceipts();
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const downloadPDF = async (fileId, studentName) => {
        try {
            const res = await fetch(`/api/fee-receipt/pdf/${fileId}`);
            if (!res.ok) throw new Error(`Failed to download: ${res.statusText}`);
    
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${studentName.replace(/[^a-z0-9]/gi, '_') || 'receipt'}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
    
            toast.current.show({
                severity: 'success',
                summary: 'Download Successful',
                detail: `Receipt for ${studentName} downloaded`,
                life: 3000,
            });
        } catch (err) {
            console.error('Download error:', err);
            toast.current.show({
                severity: 'error',
                summary: 'Download Failed',
                detail: 'Unable to download receipt. Please try again.',
                life: 3000,
            });
        }
    };
    
    const actionBodyTemplate = (rowData) => (
        <Button
            icon="pi pi-download"
            className="p-button-sm p-button-outlined p-button-success"
            onClick={() => downloadPDF(rowData.file, rowData.studentName)}
        />
    );

    const header = (
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">📋 Fee Receipts</h2>
            <span className="p-input-icon-left">
                <i className="pi pi-search pl-1! " />
                <InputText
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Search receipts..."
                    className='pl-6!'
                />
            </span>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <Toast ref={toast} />
            {loading ? (
                <ProgressSpinner />
            ) : (
                <DataTable
                    value={receipts}
                    paginator
                    rows={10}
                    dataKey="_id"
                    emptyMessage="No receipts found."
                    filters={filters}
                    globalFilterFields={['receiptNo', 'studentName', 'courseName', 'courseFee', 'feeReceived', 'dueFee', 'date']}
                    header={header}
                    filterDisplay="row"
                >
                    <Column field="receiptNo" header="Receipt No" sortable />
                    <Column field="studentName" header="Student Name" sortable />
                    <Column field="courseName" header="Course Name" sortable />
                    <Column field="courseFee" header="Course Fee" sortable />
                    <Column field="feeReceived" header="Received" sortable />
                    <Column field="dueFee" header="Due" sortable />
                    <Column
                        field="date"
                        header="Date"
                        body={(rowData) => new Date(rowData.date).toLocaleDateString()}
                        sortable
                    />
                    <Column body={actionBodyTemplate} header="Download" style={{ textAlign: 'center', width: '8rem' }} />
                </DataTable>
            )}
        </div>
    );
};

export default ReceiptList;
