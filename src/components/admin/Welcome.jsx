import useAuth from "../../hooks/useAuth";
import ASCIIVideo from "../ASCIIVideo";
const Welcome = () => {
  const { auth } = useAuth();
  console.log(auth);
  const date = new Date();
  const today = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);

  return (
    <section className="h-full p-4">
      <p>{today}</p>
      <h1>Bievenid@ {auth.role}</h1>
      <ASCIIVideo></ASCIIVideo>
    </section>
  );
};

export default Welcome;
