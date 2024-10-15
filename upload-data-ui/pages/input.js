import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/input.module.css';
import Navbar from './components/navbar';

const InputPage = () => {
    const router = useRouter();
    const [enodebId, setEnodebId] = useState('');
    const [cellId, setCellId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');

        // Check if all fields are filled
        if (!enodebId || !cellId || !startDate || !endDate) {
            setErrorMessage('All fields are required.');
            return;
        }

        // Check if endDate is before startDate
        if (new Date(endDate) < new Date(startDate)) {
            setErrorMessage('End date cannot be earlier than start date.');
            return;
        }

        // If validation passes, navigate to the graph page
        router.push({
            pathname: '/graph',
            query: { enodebId, cellId, startDate, endDate },
        });
    };

    return (
        <div className={styles.container}>
            <Navbar />
            <h1 className={styles.heading}>Show Graph</h1>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="enodebId" className={styles.label}>
                    eNodeb ID
                </label>
                <input
                    type="text"
                    id="enodebId"
                    placeholder="eNodebID"
                    value={enodebId}
                    onChange={(e) => setEnodebId(e.target.value)}
                    className={styles.inputField}
                />

                <label htmlFor="cellId" className={styles.label}>
                    Cell ID
                </label>
                <input
                    type="text"
                    id="cellId"
                    placeholder="CellID"
                    value={cellId}
                    onChange={(e) => setCellId(e.target.value)}
                    className={styles.inputField}
                />

                <label htmlFor="startDate" className={styles.label}>
                    Start Date
                </label>
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={styles.inputField}
                />

                <label htmlFor="endDate" className={styles.label}>
                    End Date
                </label>
                <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={styles.inputField}
                />

                <button type="submit" className={styles.submitButton}>
                    Show Graph
                </button>
            </form>

        </div>
    );
};

export default InputPage;
