import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/upload.module.css';
import Navbar from './components/navbar';

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false); 

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file first.');
            setIsSuccess(false);
            return;
        }

        const formData = new FormData();
        formData.append('files', file);

        try {
            const response = await axios.post('http://localhost:3000/raw-data/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Upload successful');
            setIsSuccess(true); 
        } catch (error) {
            setMessage('Upload failed: ' + error.response?.data?.message || error.message);
            setIsSuccess(false); 
        }
    };

    return (
        <div className={styles.container}>
            {/* navbar untuk navigasi halaman */}
            <Navbar /> 
            <h1 className={styles.heading}>Upload CSV File</h1>
            <input
                type="file"
                onChange={handleFileChange}
                className={styles.fileInput}
            />
            <button onClick={handleUpload} className={styles.uploadButton}>
                Upload
            </button>
            {message && (
                <p className={`${styles.message} ${isSuccess ? styles.success : styles.error}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default UploadPage;
