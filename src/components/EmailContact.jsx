import Form from "./Form";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useModal } from "../context/ModalProvider";

const EmailContact = () => {
  const axiosPrivate = useAxiosPrivate();
  const openModal = useModal();
  const sendEmail = async (formData) => {
    try {
      const response = await axiosPrivate.post(
        "/api/email/send-email",
        JSON.stringify({ formData }),
      );
      if (response.status === 200) {
        openModal({ message: "Email sent" });
      }
    } catch (error) {
      openModal({ message: error.message });
    }
  };
  const fields = [
    { id: "Name", name: "name", type: "input", placeholder: "Name" },
    { id: "Email", name: "email", type: "input", placeholder: "Email" },
    {
      id: "Message",
      name: "message",
      type: "textarea",
      placeholder: "Tell us what happened...",
    },
  ];
  return <Form onSubmit={sendEmail} title="Contact Us" fields={fields}></Form>;
};

export default EmailContact;
