const Form = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/consumers/createConsumer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ConsumerName: username,
            ConsumerEmail: email,
            ConsumerBalance: balance,
          }),
        }
      );
      if (response.status === 403) {
        throw new Error("Un usuario con ese correo ya existe");
      } else {
        response.status === 201 && setSuccess(true);
      }
    } catch (error) {
      setErrMsg(error);
    }
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [balance, setBalance] = useState(0);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setSuccess(false);
        setErrMsg("");
      }, 3000);
    };
  }, [success, errMsg]);
  return (
    <section className="flex flex-col gap-10">
      <h1 className="text-blue-500 p-1 text-center">Arcade System</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-1 border gap-2"
      >
        <h1>Nuevo Usuario</h1>
        <div className="flex flex-col">
          <label htmlFor="consumerName" className="w-full text-sm">
            Nombre de usuario
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            id="consumerName"
            type="text"
            placeholder="Nombre"
            required
            className="border rounded-md p-1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="consumerEmail" className="w-full text-sm">
            Correo
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="consumerEmail"
            type="email"
            placeholder="Correo"
            required
            className="border rounded-md p-1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="initialBalance">Crédito inicial</label>
          <input
            onChange={(e) => setBalance(e.target.value)}
            value={balance}
            id="initialBalance"
            type="number"
            placeholder="0"
            required
            className="border rounded-md p-1"
          />
        </div>
        <button className="border bg-blue-800 p-1  " type="submit">
          Crear
        </button>
      </form>
      {success && (
        <div className="text-green-500 bg-green-800 border rounded-md p-1">
          <h1>Usuario creado con éxito</h1>
        </div>
      )}
      {errMsg && (
        <div className="text-red-500 bg-red-800 border rounded-md p-1">
          <h1>Ha ocurrido un error</h1>
          <p> {`${errMsg}`} </p>
        </div>
      )}
      {/* <form
        className="flex flex-col items-center p-1 border gap-2"
      >
        <h1>Usuario existente</h1>
        <div className="flex flex-col">
          <label htmlFor="consumerName" className="w-full text-sm">
            Nombre de usuario
          </label>
          <input
            id="consumerName"
            type="text"
            placeholder="Nombre"
            required
            className="border rounded-md p-1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="consumerEmail" className="w-full text-sm">
            Correo
          </label>
          <input
            id="consumerEmail"
            type="email"
            placeholder="Correo"
            required
            className="border rounded-md p-1"
          />
        </div>
      </form> */}
    </section>
  );
};

export default Form;
