import { useCallback, useState } from 'react';
import { WHP } from '../data/prompts';

export function useWHP() {
  const [, setVersion] = useState(0);
  const refresh = useCallback(() => setVersion(v => v + 1), []);
  return { WHP, refresh, prompts: WHP.getAllPrompts(), settings: WHP.getSettings(), pages: WHP.getPages() };
}
