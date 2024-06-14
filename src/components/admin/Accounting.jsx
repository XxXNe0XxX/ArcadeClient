import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const Accounting = () => {
  const axiosPrivate = useAxiosPrivate();
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axiosPrivate.get("/api/accounting");
        if (response.statusText !== "OK") {
          throw new Error("Network response was not ok");
        }
        setStatistics(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const {
    totalRevenue,
    revenueByClient,
    monthlyRevenue,
    totalExpenses,
    expensesByClient,
    monthlyExpenses,
    netProfit,
    netProfitMargin,
    totalClients,
    averageRevenuePerUser,
    revenueGrowthRate,
    expenseGrowthRate,
  } = statistics;

  return (
    <>
      <h1>Estadisticas de contabilidad</h1>
      <div className="flex flex-wrap m-auto gap-2 ">
        <div className="border p-1">
          <h2>Ingresos</h2>
          <p>Ingreso total:</p>
          <ul>
            <li>CUP: ${totalRevenue.CUP}</li>
            <li>MLC: ${totalRevenue.MLC}</li>
            <li>USD: ${totalRevenue.USD}</li>
          </ul>
          <h3>Ingreso por cliente</h3>
          <ul>
            {Object.entries(revenueByClient).map(([clientId, revenue]) => (
              <li key={clientId}>
                Cliente {clientId}: CUP ${revenue.CUP}, MLC ${revenue.MLC}, USD
                ${revenue.USD}
              </li>
            ))}
          </ul>
          <h3>Ingreso mensual</h3>
          <ul>
            {Object.entries(monthlyRevenue).map(([month, revenue]) => (
              <li key={month}>
                {month}: CUP ${revenue.CUP}, MLC ${revenue.MLC}, USD $
                {revenue.USD}
              </li>
            ))}
          </ul>
        </div>
        <div className="border p-1">
          <h2>Gastos</h2>
          <p>Gastos totales</p>
          <ul>
            <li>CUP: ${totalExpenses.CUP}</li>
            <li>MLC: ${totalExpenses.MLC}</li>
            <li>USD: ${totalExpenses.USD}</li>
          </ul>
          <ul>
            {Object.entries(expensesByClient).map(([clientId, expenses]) => (
              <li key={clientId}>
                Cliente {clientId}: CUP ${expenses.CUP}, MLC ${expenses.MLC},
                USD ${expenses.USD}
              </li>
            ))}
          </ul>
          <h3>Gastos mensuales</h3>
          <ul>
            {Object.entries(monthlyExpenses).map(([month, expenses]) => (
              <li key={month}>
                {month}: CUP ${expenses.CUP}, MLC ${expenses.MLC}, USD $
                {expenses.USD}
              </li>
            ))}
          </ul>
        </div>
        <div className="border p-1">
          <h2>Ganancias</h2>
          <p>Ganancia neta:</p>
          <ul>
            <li>CUP: ${netProfit.CUP}</li>
            <li>MLC: ${netProfit.MLC}</li>
            <li>USD: ${netProfit.USD}</li>
          </ul>
          <p>Margen de ganancia neta:</p>
          <ul>
            <li>CUP: {netProfitMargin.CUP}%</li>
            <li>MLC: {netProfitMargin.MLC}%</li>
            <li>USD: {netProfitMargin.USD}%</li>
          </ul>
        </div>
        <div className="border p-1">
          <h2>Metricas de clientes</h2>
          <p>Total de clientes: {totalClients}</p>
          <p>Ingreso promedio por cliente</p>
          <ul>
            <li>CUP: ${averageRevenuePerUser.CUP}</li>
            <li>MLC: ${averageRevenuePerUser.MLC}</li>
            <li>USD: ${averageRevenuePerUser.USD}</li>
          </ul>
        </div>
        <div className="border p-1">
          <h2>Metricas de rendimiento</h2>
          <p>Tasa de crecimiento de ingresos: {revenueGrowthRate}%</p>
          <p>Tasa de crecimiento de gastos: {expenseGrowthRate}%</p>
        </div>
      </div>
    </>
  );
};

export default Accounting;
