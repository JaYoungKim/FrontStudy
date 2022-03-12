
const isNil = data => data == null;

function TodoList({ initialState, $target, onCompleateList, onRemoveList }) {
  this.state = initialState;

  this.validate = (data) => {
    if (isNil(data)) throw new Error("데이터가 undefinded 이거나, null 입니다.")
    else if (!Array.isArray(data)) throw new Error("데이터가 배열이 아닙니다.")
  }

  try {
    this.validate(this.state);
    if (!new.target) throw new Error("new 키워드가 없습니다.")
  } catch (error) {
    console.error(error);
    return false;
  }


  this.setState = (nextState) => {
    console.log(nextState)
    try {
      this.validate(this.state);
      if (!new.target) throw new Error("new 키워드가 없습니다.")
    } catch (error) {
      return console.error(error);
    }

    this.state = nextState;
    this.render();
  }


  const $todoUL = document.createElement('ul');
  $target.appendChild($todoUL)

  this.render = () => {

    $todoUL.innerHTML = this.state.map(function (data, index) {
      return "<li data-index=" + index + ">"
        + (data.isCompleted === false ?
          "<span>" + data.text + "</span>" :
          "<span><s>" + data.text + "</s></span>")
        + " <button class='delete'>x</button></li>"
    }).join('')
  }

  $todoUL.addEventListener('click', (e) => {
    const $li = e.target.closest('li')
    if ($li) {
      const index = Number($li.dataset.index)
      if (e.target.className === 'delete') {
        return onRemoveList(index);
      }
      return onCompleateList(index);
    }

  })


  this.render();
}

