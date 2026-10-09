import { useAppStore } from './store/useAppStore';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LessonsContainer } from './components/lessons/LessonsContainer';
import { TrainerContainer } from './components/TrainerContainer';
import { DictionaryContainer } from './components/DictionaryContainer';
import { PatternBuilder } from './components/PatternBuilder';
import { NumbersContainer } from './components/numbers/NumbersContainer';
import { ReadingContainer } from './components/reading/ReadingContainer';
import { VideoResources } from './components/VideoResources';

function App() {
  const currentTab = useAppStore((s) => s.currentTab);

  return (
    <div className="max-w-md mx-auto min-h-[100dvh] flex flex-col bg-slate-50 text-slate-900 shadow-2xl relative select-none">
      <Header />

      <main className="flex-1 flex flex-col min-h-0 pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))]">
        {currentTab === 'lessons' && <LessonsContainer />}
        {currentTab === 'reading' && <ReadingContainer />}
        {currentTab === 'trainer' && <TrainerContainer />}
        {currentTab === 'numbers' && <NumbersContainer />}
        {currentTab === 'dictionary' && <DictionaryContainer />}
        {currentTab === 'patterns' && <PatternBuilder />}
        {currentTab === 'media' && <VideoResources />}
      </main>

      <BottomNav />
    </div>
  );
}

export default App;
