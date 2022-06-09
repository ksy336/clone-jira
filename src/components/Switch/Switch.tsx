import React, { useEffect, useState } from 'react';
import { setCookie } from 'typescript-cookie';
import { useTranslation } from 'react-i18next';

const Switch = () => {
 const lang = cookies.lang;
  //setCookie("lang", lang );
  const { setCookie } = useCookiesStorage(['']);
  const {t, i18n} = useTranslation();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
      setChecked(lang === "ru");
    }
  }, [lang]);

  const onChangeLang = (checked: boolean) => {
    const lang = checked ? "ru" : "en";

  i18n.changeLanguage(lang);
  setCookie("lang", lang);
  setChecked(lang === "ru");
  };

  return (
    <Switch
      checked={checked}
      className="switch"
      checkedChildren={t("ru")}
      unCheckedChildren={t("en")}
      onChange={onChangeLang}
    />
  );
};

export default Switch;