import { app } from './app.mjs';
import { App } from './config/index.mjs';

app.listen(App.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`${App.ENV} server is running on port ${App.PORT}`);
});
