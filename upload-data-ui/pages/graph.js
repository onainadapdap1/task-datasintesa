import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns'; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale);

const GraphPage = () => {
    const router = useRouter();
    const { enodebId, cellId, startDate, endDate } = router.query; 
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchGraphData = async () => {
        if (!enodebId || !cellId || !startDate || !endDate) return; 

        try {
            const response = await axios.get('http://localhost:3000/raw-data/graph', {
                params: {
                    enodebId,
                    cellId,
                    startDate,
                    endDate,
                },
            });
            setData(response.data);
        } catch (error) {
            setError('Failed to fetch graph data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGraphData();
    }, [enodebId, cellId, startDate, endDate]); 

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const chartData = {
        labels: data.map(item => new Date(item.resultTime)), 
        datasets: [
            {
                label: 'Availability',
                data: data.map(item => item.availability),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
                tension: 0.1,
            },
        ],
    };

    return (
        <div>
            <h1>Graph Result</h1>
            <Line data={chartData} options={{
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    },
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'hour', 
                        },
                        title: {
                            display: true,
                            text: 'Time',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Availability',
                        },
                        min: 0,
                        max: 150,
                    },
                },
            }} />
        </div>
    );
};

export default GraphPage;


