import Header from "./components/Header";
import Intro from "./components/Intro";
import WordsmithWorkout from "./components/TypingChallenge";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-typewriterBg text-typewriterText">
      <Header />
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <img
            className="mb-4"
            src="typewriter.png"
            alt="Sketch of typewriter"
            width="160px"
          />
          <div className="max-w-xl mx-auto p-4 w-full">
          <Intro />
          </div>
        </div>
        <div className="max-w-xl mx-auto p-4 w-full">
          <WordsmithWorkout />
        </div>
      </div>
    </div>
  );
};

export default App;
