import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const WelcomeClient = () => {
  const [machines, setMachines] = useState([]);
  const [balance, setBalance] = useState("");
  const [expenses, setExpenses] = useState("");
  const [profits, setProfits] = useState("");
  const [earnings, setEarnings] = useState("");
  const [msg, setMsg] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const email = localStorage.getItem("email");
  useEffect(() => {
    let isMounted = true;
    const fetchBalance = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/clients/balance/${email}`
        );
        setBalance(response.data.balance);
      } catch (error) {
        console.log(error);
        setMsg(error.response.message);
      }
    };
    const getMachines = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/clients/machines/${email}`
        );
        setMachines(response.data.machines);
      } catch (error) {
        console.log(error);
        setMsg(error.response.message);
      }
    };
    const getExpenses = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/clients/expenses/${email}`
        );
        setExpenses(response.data.totals);
      } catch (error) {
        setMsg(error.response.message);
      }
    };
    const getProfits = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/clients/profits/${email}`
        );

        setProfits(response.data.totals);
      } catch (error) {
        console.log(error);
        setMsg(error.response.message);
      }
    };

    fetchBalance();
    getMachines();
    getExpenses();
    getProfits();
    return () => {
      isMounted = false;
    };
  }, []);

  const calculateEarnings = () => {
    try {
      if (expenses && profits) {
        const result = {};
        for (const key in expenses) {
          if (expenses.hasOwnProperty(key) && profits.hasOwnProperty(key)) {
            result[key] = profits[key] - expenses[key];
          }
        }
        setEarnings(result);
      } else {
      }
    } catch (error) {
      console.log(error);
      setMsg(error.response.message);
    }
  };
  return (
    <div className="flex flex-col max-w-[1200px] m-auto h-full w-full">
      <div className="bg-color1 w-full text-center p-1">
        <h1 className="p-3 text-xl gap-2 inline items-center justify-center ">
          Bienvenid@
        </h1>
        <span className="text-color1  bg-color2 rounded-md p-1 px-2 m-1">
          {localStorage.getItem("email").charAt(0)}
        </span>
        <span className="text-md">
          {localStorage.getItem("email").slice(1)}
        </span>
      </div>
      <section className="flex p-2 ">
        <div
          className={` flex w-[30%] flex-col items-center justify-center m-4 rounded-full text-color2  border-4 border-color1 bg-color4 `}
        >
          <h1 className="flex flex-col text-sm items-center">
            Balance{" "}
            <img className="w-8 h-8" src="/src/assets/icons/cherries.png"></img>
          </h1>
          <h1>{balance}</h1>
        </div>
        <div className="flex flex-wrap justify-around gap-4 w-[70%] p-2 border-4 rounded-xl border-color1 ">
          <div>
            <h1>Gastos </h1>
            <ul className="text-sm flex flex-col">
              {Object.entries(expenses).map(([currency, amount]) => (
                <li key={currency}>
                  {currency}: {amount}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1>Ingresos </h1>
            <ul className="text-sm flex flex-col">
              {Object.entries(profits).map(([currency, amount]) => (
                <li key={currency}>
                  {currency}: {amount}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full">
            <h1 className="">Ganancias</h1>
            <ul className="text-sm  flex justify-between items-around  shadow-md bg-color4 rounded-md ">
              <li className="w-[25%] flex items-center justify-center">
                <button onClick={calculateEarnings}>
                  <img
                    className="w-24 h-18 p-2 object-cover "
                    src="/src/assets/icons/coin.png"
                  />
                </button>
              </li>
              {earnings ? (
                Object.entries(earnings).map(([currency, amount]) => (
                  <li
                    key={currency}
                    className="flex w-[25%] flex-col justify-center items-center text-color2"
                  >
                    <span>{currency}</span>
                    <span> {amount}</span>
                  </li>
                ))
              ) : (
                <h1 className="flex gap-1 items-center text-center justify-center text-color2 w-[75%]">
                  <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                  {"  "}
                  <span>Calcular Ganancias</span>
                </h1>
              )}
            </ul>
          </div>
        </div>
      </section>
      {msg}
      <div className=" max-w-[600px] min-h-[360px] m-2 text-color4 border-4 border-color1 p-2  rounded-xl overflow-y-scroll ">
        Maquinas activas
        <ul className="flex flex-col gap-2 overflow-hidden">
          {machines ? (
            machines?.map((each) => {
              return (
                <li
                  className="relative overflow-hidden border  rounded-xl flex items-center justify-end"
                  key={each.MachineID}
                >
                  <h1 className="absolute  text-sm backdrop-blur-sm text-right   text-color4 bottom-1 right-3 p-1 ">
                    {each.Game}
                  </h1>
                  <img
                    className="object-cover w-[85%] h-24 p-1 rounded-xl  "
                    src={`/src/assets/gamesArt/${each.Game}.jpg`}
                  ></img>{" "}
                  <img
                    className="w-[15%] object-cover h-full bg-color4 absolute left-0"
                    src="/src/assets/icons/arcade-cabinet.png"
                  />
                </li>
              );
            })
          ) : (
            <li>No hay informacion disponible</li>
          )}
        </ul>
      </div>
      <div className="p-2 flex flex-col justify-center items-center ">
        <h1>tienes alguna duda ?</h1>
        <p>Telefono : +22112211</p>
        <p>Correo : admin@gmail.com</p>
      </div>
    </div>
  );
};

export default WelcomeClient;
