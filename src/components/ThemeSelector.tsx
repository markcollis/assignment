import * as React from 'react';

interface ThemeSelectorProps {
  selectedTheme: number;
  setSelectedTheme: (selection: number) => void;
  themes: string[];
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  selectedTheme,
  setSelectedTheme,
  themes,
}) => {
  const themeSelections: JSX.Element[] = themes.map((theme, index) => (
    <li key={theme}>
      <button
        type="button"
        onClick={(): void => setSelectedTheme(index)}
        className={(selectedTheme === index) ? 'active' : ''}
      >
        {theme}
      </button>
    </li>
  ));

  return (
    <div className="theme-selector">
      <p>Select one of the following themes to view data:</p>
      <ul>
        {themeSelections}
      </ul>
    </div>
  );
};

export default ThemeSelector;
