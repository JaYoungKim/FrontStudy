export default function TodoList({ $target, initialState, onClickTodo, onRemoveTodo }) {
  // initialState에 대한 검증

  this.$todoList = document.createElement('ul')

  $target.appendChild(this.$todoList)

  this.state = initialState

  this.render = () => {
    if (Array.isArray(this.state)) {
      this.$todoList.innerHTML = this.state
        .map(
          ({ text, isCompleted }, index) =>
            `<li data-index="${index}">${isCompleted ? `<s>${text}</s>` : text} <button class='delete'>삭제</button></li>`
        )
        .join('')
    }

    /* 
    이런 방식은 li가 추가될 때마다 이벤트를 새로 걸어줘야함.
    this.$todoList.querySelectorAll('li').forEach(($li, i) => {
      $li.addEventListener('click', () => {
        onClickTodo(i)
      })
    }) */
  }

  this.setState = (nextState) => { //갱신
    // nextState 대한 검증
    this.state = nextState
    this.render()
  }

  this.$todoList.addEventListener('click', (e) => {
    const $li = e.target.closest('li')
    const index = Number($li.dataset.index)

    if (e.target.className === 'delete') {
      onRemoveTodo(index)
    } else if ($li) {
      onClickTodo(index)
    }
  })

  this.render()
}
