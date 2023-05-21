/* eslint-disable no-new */
import { Footer } from './component/footer';
import { Header } from './component/header';
import { Main } from './component/main';
import { PokemonList } from './component/pokemon-list';
import './styles.css';

new Header('#app');
new Main('#app');
new PokemonList('main');
new Footer('#app');
