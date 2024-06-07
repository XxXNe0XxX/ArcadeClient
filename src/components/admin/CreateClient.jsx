import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import { useState } from "react";

const CreateClient = () => {
  const [name, setName] = useState("");
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const axiosPrivate = useAxiosPrivate();
  const create = async (e) => {
    e.preventDefault();
    const clientInfo = {
      ClientName: name,
      ClientEmail: email,
      ClientPassword: password,
      ClientContact: contact,
      ClientAddress: address,
    };
    try {
      const response = await axiosPrivate.post(
        "/api/clients/createClient",
        JSON.stringify(clientInfo)
      );
      response?.status === 201 && setSuccess("Client created");
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <form onSubmit={create} className="flex flex-col h-full *:border *:p-1">
      {error ? <p>{error}</p> ? success : <p>{success}</p> : ""}
      <h1 className="border-none">Create Client</h1>
      <input
        type="text"
        placeholder="Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="********"
        required
        value={password}
        onChange={(e) => setPasword(e.target.value)}
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
      <button type="submit" className="bg-blue-500">
        Create
      </button>
    </form>
  );
};

export default CreateClient;
