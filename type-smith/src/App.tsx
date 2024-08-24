import './App.css'
import Intro from './components/Intro'
import WordsmithWorkout from './components/WordsmithWorkout'

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-typewriterBg text-typewriterText flex items-center justify-center"
    >
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-5xl font-bold mb-6 text-center font-typewriter">TypeSmith</h1>
        <Intro />
        <WordsmithWorkout />
      </div>
    </div>
  )
}

export default App;
