import './style.css';
import i18next, {TFunction} from 'i18next';
import pokemonNames from './pokemonNames';

i18next
  .init({
    lng: 'ko',
    debug: true,
    resources: {
      ko: {
        translation: {
          wild_pokemon_appeared: '야생의 {{pokemon, 이/가}} 튀어나왔다!',
          caught_a_pokemon: '신난다! {{pokemon, 을/를}} 잡았다!',
        },
      },
    },
  })
  .then(t => {
    if (i18next.services.formatter) {
      i18next.services.formatter.add('이/가', value => {
        return value + (checkBatchimEnding(value) ? '이' : '가');
      });

      i18next.services.formatter.add('을/를', value => {
        return value + (checkBatchimEnding(value) ? '을' : '를');
      });
    }

    render(t);
  });

const $app = document.querySelector<HTMLDivElement>('#app')!;

console.log(pokemonNames);

function render(t: TFunction) {
  $app.innerHTML = `
    <div>
      <ul>
        ${pokemonNames
          .map(
            pokemon => `
            <li>
              <p>${t('wild_pokemon_appeared', {pokemon})}</p>
              <p>${t('caught_a_pokemon', {pokemon})}</p>
            </li>
          `
          )
          .join('')}
      </ul>
    </div>
  `;
}

/**
 * 마지막 글자가 받침을 가지는지 확인
 */
function checkBatchimEnding(word: string): boolean {
  const lastLetter = word[word.length - 1];
  const uni = lastLetter.charCodeAt(0);

  if (uni < 44032 || uni > 55203) return false;

  return (uni - 44032) % 28 !== 0;
}
