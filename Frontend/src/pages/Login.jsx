import React from "react";
import logo from "./../assets/TLogo.png";

const Login = () => {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="flex flex-col gap-3 h-[50%] md:h-[60%] w-[80%] justify-center items-center shadow-2xl">
        <div className="h-">
          <img src={logo} alt="logo" className="h-40" />
        </div>
        <div className="text-center">
          <h1 className="text-gray-600">
            <span className="text-3xl font-bold text-black ">Welcome</span> <br /> Connect
            Walllet to Sahyogee to Continue.
          </h1>
        </div>
        <div className="text-center mt-10">
          <button className="bg-amber-600 rounded-md p-5 text-white font-bold ">Connect Wallet</button>
        </div>

       <div class="text-center mt-4 text-gray-600">
  <p class="text-sm mt-2 mb-4 p-2 ">Secure • Transparent • Impactful</p>
</div>

      </div>
    </section>
  );
};

export default Login;
