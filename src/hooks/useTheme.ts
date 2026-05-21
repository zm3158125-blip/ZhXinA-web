import { useCallback, useEffect, useState } from 'react';

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) document.documentElement.classList.add('dark');
    return prefersDark;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
      document.documentElement.classList.toggle('dark', e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  }, []);

  return { isDark, toggleTheme };
}
