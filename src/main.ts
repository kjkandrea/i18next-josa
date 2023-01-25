import './style.css';
import i18next, {TFunction} from 'i18next';

i18next
  .init({
    lng: 'ko',
    debug: true,
    resources: {
      ko: {
        translation: {
          wild_pokemon_appeared: '야생의 {{pokemon}}(이)가 튀어나왔다!',
          caught_a_pokemon: '신난다! {{pokemon}}(을)를 잡았다!',
        },
      },
    },
  })
  .then(render);

const $app = document.querySelector<HTMLDivElement>('#app')!;

function render(t: TFunction) {
  $app.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <p>${t('wild_pokemon_appeared', {pokemon: '리자몽'})}</p>
    <p>${t('caught_a_pokemon', {pokemon: '리자몽'})}</p>
  </div>
`;
}
