import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto"; // Ensure you have this import
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Table from "../Table";

const Accounting = () => {
  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/accounting?currency=${currency}`
        );
        setStatistics(response.data);
      } catch (error) {
        setError("Error al obtener los datos");
      }
    };

    fetchData();
  }, [axiosPrivate, currency]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!statistics) {
    return <div>Cargando...</div>;
  }

  const {
    totalRevenue,
    totalExpenses,
    monthlyRevenue,
    monthlyExpenses,
    netProfit,
    netProfitMargin,
    totalClients,
    averageRevenuePerUser,
    revenueGrowthRate,
    expenseGrowthRate,
    averageTransactionValue,
    topClients,
    monthlyNetProfit,
  } = statistics;

  const monthlyLabels = monthlyRevenue && Object.keys(monthlyRevenue).sort();

  const generateChartData = (data, label) => ({
    labels: monthlyLabels,
    datasets: [
      {
        label: `${label} (${currency})`,
        data: monthlyLabels?.map((month) =>
          data[month]?.[currency]?.toFixed(2)
        ),
        borderColor: "rgba(54,162,235,1)",
        backgroundColor: "rgba(54,162,235,0.2)",
      },
    ],
  });

  const netProfitData = generateChartData(
    monthlyNetProfit,
    "Ganancia Neta Mensual"
  );

  const topClientsData = {
    labels: topClients?.map((client) => client.clientID),
    datasets: [
      {
        label: `Ingresos (${currency})`,
        data: topClients?.map((client) => client.revenue[currency]?.toFixed(2)),
        backgroundColor: "rgba(54,162,235,0.6)",
      },
    ],
  };

  const summaryData = [
    {
      label: `Ingresos Totales (${currency})`,
      value: totalRevenue?.[currency]?.toFixed(2),
    },
    {
      label: `Gastos Totales (${currency})`,
      value: totalExpenses?.[currency]?.toFixed(2),
    },
    {
      label: `Ganancia Neta (${currency})`,
      value: netProfit?.[currency]?.toFixed(2),
    },
    {
      label: `Margen de Ganancia Neta (${currency})`,
      value: `${netProfitMargin?.[currency]?.toFixed(2)}%`,
    },
    {
      label: "Total de Clientes",
      value: totalClients,
    },
    {
      label: `Ingreso Promedio por Usuario (${currency})`,
      value: averageRevenuePerUser?.[currency]?.toFixed(2),
    },
    {
      label: `Tasa de Crecimiento de Ingresos (${currency})`,
      value: `${revenueGrowthRate?.[currency]?.toFixed(2)}%`,
    },
    {
      label: `Tasa de Crecimiento de Gastos (${currency})`,
      value: `${expenseGrowthRate?.[currency]?.toFixed(2)}%`,
    },
    {
      label: `Valor Promedio de Transacción (ADD) (${currency})`,
      value: averageTransactionValue.ADD[currency]?.toFixed(2),
    },
    {
      label: `Valor Promedio de Transacción (SUBTRACT) (${currency})`,
      value: averageTransactionValue.SUBTRACT[currency]?.toFixed(2),
    },
    {
      label: `Valor Promedio de Transacción (EXPENSE) (${currency})`,
      value: averageTransactionValue.EXPENSE[currency]?.toFixed(2),
    },
  ];

  return (
    <div className="flex-col items-center ">
      <div className="w-full flex flex-wrap sm:justify-between justify-center items-center p-1 gap-2">
        <h1 className="text-xl">Contabilidad y finanzas</h1>
        <div className="flex items-center gap-2">
          <h1>Selecciona la moneda: </h1>
          <select
            onChange={(e) => setCurrency(e.target.value)}
            className="p-1 border rounded-md"
          >
            <option value="USD">USD</option>
            <option value="MLC">MLC</option>
            <option value="CUP">CUP</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2 p-2">
        <div className="max-w-[800px] w-full bg-color4 text-color1 border border-color1 p-2 rounded-md">
          <h2>Ingresos Mensuales</h2>
          <Line
            data={generateChartData(monthlyRevenue, "Ingresos Mensuales")}
          />
        </div>
        <div className="max-w-[800px] w-full bg-color4 text-color1 border border-color1 p-2 rounded-md">
          <h2>Gastos Mensuales</h2>
          <Line data={generateChartData(monthlyExpenses, "Gastos Mensuales")} />
        </div>
        <div className="max-w-[800px] w-full bg-color4 text-color1 border border-color1 p-2 rounded-md">
          <h2>Ganancia Neta Mensual</h2>
          <Line data={netProfitData} />
        </div>
        <div className="max-w-[800px] w-full bg-color4 text-color1 border border-color1 p-2 rounded-md">
          <h2>Principales Clientes por Ingresos</h2>
          <Bar data={topClientsData} />
        </div>
      </div>
      <div className=" max-w-[800px] m-auto">
        <h2 className="text-color1 text-xl p-2 bg-color2">Resumen</h2>
        <Table data={summaryData} title="Resumen de Estadísticas" />
      </div>
    </div>
  );
};

export default Accounting;
