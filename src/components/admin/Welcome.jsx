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
      <div className="flex gap-2"></div>
    </section>
  );
};

export default Welcome;
