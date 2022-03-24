function TodoInput({ $target, onSubmitEvent }) {
  const $todoForm = document.createElement('form');

  $target.appendChild($todoForm);

  $todoForm.innerHTML = `
  <input type='text' placeholder='할 일을 입력해주세요'  /> 
  <button type='submit'>확인</button>
  `

  $todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const $todoInput = $todoForm.querySelector('input')
    onSubmitEvent($todoInput.value)
    $todoInput.value = ''
  })

}