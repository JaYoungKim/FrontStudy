const newCursorDom = document.createElement("div");
newCursorDom.setAttribute("class", "cursor"),
  document.body.appendChild(newCursorDom);
const cursor = document.querySelector('.cursor');
let a = document.querySelectorAll('a');


document.addEventListener('mousemove', (e) => {
  let x = e.clientX;
  let y = e.clientY;
  cursor.style.left = x + 'px';
  cursor.style.top = y + 'px';
});

// document.addEventListener('mousedown', () => {
//   cursor.classList.add('cursor-hover')
// });

// document.addEventListener('mouseup', () => {
//   cursor.classList.remove('cursor-hover')
// });

a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('is-hover');
  });
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-hover');
  });
})