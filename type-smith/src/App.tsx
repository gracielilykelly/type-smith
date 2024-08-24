import Intro from "./components/Intro";
import WordsmithWorkout from "./components/WordsmithWorkout";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-typewriterBg text-typewriterText">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4 text- font-typewriter mt-4">
          TypeSmith
        </h1>
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
