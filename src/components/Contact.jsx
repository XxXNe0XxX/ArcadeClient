import EmailContact from "./EmailContact";

const Contact = () => {
  return (
    <div className=" max-w-[1200px] m-auto ">
      <div className="text-center py-4">
        <h1 className="text-3xl text-color1 font-press-start">Contact Us</h1>
        <p className="text-lg text-color4 mt-4">
          We are here to help you. Contact us anytime.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-color2 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-color1 mb-4">Location</h2>
          <p className="text-color4">Arcade Street 123, City, FC 45678</p>
        </div>
        <div className="bg-color2 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-color1 mb-4">Phone</h2>
          <p className="text-color4">(123) 456-7890</p>
        </div>
        <div className="bg-color2 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-color1 mb-4">Email</h2>
          <p className="text-color4">info@arcadebusiness.com</p>
        </div>
        <div className="bg-color2 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-color1 mb-4">Service Hours</h2>
          <p className="text-color4">Monday - Friday: 10:00 AM - 10:00 PM</p>
          <p className="text-color4">Saturday - Sunday: 10:00 AM - 12:00 AM</p>
        </div>
      </div>
      <EmailContact></EmailContact>
    </div>
  );
};

export default Contact;
