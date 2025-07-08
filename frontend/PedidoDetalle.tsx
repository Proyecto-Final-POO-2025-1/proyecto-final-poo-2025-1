import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const estados = [
  "Cargando",
  "Alistamiento",
  "Salida de Planta",
  "Llegada a obra",
  "Inicio de descargue",
  "Finaliza de descargue",
  "Llegada a planta"
];

export default function PedidoDetalle() {
  const { id } = useParams<{ id: string }>();
  const [pedido, setPedido] = useState<any>(null);
  const [estado, setEstado] = useState("");

  useEffect(() => {
    async function fetchPedido() {
      const pedidoRef = doc(db, "pedidos", id!);
      const pedidoSnap = await getDoc(pedidoRef);
      if (pedidoSnap.exists()) {
        setPedido(pedidoSnap.data());
        setEstado(pedidoSnap.data().estado);
      }
    }
    fetchPedido();
  }, [id]);

  const cambiarEstado = async () => {
    const pedidoRef = doc(db, "pedidos", id!);
    await updateDoc(pedidoRef, { estado });
    alert("Estado actualizado");
  };

  if (!pedido) return <p>Cargando...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-2">Pedido: {id}</h2>
      <p><strong>Dirección:</strong> {pedido.direccion}</p>
      <p><strong>Estado actual:</strong> {pedido.estado}</p>
      <div className="mt-4">
        <label className="block mb-2">Cambiar estado:</label>
        <select
          className="border p-2 rounded"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        >
          {estados.map((est) => (
            <option key={est} value={est}>{est}</option>
          ))}
        </select>
        <button
          onClick={cambiarEstado}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
      </div>
    </div>
  );
}