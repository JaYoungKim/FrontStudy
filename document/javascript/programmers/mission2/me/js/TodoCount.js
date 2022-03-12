function TodoCount({ $target, initialState }) {
  this.state = initialState;

  const $todoCount = document.createElement('div')
  $target.appendChild($todoCount);

  this.render = () => {
    const { totalCount, completedCount } = this.state
    $todoCount.innerHTML = `
      totoal Count : ${totalCount}, 
      completed Count: ${completedCount}
    `
  }

  this.setState = (nextState) => {
    this.state = nextState;
    this.render()
  }

  this.render()
}