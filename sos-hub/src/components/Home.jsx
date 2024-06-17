import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative w-full h-64">
        <img
          src="https://fastly.picsum.photos/id/45/4592/2576.jpg?hmac=Vc7_kMYufvy96FxocZ1Zx6DR1PNsNQXF4XUw1mZ2dlc"
          alt="Static Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-4 sm:mb-0 sm:mr-4">
          <h2 className="text-2xl font-bold mb-2 text-pink-500">Info Box 1</h2>
          <p className="text-bg-blue-900">
            Her er noe informasjon om info boksen 1.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2 text-pink-500">Info Box 2</h2>
          <p className="text-bg-blue-900">
            Her er noe informasjon om info boksen 2.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
