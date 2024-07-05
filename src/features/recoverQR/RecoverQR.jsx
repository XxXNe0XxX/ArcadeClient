import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import { useState, useEffect } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
const RecoverQR = () => {
  const { id } = useParams();
  const [identifier, setIdentifier] = useState(id || "");
  const [qr, setQr] = useState("");
  const [balance, setBalance] = useState("");
  const [msg, setMsg] = useState("");
  const [showIdentifier, setShowIdentifier] = useState(false);

  const generateQR = async (e) => {
    e.preventDefault();

    function cleanAndFormatString(input) {
      // Remove all whitespace characters and convert to lowercase
      let cleanedString = input.replace(/\s+/g, "").toLowerCase();

      // Check the length of the string
      if (cleanedString.length !== 32 && cleanedString.length !== 36) {
        return setMsg("Identificador invalido");
      }

      // Remove hyphens if the string already has them
      if (cleanedString.length === 36) {
        cleanedString = cleanedString.replace(/-/g, "");
      }

      // Ensure the string is now 32 characters long
      if (cleanedString.length !== 32) {
        return setMsg("Identificador invalido");
      }

      // Add hyphens in the corresponding positions
      const formattedString = `${cleanedString.slice(
        0,
        8
      )}-${cleanedString.slice(8, 12)}-${cleanedString.slice(
        12,
        16
      )}-${cleanedString.slice(16, 20)}-${cleanedString.slice(20)}`;

      return formattedString;
    }

    if (cleanAndFormatString(identifier)) {
      try {
        const response = await axios.post("/api/qr/recover", {
          identifier: cleanAndFormatString(identifier),
        });
        if (response.status === 200) {
          setQr(response.data.qrCode);
          setBalance(response.data.balance);
          setMsg("");
        }
      } catch (error) {
        setMsg(error.message);
      }
    }
  };
  return (
    <form
      onSubmit={generateQR}
      className="bg-color2 max-w-[600px] mx-auto flex flex-col p-6"
    >
      <h1 className="font-press-start text-center p-2 text-3xl">
        Recupera tu QR
      </h1>
      <div className="w-full flex items-center justify-end ">
        <input
          className="p-2 w-full"
          id="identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          type={showIdentifier ? "text" : "password"}
          placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
        ></input>
        {showIdentifier ? (
          <FontAwesomeIcon
            icon={faEye}
            onClick={() => setShowIdentifier(!showIdentifier)}
            className=" w-12 h-12 scale-50  "
          />
        ) : (
          <FontAwesomeIcon
            icon={faEyeSlash}
            onClick={() => setShowIdentifier(!showIdentifier)}
            className=" w-12 h-12 scale-50  "
          />
        )}
      </div>
      <button type="submit" className=" bg-color1 p-2 border">
        Generar
      </button>
      <h1 className=" text-center border-color1 border my-4  w-full">{msg}</h1>
      <img
        className={`${
          qr ? "h-full" : "h-1"
        }  my-10 w-full max-h-[500px] object-contain transition-all`}
        src={qr}
        alt=""
      />
      <div className="flex items-center justify-between">
        <h1 className="">Balance disponible -{"  "}</h1>
        <div className="flex items-center gap-2">
          <span>-</span>
          <img className="h-8 w-8" src="/assets/icons/cherries.png"></img>
          <span className="text-2xl">x{balance}</span>
        </div>
      </div>
    </form>
  );
};

export default RecoverQR;
