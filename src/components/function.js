const hasScrollbar = () => { // проверка на боковой скролл
  return document.body.scrollHeight > document.body.clientHeight;
}

const getScrollbarSize = () => { // получение ширины скролла
  let outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

  document.body.appendChild(outer);  // add outerdiv

  let widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';  // force scrollbars


  let inner = document.createElement('div');  // add innerdiv
  inner.style.width = '100%';
  outer.appendChild(inner);

  let widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);  // remove divs

  return widthNoScroll - widthWithScroll;
}

const myScroll = () => {

  const body = document.body;
  let scrollTop; // храним переменную в замыкании
  return (
    function(arg) {

      if(arg) {
        scrollTop = window.pageYOffset; // запоминаем текущую прокрутку сверху
        document.body.classList.add("no-scroll");
        body.style.position = 'fixed';
        if (hasScrollbar()) {
        // с учетом горизонтального скролла. Чтобы небыло рывка при открытии модального окна
          body.style.width = `calc(100% - ${getScrollbarSize()}px)`;
        } else {
          body.style.width = '100%';
        }
        body.style.top = -scrollTop + 'px';
      } else {
        body.classList.remove('no-scroll');
        body.style.position = '';
        body.style.width = '';
        body.style.top = '';

        console.log('scrollTop after close: ', scrollTop);
        window.scroll(0, scrollTop); // устанавливаем прокрутку сверху в запомненное значение
      }
        
      }
  );
};

export const hideScroll = myScroll();