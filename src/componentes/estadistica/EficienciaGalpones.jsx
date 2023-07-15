/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import { ResponsiveContainer, Tooltip, Legend, BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";
// import useAlerta from "../../hooks/useAlerta";
import clienteAxios from "../../config/axios";

const EficienciaGalpones = () => {

    // const { mostrarAlerta } = useAlerta()

    // const location = useLocation();
    // const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            console.log('requesting statistic data...')
            const { data } = await clienteAxios.get('estadistica/eficienciaGalpones')
            const transformedData = data.map((g) => ({
                ...g,
                galpon: `Galpon ${g.galpon}`,
              }));
            setChartData(transformedData)
        }
        fetchData();
    }, []);

    const [chartData, setChartData] = useState([])

    return (
        <>
            {chartData.length === 0 ? null :
                <div className="contenedor-estadistica" >
                    <div className='flex justify-center items-center' style={{ width: '100%', height: '25%', fontFamily: 'sans-serif',}}>
                        <ResponsiveContainer width="60%" aspect={2} >
                            <BarChart
                                data={chartData}
                                width={500}
                                height={300}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}
                            >
                                <CartesianGrid strokeDasharray="4 1 2" />
                                <XAxis dataKey="galpon"/>

                                <YAxis />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Bar dataKey="cantidadFabricados" fill="#6b48ff" />
                                <Bar dataKey="cantidadObservados" fill="#1ee3cf" />
                                   
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </div>
            }
        </>
    )
}
const CustomTooltip = ({ active, payload }) => {
    console.log(payload)
  if (active && payload && payload.length) {
    const fabricadas = payload[0].value
    const observadas = payload[1].value
    const eficiencia = (((fabricadas - observadas) / fabricadas)*100).toFixed(2);
    return (
      <div className="custom-tooltip">
        <p className="label">{`Fabricados: ${fabricadas}`}</p>
        <p className="label">{`Observados: ${observadas}`}</p>
        <p className="intro">{`Eficiencia: ${eficiencia}%`}</p>
      </div>
    );
  }

  return null;
};


export default EficienciaGalpones