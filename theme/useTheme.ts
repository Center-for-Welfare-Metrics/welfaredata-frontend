import { useEffect, useState } from 'react';
import _ from 'lodash';
import themes from './schema.json'
export const useTheme = () => {
 
  const [theme, setTheme] = useState(null)
  const [themeLoaded, setThemeLoaded] = useState(false)

  useEffect(() =>{
    setTheme(themes.default);
    setThemeLoaded(true);
  }, []);

  return { theme, themeLoaded }
};