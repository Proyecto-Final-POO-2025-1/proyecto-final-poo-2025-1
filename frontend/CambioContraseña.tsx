import { useState } from "react";
import { getAuth, updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function CambioContraseña() {
  const [nueva, setNueva] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const cambiar = async () => {
    const user = auth.currentUser;
    if (user && nueva.length >= 6) {
      await updatePassword(user, nueva);
      alert("Contraseña actualizada");
      navigate("/conductor");
    } else {
      alert("Contraseña muy corta");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Cambiar Contraseña</h1>
      <input
        type="password"
        value={nueva}
        onChange={(e) => setNueva(e.target.value)}
        placeholder="Nueva contraseña"
        className="border p-2 rounded w-full mb-4"
      />
      <button
        onClick={cambiar}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Guardar
      </button>
    </div>
  );
}