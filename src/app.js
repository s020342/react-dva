import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
const app = dva({
  history: createHistory(),
});
 
app.use(createLoading());


export default app