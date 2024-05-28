import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { jsPDF } from 'jspdf';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PdfEditor = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const handleFileChange = (event) => {
        setPdfFile(event.target.files[0]);
    };

    const handlePdfSave = () => {
        const doc = new jsPDF();
        // Add your PDF editing logic here
        doc.save('edited.pdf');
    };

    useEffect(() => {
        // Additional logic if needed when PDF is loaded
    }, [pdfFile]);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>PDF Editor</h1>
            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                style={styles.fileInput}
            />
            <div style={styles.viewer}>
                {pdfFile && (
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.7.570/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={URL.createObjectURL(pdfFile)} plugins={[defaultLayoutPluginInstance]} />
                    </Worker>
                )}
            </div>
            <button onClick={handlePdfSave} style={styles.button}>
                Save PDF
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: '2rem',
        color: '#333',
        marginBottom: 20,
    },
    fileInput: {
        marginBottom: 20,
    },
    viewer: {
        width: '80%',
        height: '70vh',
        border: '1px solid #ccc',
        marginBottom: 20,
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
    },
};

export default PdfEditor;
