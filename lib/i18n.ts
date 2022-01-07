import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';

import { Locale } from '@douyinfe/semi-ui/lib/es/locale/interface';
import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US';
import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import ja_JP from '@douyinfe/semi-ui/lib/es/locale/source/ja_JP';
import ms_MY from '@douyinfe/semi-ui/lib/es/locale/source/ms_MY';
import id_ID from '@douyinfe/semi-ui/lib/es/locale/source/id_ID';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';
import ko_KR from '@douyinfe/semi-ui/lib/es/locale/source/ko_KR';
import vi_VN from '@douyinfe/semi-ui/lib/es/locale/source/vi_VN';
import ru_RU from '@douyinfe/semi-ui/lib/es/locale/source/ru_RU';
import th_TH from '@douyinfe/semi-ui/lib/es/locale/source/th_TH';
import tr_TR from '@douyinfe/semi-ui/lib/es/locale/source/tr_TR';
import pt_BR from '@douyinfe/semi-ui/lib/es/locale/source/pt_BR';
import zh_TW from '@douyinfe/semi-ui/lib/es/locale/source/zh_TW';
import ar from '@douyinfe/semi-ui/lib/es/locale/source/ar';
import es from '@douyinfe/semi-ui/lib/es/locale/source/es';

export const languageList: { [key: string]: Locale } = {
  'en_US': en_US,
  'zh_CN': zh_CN,
  'ja_JP': ja_JP,
  'ms_MY': ms_MY,
  // 'id_ID': id_ID,
  // 'en_GB': en_GB,
  // 'ko_KR': ko_KR,
  // 'vi_VN': vi_VN,
  // 'ru_RU': ru_RU,
  // 'th_TH': th_TH,
  // 'tr_TR': tr_TR,
  // 'pt_BR': pt_BR,
  // 'zh_TW': zh_TW,
  // 'ar': ar,
  // 'es': es,
};

export function getLocale(locale: string): Locale {
  if (languageList.hasOwnProperty(locale)) {
    return languageList[locale];
  }
  return en_US;
}

export const useLocale = (locales: Record<string, Record<string, string>>, defaultLanguage = '') => {
  const language = useSelector((state: RootState) => state.config.language);
  const [locale, setLocale] = useState<Record<string, string>>({});
  useEffect(() => {
    const newLocale: Record<string, string> = {};
    for (const item in locales) {
      if (locales.hasOwnProperty(item)) {
        if (locales[item].hasOwnProperty(language)) {
          newLocale[item] = locales[item][language];
        } else if (defaultLanguage && locales[item].hasOwnProperty(defaultLanguage)) {
          newLocale[item] = locales[item][defaultLanguage];
        } else {
          newLocale[item] = '';
        }
      }
    }
    setLocale(newLocale);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);
  return locale;
};
