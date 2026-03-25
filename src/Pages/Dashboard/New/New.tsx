import React from "react";
import Container from "../../../Components/Container";
import PainelHeader from "../../../Components/PainelHeader/PainelHeader";
import { FiUpload } from "react-icons/fi";

const New = () => {
  return (
    <Container>
      <PainelHeader />

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <button className="relative border-2 w-48 h-32 rounded-lg flex items-center justify-center border-gray-600 cursor-pointer hover:bg-gray-100 transition">
          <FiUpload size={30} color="#000" />

          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </button>
      </div>
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2"></div>
    </Container>
  );
};

export default New;
