import { useState } from 'react'
import { Container, Navbar, Dropdown, Image } from 'react-bootstrap'
import Dashboard from './pages/Dashboard'
import logo from './logo.png'
import { useTranslation } from 'react-i18next'

// @ts-ignore
import './App.css'

function App() {
  const { t, i18n } = useTranslation()
  
  const getInitialLang = () => {
    const lang = i18n.language?.split('-')[0] || 'en'
    return lang === 'fr' ? 'fr' : 'en'
  }

  const [language, setLanguage] = useState<'fr' | 'en'>(getInitialLang())

  const flags: Record<string, string> = {
    fr: 'https://flagcdn.com/w40/fr.png',
    en: 'https://flagcdn.com/w40/us.png',
  }
  // 🔹 Normalisation : si la langue retournée est "en-US", on force à "en"

  const handleLanguageChange = (lang: 'fr' | 'en') => {
    setLanguage(lang)
    i18n.changeLanguage(lang)
  }

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        fixed="top"
        expand="lg"
        className="shadow-sm"
        style={{ zIndex: 1030 }}
      >
        <Container className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img
              src={logo}
              alt="Logo"
              style={{ height: '40px', marginRight: '8px' }}
            />
            <Navbar.Brand>{t('APP.TITLE')}</Navbar.Brand>
          </div>

          <Dropdown align="end">
            <Dropdown.Toggle
              variant="dark"
              id="dropdown-language"
              style={{
                padding: 0,
                width: '25px',
                height: '25px',
                borderRadius: '50%',
                overflow: 'hidden',
              }}
            >
              <Image
                src={flags[language]}
                alt={language === 'fr' ? 'FR' : 'EN'}
                width="25"
                height="25"
                roundedCircle
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {Object.keys(flags).map((lang) =>
                lang !== language ? (
                  <Dropdown.Item
                    key={lang}
                    onClick={() => handleLanguageChange(lang as 'fr' | 'en')}
                  >
                    <Image
                      src={flags[lang]}
                      alt={lang}
                      width="25"
                      height="25"
                      roundedCircle
                      className="me-2"
                    />
                    {lang === 'fr' ? 'Français' : 'English (US)'}
                  </Dropdown.Item>
                ) : null
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>

      <div className="app-content">
        <Container>
          <Dashboard />
        </Container>
      </div>
    </>
  )
}

export default App
