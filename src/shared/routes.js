import Home from './Home'
import Grid from './Grid'
import { fetchPopularRepos } from './api'
import config from '../config';

const routes =  [
  {
    path: '/',
    exact: true,
    component: Home,
    fetchInitialData: (path = '') => {
      return new Promise(resolve => {
        resolve({
          metaTitle: config.appTitle,
          metaDescription: config.appDescription,
          metaImage: config.appImage
        })
      });
    }
  },
  {
    path: '/popular/:id',
    component: Grid,
    fetchInitialData: (path = '') => {
      return new Promise(resolve => {
        const popularFilter = path.split('/').pop();
        fetchPopularRepos(popularFilter).then((repos) => {
          resolve({
            metaTitle: `${config.appTitle}: ${popularFilter}`,
            metaDescription: `${config.appDescription}: ${popularFilter}`,
            metaImage: config.appImage,
            repos
          });
        });
      })
    }
  }
]

export default routes