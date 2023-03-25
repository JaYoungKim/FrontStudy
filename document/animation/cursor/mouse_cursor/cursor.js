
(function () {
  const newCursorDom = document.createElement("div");
  newCursorDom.setAttribute("class", "cursor"),
    document.body.appendChild(newCursorDom);
  const cursor = document.querySelector('.cursor');
  let a = document.querySelectorAll('a');
  let input = document.querySelectorAll('input');
  let bg = document.querySelectorAll('.bg-black');


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
      cursor.classList.add('cursor-link');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-link');
    });
  });

  input.forEach(item => {
    item.addEventListener('mouseover', () => {
      cursor.classList.add('cursor-input');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-input');
    });
  });

  bg.forEach(item => {
    item.addEventListener('mouseover', () => {
      cursor.classList.add('cursor-bg');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-bg');
    });
  });
})();
