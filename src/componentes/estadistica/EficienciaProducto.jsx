import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell, Legend } from "recharts";
import useAlerta from "../../hooks/useAlerta";
import clienteAxios from "../../config/axios";

const EficienciaProducto = () => {

    const { mostrarAlerta } = useAlerta()

    // const location = useLocation();
    // const navigate = useNavigate()

    const [form, setForm] = useState({
        codProducto: '',
        galpon: ''
    })

    const [chartData, setChartData] = useState(false)
    const [chartDataGalpon, setChartDataGalpon] = useState(false)

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault()


        try {
            const { data } = await clienteAxios.get(`/estadistica/eficienciaProducto/${form.codProducto}/${form.galpon}`)
            setChartData(
                [{
                    name: "Fabricadas",
                    value: data.cantidadFabricados,
                }, {
                    name: "Observadas",
                    value: data.cantidadObservados,
                }]
            );
            setChartDataGalpon(
                [{
                    name: "Fabricadas",
                    value: data.eficienciagalpon.cantidadFabricados,
                }, {
                    name: "Observadas",
                    value: data.eficienciagalpon.cantidadObservados,
                }]
            );


        } catch (error) {
            mostrarAlerta("Producto no encontrado", "alerta-error")
            return
        }

    }
    return (
        <div className="contenedor-estadistica" >
            <form
                onSubmit={onSubmit}
            >
                <div className="campo-form1">
                    <label htmlFor="codProducto">Codigo de producto</label>
                    <input
                        type="text"
                        name="codProducto"
                        id="codProducto"
                        value={form.codProducto}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="campo-form1">
                    <label htmlFor="galpon">#N Galpon</label>
                    <select
                        name="galpon"
                        value={form.galpon}
                        onChange={onChange}
                        required
                    >
                        <option value="">--Selecciona--</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>

                    </select>
                </div>
                <div className="campo-form1">
                    <input
                        type="submit"
                        value="Consultar"
                        className="btn1 btn-primario btn-block"
                    />
                </div>
            </form>
            {chartData ?
                <>
                    <h1 style={{paddingTop: "30px"}}>Eficiencia General</h1>
                    <div style={{ width: '100%', height: 500}}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    dataKey="value"
                                    data={chartData}
                                    innerRadius={0}
                                    fill="#82ca9d"
                                    label
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </>
                : null}
            {chartDataGalpon ?
                <>
                    <h1 style={{paddingTop: "30px"}}>Eficiencia por Galpon {form.galpon}</h1>
                    <div style={{ width: '100%', height: 500 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    dataKey="value"
                                    data={chartDataGalpon}
                                    innerRadius={0}
                                    fill="#82ca9d"
                                    label
                                >
                                    {chartDataGalpon.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div></>
                : null}
        </div>
    )
}

const COLORS = ['#ce93d8', '#5c6bc0', '#b39ddb', '#4dd0e1', '#f48fb1', '#d500f9']
export default EficienciaProducto