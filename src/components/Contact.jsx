import Button from "./Button";
import EmailContact from "./EmailContact";

const Contact = () => {
  return (
    <div className=" p-6">
      <div className="text-center py-4">
        <h1 className="text-3xl text-color1 font-press-start">Contactanos</h1>
        <p className="text-lg text-color4 mt-4">
          Estamos aqui para ayudarte. Contactanos en cualquier momento.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-color2 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-color1 mb-4">Ubicacion</h2>
          <p className="text-color4">Calle Arcade 123, Ciudad, FC 45678</p>
        </div>
        <div className="bg-color2 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-color1 mb-4">Telefono</h2>
          <p className="text-color4">(123) 456-7890</p>
        </div>
        <div className="bg-color2 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-color1 mb-4">
            Correo Electronico
          </h2>
          <p className="text-color4">info@arcadebusiness.com</p>
        </div>
        <div className="bg-color2 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-color1 mb-4">
            Horario de Atencion
          </h2>
          <p className="text-color4">Lunes - Viernes: 10:00 AM - 10:00 PM</p>
          <p className="text-color4">Sabado - Domingo: 10:00 AM - 12:00 AM</p>
        </div>
      </div>
      <EmailContact></EmailContact>
    </div>
  );
};

export default Contact;
