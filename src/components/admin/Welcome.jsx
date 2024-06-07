import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const Welcome = () => {
  const { auth } = useAuth();

  const date = new Date();
  const today = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  return (
    <section className="h-full">
      <p>{today}</p>
      <h1>Bievenid@ {auth?.email}</h1>
      <div className="flex gap-2">
        <button className="border bg-blue-600 rounded-md p-1">
          <Link to="clients">See Clients</Link>
        </button>
      </div>
    </section>
  );
};

export default Welcome;
