import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import './i18n';
import I18nWrapper from "./I18nWrapper.js";
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nWrapper />
  </React.StrictMode>
);