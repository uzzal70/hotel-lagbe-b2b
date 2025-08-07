import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
// import CacheBuster from './components/CacheBuster.jsx';
// import * as Sentry from '@sentry/react';

// Sentry.init({
//   dsn: 'https://71a4dcc8a87a6391a840607628b08313@o4506821733187584.ingest.sentry.io/4506829472006144',
//   integrations: [
//     Sentry.browserTracingIntegration(),
//     Sentry.replayIntegration({
//       maskAllText: false,
//       blockAllMedia: false,
//     }),
//   ],

//   tracesSampleRate: 1.0,
//   // tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
//   replaysSessionSampleRate: 0.1,
//   replaysOnErrorSampleRate: 1.0,
// });
//uzzal

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <CacheBuster> */}
    <App />
    {/* </CacheBuster> */}
  </Provider>
);
