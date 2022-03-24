export default function TodoCount({ $target, initialState }) {
  this.$todoCount = document.createElement('div');
  $target.appendChild(this.$todoCount)
  this.state = initialState
  console.log(this.state)
  this.render = () => {
    const { totalCount, completedCount } = this.state
    this.$todoCount.innerHTML = `
      <div>
        <span>Total : ${totalCount}</span>
        <span>Completed : ${completedCount}</span>
      </div>
    `
  }

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render()
}