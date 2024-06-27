import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import TotalCredits from "./WelcomePage/TotalCredits";
import ProfitMargin from "./WelcomePage/ProfitMargin";
import GrowthRate from "./WelcomePage/GrowthRate";
const WelcomeClient = () => {
  const [info, setInfo] = useState({});
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
    const fetchInfo = async () => {
      try {
        const response = await axiosPrivate.get("/api/client/info");
        response.status === 200 && setInfo(response.data);
      } catch (error) {}
    };
    const getMachines = async () => {
      try {
        const response = await axiosPrivate.get(`/api/client/machines`);
        setMachines(response.data.machines);
      } catch (error) {
        setMsg(error.response.message);
      }
    };

    fetchInfo();
    getMachines();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="  max-w-[1200px] m-auto min-h-screen w-full">
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
      <section className=" grid grid-cols-1 gap-10 ">
        <div className="md:flex flex-none ">
          <div className="flex flex-col items-center justify-center w-[50%]  m-auto">
            <h1>Balance</h1>
            <div className="flex m-auto flex-col h-[100px] w-[100px] justify-center items-center bg-color4 rounded-full border-color1 border-4">
              <img
                className="w-8 h-8"
                src="/src/assets/icons/cherries.png"
              ></img>
              <h1 className="text-xl text-color2">x{info?.Credit_balance}</h1>
            </div>
          </div>

          <div className=" m-auto w-full min-h-fit max-h-[400px] text-color4  p-2  rounded-md  ">
            Maquinas activas
            <ul className="flex flex-col gap-2 overflow-hidden">
              {machines ? (
                machines?.map((each) => {
                  return (
                    <li
                      className="relative overflow-hidden border  rounded-xl flex items-center justify-end"
                      key={each.MachineID}
                    >
                      <h1 className="absolute   text-sm backdrop-blur-sm text-right   text-color4 bottom-1 right-3 p-1 ">
                        {each.Game}
                      </h1>
                      <img
                        className="object-cover w-[85%] h-40 p-1 rounded-xl  "
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
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-10 *:w-full justify-start">
          <TotalCredits></TotalCredits>
          <ProfitMargin></ProfitMargin>
          <GrowthRate></GrowthRate>
        </div>
        <div className="p-2 flex flex-col justify-center items-center ">
          <h1>tienes alguna duda ?</h1>
          <p>Telefono : +22112211</p>
          <p>Correo : admin@gmail.com</p>
        </div>
      </section>
    </div>
  );
};

export default WelcomeClient;
