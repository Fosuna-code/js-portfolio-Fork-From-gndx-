import {Template,data} from '@templates/Template.js';
import preDownload from '@utils/preDownload.js'
import '@styles/main.css'

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
  preDownload(data);
  console.log(data);
})();
