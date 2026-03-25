import { signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Services/firebase";

const PainelHeader = () => {
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full flex items-center bg-red-500 h-10 rounded-lg text-white font-medium px-4 gap-4 mb-4">
      <Link to="/dashboard">Dashboard</Link>

      <Link to="/dashboard/new">Cadastrar Carro</Link>

      <button className="ml-auto cursor-pointer" onClick={handleLogout}>
        Sair da conta
      </button>
    </div>
  );
};

export default PainelHeader;
