import storage from "./storage.js";
import TodoList from "./TodoList.js";
import TodoInput from "./TodoInput.js";
import TodoCount from "./TodoCount.js";


const TODOS_STORAGE_KEY = 'todos'

export default function App({ $target }) {

  this.$target = $target

  /*   this.state = [
      {
        text: 'JS 공부하기',
        isCompleted: false,
      },
      {
        text: 'JS 복습하기',
        isCompleted: false,
      },
    ]
   */

  // this.state = JSON.parse(localStorage.getItem('todos')) || []
  this.state = storage.getItem(TODOS_STORAGE_KEY, [])

  const todoInput = new TodoInput({
    $target,
    onAddTodo: (text) => {
      this.setState([
        ...this.state,
        {
          text,
          isCompleted: false,
        }
      ])
    },
    /* onRemoveAll: () => {
         this.setState([])
    } */
  });

  $target.addEventListener('removeAll', () => {
    this.setState([])
  })

  const todoList = new TodoList({
    $target,
    initialState: this.state,
    onClickTodo: (index) => {
      const nextState = [...this.state]
      nextState[index].isCompleted = !nextState[index].isCompleted //진리값을 부정하여 반대로 세팅한다. 
      this.setState(nextState)
    },
    onRemoveTodo: (index) => {
      //데이터를 삭제하는 세가지 방법 
      const nextState = this.state.filter((_, i) => i !== index) //해당 인덱스를 제왜한 값을 필터링한다.
      // const nextState = [...this.state]
      // nextState.splice(index, 1)
      // delete nextState[index]
      this.setState(nextState)
    }
  })

  const todoCount = new TodoCount({
    $target, initialState: {
      totalCount: this.state.length,
      completedCount: this.state.filter((todo) => todo.isCompleted).length
    }
  })

  this.setState = (nextState) => {
    //nextState에 대한 validation

    // localStorage.setItem('todos', JSON.stringify(nextState)) //string변환
    storage.setItem(TODOS_STORAGE_KEY, nextState)
    this.state = nextState

    todoList.setState(nextState)//업데이트 된 데이터를 렌더링
    // todoCount.setState(nextState)//업데이트 된 데이터를 렌더링
    todoCount.setState({
      totalCount: this.state.length,
      completedCount: this.state.filter((todo) => todo.isCompleted).length
    })
  }

}