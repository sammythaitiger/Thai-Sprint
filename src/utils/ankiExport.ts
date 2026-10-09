import { Phrase } from '../types';

export function exportToAnki(phrases: Phrase[]): void {
  const header = '#separator:tab\n#html:true\n#tags column:4\n';

  const rows = phrases
    .map((p) => {
      const front = p.thai;
      const back = `${p.transcription}<br>${p.translation}`;
      const tags = p.category;
      return `${front}\t${back}\t${p.categoryLabel}\t${tags}`;
    })
    .join('\n');

  const content = header + rows + '\n';

  const blob = new Blob([content], {
    type: 'text/tab-separated-values;charset=utf-8',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'thai_phrases_deck.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
