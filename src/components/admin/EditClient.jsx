import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DeleteClient from "./DeleteClient";
import EditBalance from "./EditBalance";

const EditClient = () => {
  const { clientEmail, clientContact, clientAddress, clientName } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [msg, setMsg] = useState("");
  const [currentEmail, setCurrentEmail] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    setName(clientName);
    setEmail(clientEmail);
    setCurrentEmail(clientEmail);
    setContact(clientContact);
    setAddress(clientAddress);
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.put(
        `/api/clients/updateClient/${currentEmail}`,
        JSON.stringify({
          ClientName: name,
          ClientEmail: email,
          ClientContact: contact,
          ClientAddress: address,
        })
      );
      if (response?.statusText === "OK") {
        setMsg("Cliente actualizado correctamente");
      }
    } catch (error) {
      setMsg(error.message);
    }
  };
  return (
    <section className=" max-w-[600px] m-auto flex flex-col justify-center  gap-10 p-2">
      <form className="flex flex-col h-full *:border *:p-1">
        <h1 className="border-none text-center font-press-start text-3xl">
          Editar Cliente
        </h1>
        {msg ? (
          <h1 className="border text-center border-color1 p-1 my-2">{msg}</h1>
        ) : (
          ""
        )}
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Contact"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={handleSubmit} type="submit" className="bg-color1 ">
          Editar
        </button>
      </form>
      <DeleteClient email={currentEmail} setMsg={setMsg}></DeleteClient>
      <EditBalance email={currentEmail} setMsg={setMsg}></EditBalance>
    </section>
  );
};

export default EditClient;
