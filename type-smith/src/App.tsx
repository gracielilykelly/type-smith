import Intro from "./components/Intro";
import WordsmithWorkout from "./components/WordsmithWorkout";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-typewriterBg text-typewriterText">
      <header className="bg-paper p-1 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-black font-typewriter mt-4 ml-6">
          TypeSmith<span className="blinking-cursor">|</span>
        </h1>
        <span className="text-gray-500 font-bold mr-6">
          <a href="https://github.com/gracielilykelly" className="hover:text-black" target="_blank">@gracielilykelly</a>
        </span>
      </header>

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <img
            className="mb-4"
            src="/public/typewriter.png"
            alt="Sketch of typewriter"
            width="160px"
          />
          <Intro />
        </div>
        <div className="max-w-xl mx-auto p-4 w-full">
          <WordsmithWorkout />
        </div>
      </div>
    </div>
  );
};

export default App;
