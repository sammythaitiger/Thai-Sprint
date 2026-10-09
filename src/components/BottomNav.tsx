import { GraduationCap, Keyboard, Layers, BookOpen, Puzzle, ExternalLink, Calculator } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { TabType } from '../types';

const tabs: { key: TabType; label: string; icon: typeof Layers }[] = [
  { key: 'lessons', label: 'Уроки', icon: GraduationCap },
  { key: 'reading', label: 'Чтение', icon: Keyboard },
  { key: 'trainer', label: 'Тренажёр', icon: Layers },
  { key: 'numbers', label: 'Числа', icon: Calculator },
  { key: 'dictionary', label: 'Словарь', icon: BookOpen },
  { key: 'patterns', label: 'Связки', icon: Puzzle },
  { key: 'media', label: 'Медиа', icon: ExternalLink },
];

export function BottomNav() {
  const currentTab = useAppStore((s) => s.currentTab);
  const setTab = useAppStore((s) => s.setTab);
  const language = useAppStore((s) => s.language);

  const tabLabels: Record<TabType, { ru: string; en: string }> = {
    lessons: { ru: 'Уроки', en: 'Lessons' },
    reading: { ru: 'Чтение', en: 'Reading' },
    trainer: { ru: 'Тренажёр', en: 'Trainer' },
    numbers: { ru: 'Числа', en: 'Numbers' },
    dictionary: { ru: 'Словарь', en: 'Dictionary' },
    patterns: { ru: 'Связки', en: 'Patterns' },
    media: { ru: 'Медиа', en: 'Media' },
  };

  const handleTabClick = (tab: TabType) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    setTab(tab);
  };

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 border-t border-slate-200 bg-white/90 backdrop-blur-md"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-stretch">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.key;
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-1.5 min-h-[48px] transition-colors duration-200 select-none touch-manipulation ${
                isActive
                  ? 'text-blue-600'
                  : 'text-slate-400 active:text-slate-600'
              }`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <Icon
                className="w-4.5 h-4.5 transition-colors duration-200"
                strokeWidth={isActive ? 2.4 : 1.8}
              />
              <span className={`text-[9px] tracking-tight leading-tight mt-0.5 whitespace-nowrap ${isActive ? 'font-semibold text-blue-600' : 'font-medium'}`}>
                {tabLabels[tab.key][language]}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
