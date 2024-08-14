import frontpageImage from "../assets/img/frontpage.jpg";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10">
      <div className="relative w-full h-96 sm:h-[500px] md:h-[600px] lg:h-[700px]">
        <img
          src={frontpageImage}
          alt="Static Image"
          className="w-full h-full object-fill "
        />
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center mt-8">
        <div className="bg-white p-6 rounded-lg w-full max-w-md mb-4 sm:mb-0 sm:mr-4">
          <h2 className="text-2xl font-bold mb-2 text-pink-500">Info Box 1</h2>
          <p className="text-blue-900">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2 text-pink-500">Info Box 2</h2>
          <p className="text-blue-900">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
