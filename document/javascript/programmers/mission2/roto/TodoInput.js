import { dispatchRemoveAllEvent } from './customEvent.js'

export default function TodoInput({ $target, onAddTodo, onRemoveAll }) {
  this.$todoInput = document.createElement('form');
  this.$btnRemoveAll = document.createElement('button');
  this.$btnRemoveAll.textContent = 'remove all'
  $target.appendChild(this.$todoInput);
  $target.appendChild(this.$btnRemoveAll);

  this.render = () => {
    this.$todoInput.innerHTML = `<input type='text' placeholder='할 일을 입력해주세요'/><button>입력</button>`
  }

  this.$todoInput.addEventListener('submit', (e) => {
    e.preventDefault();
    const $input = this.$todoInput.querySelector('input')
    onAddTodo($input.value);
    $input.value = ''
  })

  this.$btnRemoveAll.addEventListener('click', () => {
    // onRemoveAll();
    // window.dispatchEvent(new CustomEvent('removeAll'))
    dispatchRemoveAllEvent($target)
  })
  /* let isInitialized = false; //초기화됨
  const $input = document.createElement('input');

  this.render = () => {
    if (!isInitialized) {
      $target.appendChild($input)
    }
  }

  $input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      onAddTodo($input.value)
      $input.value = ''
    }
  }) */

  this.render();
}
