import React from "react";
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="">
      <div className="p-6 border mt-4 border-gray-600 mx-auto flex flex-row items-center justify-between bottom-0 max-md:flex-col">
        <div className="flex items-center justify-start">
          <a href="https://www.linkedin.com/in/mihirpanchal54/" className="mx-2"><FaLinkedin size={30}  /></a> 
        </div>
        <div className="flex items-center justify-center">
          <div className="mx-4 text-lg">Mediapipe Task Face Mesh Detection</div>
        </div>
        <div className="flex items-center justify-end">
          <a href="https://github.com/MihirRajeshPanchal" className="mx-2"><FaGithub size={30} /></a> 
        </div>
      </div>
    </div>
  );
};

export default Navbar;
