import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function ListaChequeo() {
  const [datos, setDatos] = useState({
    aceite: false,
    llantas: false,
    luces: false,
    frenos: false
  });

  const guardar = async () => {
    await addDoc(collection(db, "chequeos"), {
      ...datos,
      fecha: new Date()
    });
    alert("Lista de chequeo guardada");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Lista de Chequeo</h1>
      {Object.entries(datos).map(([clave, valor]) => (
        <div key={clave} className="mb-2">
          <label>
            <input
              type="checkbox"
              checked={valor}
              onChange={(e) =>
                setDatos((d) => ({ ...d, [clave]: e.target.checked }))
              }
            />{" "}
            {clave.charAt(0).toUpperCase() + clave.slice(1)}
          </label>
        </div>
      ))}
      <button
        onClick={guardar}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Guardar
      </button>
    </div>
  );
}