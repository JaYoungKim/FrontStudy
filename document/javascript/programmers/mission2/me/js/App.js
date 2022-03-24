const TODO_STORAGE_KEY = 'todos'

function App({ $target }) {

  /*   this.state = [
      {
        text: "js 공부하기",
        isCompleted: true,
      },
      {
        text: "js 복습하기",
        isCompleted: false,
      },
    ] */

  this.state = storage.getItem(TODO_STORAGE_KEY, [])
  this.$target = $target


  const todoInput = new TodoInput({
    $target,
    onSubmitEvent: (text) => {
      // this.state.push({
      //   text,
      //   isCompleted: false
      // })
      // todoList.setState(this.state)

      this.setState([
        ...this.state,
        {
          text,
          isCompleted: false
        }
      ])
    }
  })

  const todoList = new TodoList({
    $target,
    initialState: this.state,
    onCompleateList: (index) => {
      const nextState = [...this.state]
      nextState[index].isCompleted = !nextState[index].isCompleted
      this.setState(nextState)
    },
    onRemoveList: (index) => {
      const nextState = [...this.state]
      // delete nextState[index] : 삭제가 아니라 empty 
      nextState.splice(index, 1)
      this.setState(nextState)
    }
  })

  const todoCount = new TodoCount({
    $target,
    initialState: {
      totalCount: this.state.length,
      completedCount: this.state.filter((data) => data.isCompleted).length
    }
  })

  this.setState = (nextState) => {
    storage.setItem(TODO_STORAGE_KEY, nextState)
    this.state = nextState
    todoList.setState(this.state)

    todoCount.setState({
      totalCount: this.state.length,
      completedCount: this.state.filter((data) => data.isCompleted).length
    })
  }
}