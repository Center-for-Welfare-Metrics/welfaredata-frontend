import { useEffect, useState } from 'react';
import { setToLocalStorage, getFromLocalStorage } from '@/utils/storage';
import _ from 'lodash';

export const useTheme = () => {
 
  const [theme, setTheme] = useState(null)
  const [themeLoaded, setThemeLoaded] = useState(false)

  const setMode = mode => {
    setToLocalStorage('theme', mode)
    setTheme(mode);
  };

  useEffect(() =>{
    const themes = getFromLocalStorage('themes')
    const localTheme = getFromLocalStorage('theme');
    localTheme ? setTheme(localTheme) : setTheme(themes.default);
    setThemeLoaded(true);
  }, []);

  return { theme, themeLoaded, setMode }
};