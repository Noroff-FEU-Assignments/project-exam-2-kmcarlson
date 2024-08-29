import about from "../assets/img/about.jpg";

const About = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row items-center">
        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
          <img
            src={about}
            alt="About Us"
            className="w-full h-auto max-w-xs sm:max-w-sm rounded-lg "
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4 text-center text-pink-500">About Us</h1>
          <p className="text-gray-700 bg-white p-6 rounded-lg">
            Welcome to THE SOS-HUB, your go-to forum for sharing and discussing opinions on a wide range of topics.
            Our platform is designed to provide a space where everyone can voice their thoughts and engage in meaningful conversations about the world around us.
            <br />
            <br />
            At THE SOS-HUB, we believe that every story deserves to be told and every opinion counts. Whether you have a unique perspective on current events, a personal story that hasn't been heard, or simply want to share your views on various subjects, our community is here to listen and engage.
            Our mission is to create a vibrant, inclusive, and respectful environment where diverse voices can come together to explore ideas, challenge assumptions, and connect over shared experiences.
            <br />
            <br />
            The longer you explore our forum, the more untold stories and fresh insights you'll discover.
            Join us at THE SOS-HUB and become part of a community that values open dialogue and the power of storytelling. Share your opinions, read others' experiences, and contribute to a richer, more informed conversation about the world we live in.
            <br />
            <br />
            <h2>Welcome to THE SOS-HUB, where every story matters</h2>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
