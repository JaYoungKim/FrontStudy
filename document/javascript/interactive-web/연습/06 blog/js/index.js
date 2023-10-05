const header = document.querySelector("header");
const progressBar = document.querySelector(".bar");
const coverTitle = document.querySelector(".cover-title");
const coverWrap = document.querySelector(".cover-wrap");
const dimd = coverWrap.querySelector(".dimd");
const contWrap = document.querySelector(".content-wrap");

let scrollY = 0;
let per = 0;
// const coverHeight = window.innerHeight;
const coverHeight = coverWrap.offsetHeight - header.offsetHeight;
let contentHeight = document.body.scrollHeight - window.innerHeight; // coverWrap 영역 fixed라 body에 값 포함 안됨 

window.addEventListener('scroll', () => {
  scrollY = window.scrollY;

  per = partPercent(coverHeight);
  console.log(per)

  if (scrollY > coverHeight) {
    // contentWrap 영역
    header.classList.add("fixed");
    progressBar.style.width = `${per}%`;
  } else {
    //coverWrap 영역
    header.classList.remove("fixed");
    coverTitle.style.top = -scrollY / 10 + "px";
    coverWrap.style.backgroundPosition = `center ${-scrollY / 5}px`;
    dimd.style.backgroundColor = `rgba(0, 0, 0, ${0.4 + scrollY / 3000})`
  }
});

window.addEventListener('resize', () => {
  contentHeight = document.body.scrollHeight - window.innerHeight;
})

/**
 * 값을 비율로 변환
 * @param {*} num 
 * @param {*} totalnum 
 * @returns 
 */
const percent = (num, totalnum) => {
  return (num / totalnum * 100).toFixed(0);
}

/**
 * 특정 영역의 스크롤 비율 계산
 * @param {*} prevHeight : 이전 씬의 높이 
 * @returns scrollRatio 스크롤된 비율
 */
// const partPercent = (prevHeight) => {
//   currentScrollY = scrollY - prevHeight;
//   // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
//   scrollRatio = percent(currentScrollY, contentHeight);

//   return scrollRatio;
// }