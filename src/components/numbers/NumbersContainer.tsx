import { useState } from 'react';
import { Calculator, Zap, Eye, GraduationCap, BookOpen } from 'lucide-react';
import { NumberDecomposer } from './NumberDecomposer';
import { NumberTrainer } from './NumberTrainer';
import { ThaiDigitsGuide } from './ThaiDigitsGuide';
import { SchoolNumbersGuide } from './SchoolNumbersGuide';
import { NumbersTheoryGuide } from './NumbersTheoryGuide';
import { useTranslation, TranslationKey } from '../../i18n/translations';

type NumbersTab = 'theory' | 'decomposer' | 'trainer' | 'digits' | 'school';

interface TabItem {
  id: NumbersTab;
  labelKey: TranslationKey;
  icon: typeof Calculator;
}

const TABS: TabItem[] = [
  { id: 'theory', labelKey: 'numbersTabTheory', icon: BookOpen },
  { id: 'decomposer', labelKey: 'numbersTabDecomposer', icon: Calculator },
  { id: 'trainer', labelKey: 'numbersTabTrainer', icon: Zap },
  { id: 'digits', labelKey: 'numbersTabDigits', icon: Eye },
  { id: 'school', labelKey: 'numbersTabSchool', icon: GraduationCap },
];

export function NumbersContainer() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<NumbersTab>('theory');

  return (
    <div className="flex-1 flex flex-col px-4 pt-3 overflow-y-auto">
      {/* Title & Subtitle banner */}
      <div className="mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
            <span className="font-thai font-black text-sm leading-none">๑๒๓</span>
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight leading-tight">
              {t('numbersTitle')}
            </h2>
            <p className="text-[11px] text-slate-500 leading-tight">
              {t('numbersSubtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="bg-slate-200/80 p-1 rounded-2xl flex items-center gap-1 mb-4 shadow-inner">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 select-none touch-manipulation ${
                isActive
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t(tab.labelKey)}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="flex-1 min-h-0">
        {activeTab === 'theory' && <NumbersTheoryGuide />}
        {activeTab === 'decomposer' && <NumberDecomposer />}
        {activeTab === 'trainer' && <NumberTrainer />}
        {activeTab === 'digits' && <ThaiDigitsGuide />}
        {activeTab === 'school' && <SchoolNumbersGuide />}
      </div>
    </div>
  );
}
