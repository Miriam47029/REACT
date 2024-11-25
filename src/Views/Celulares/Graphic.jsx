import { useEffect, useState } from 'react';
import { sendRequest } from '../../functions';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJs, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJs.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Graphic = () => {
  const [data, setData] = useState([]); // Cambié info por data para una nomenclatura más clara
  const [backgroundColors, setBackgroundColors] = useState([]); // Cambié colors por backgroundColors para mayor claridad
  const chartOptions = { responsive: true }; // Definí chartOptions como constante

  useEffect(() => {
    fetchData();
  }, []);

  const generateRandomColor = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  };

  const fetchData = async () => {
    try {
      const response = await sendRequest('GET', '', '/api/celularesbymarca', ''); // Ajusté la ruta a "celularesbymarca"
      if (response) {
        setData(response);
        const generatedColors = response.map(() => generateRandomColor());
        setBackgroundColors(generatedColors);
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const chartData = {
    labels: data.map((item) => item.marca),
    datasets: [
      {
        label: 'Celulares',
        data: data.map((item) => item.count),
        backgroundColor: backgroundColors,
      },
    ],
  };

  return (
    <div className='container-fluid'>
      <div className='row mt-5'>
        <div className='col-md-6 offset-md-3'>
          <Pie options={chartOptions} data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Graphic;
