import { ExternalLink } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useTranslation } from '../i18n/translations';

interface VideoResource {
  title: string;
  descriptionRu: string;
  descriptionEn: string;
  url: string;
  emoji: string;
}

const RESOURCES: VideoResource[] = [
  {
    title: 'Comprehensible Thai',
    descriptionRu: 'Натуральное слуховое погружение (ALG) без перевода. Понимание через контекст и визуал.',
    descriptionEn: 'Natural auditory immersion (ALG) without direct translation. Understand through context and visuals.',
    url: 'https://www.youtube.com/@ComprehensibleThai',
    emoji: '🎧',
  },
  {
    title: 'KruGift Learn Thai for Real',
    descriptionRu: 'Разбор по словам, точные субтитры, караоке и шэдоуинг. Идеально для среднего уровня.',
    descriptionEn: 'Word-by-word breakdowns, accurate subtitles, karaoke, and shadowing. Ideal for intermediate learners.',
    url: 'https://www.youtube.com/@KruGiftLearnThaiForReal',
    emoji: '📚',
  },
  {
    title: 'Stuart Jay Raj: Never Miss a Tone',
    descriptionRu: 'Физиология артикуляции тонов на уровне гортани. Глубокое понимание фонетики.',
    descriptionEn: 'Physiology of tone articulation at the larynx level. Deep understanding of Thai phonetics.',
    url: 'https://www.youtube.com/watch?v=nXPqfkfJdAE',
    emoji: '🎵',
  },
  {
    title: '10 Basic Thai Phrases for Classroom',
    descriptionRu: 'Практические команды учителя в классе — самые частотные фразы для урока.',
    descriptionEn: 'Practical teacher classroom commands — the most frequent essential phrases for lessons.',
    url: 'https://www.youtube.com/results?search_query=10+basic+thai+phrases+classroom+teacher',
    emoji: '🏫',
  },
  {
    title: 'Classroom Language in Thai',
    descriptionRu: 'Живая речь в классе от преподавателя-носителя. Реальные паттерны общения.',
    descriptionEn: 'Authentic classroom speech from a native Thai instructor. Real communication patterns.',
    url: 'https://www.youtube.com/results?search_query=classroom+language+in+thai+teacher',
    emoji: '🗣️',
  },
  {
    title: 'Classroom Management in Thailand',
    descriptionRu: 'Практика и специфика удержания школьной дисциплины в тайских школах.',
    descriptionEn: 'Practical strategies and cultural nuances of managing discipline in Thai schools.',
    url: 'https://www.youtube.com/results?search_query=classroom+management+thailand+school+teacher',
    emoji: '📋',
  },
];

export function VideoResources() {
  const language = useAppStore((s) => s.language);
  const { t } = useTranslation();

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900">{t('mediaTitle')}</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          {t('mediaSubtitle')}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {RESOURCES.map((resource) => (
          <a
            key={resource.title}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm active:scale-[0.98] transition-transform select-none touch-manipulation hover:border-blue-300"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center text-xl shrink-0">
              {resource.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-semibold text-slate-900 truncate">
                  {resource.title}
                </h3>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                {language === 'en' ? resource.descriptionEn : resource.descriptionRu}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
