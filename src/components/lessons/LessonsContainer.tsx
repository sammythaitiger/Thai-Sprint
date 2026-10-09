import { useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { LESSONS_DATA } from '../../data/lessons';
import { LessonDashboard } from './LessonDashboard';
import { LessonView } from './LessonView';

export function LessonsContainer() {
  const activeLessonDay = useAppStore((s) => s.activeLessonDay);
  const setActiveLessonDay = useAppStore((s) => s.setActiveLessonDay);

  const activeLesson = useMemo(() => {
    if (activeLessonDay === null) return null;
    return LESSONS_DATA.find((l) => l.day === activeLessonDay) || null;
  }, [activeLessonDay]);

  if (activeLesson) {
    return (
      <LessonView
        lesson={activeLesson}
        onBack={() => setActiveLessonDay(null)}
      />
    );
  }

  return <LessonDashboard />;
}
