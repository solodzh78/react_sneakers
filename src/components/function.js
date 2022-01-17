const hasScrollbar = () => {   // проверяем на боковой скролл
  return document.body.scrollHeight > document.body.clientHeight;
}

const getScrollbarSize = () => { // получаем ширину скролла
  let outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

  document.body.appendChild(outer);  // добавляем outer div
  let widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  let inner = document.createElement('div');  // добавляем inner div
  inner.style.width = '100%';
  outer.appendChild(inner);

  let widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);  // удаляем div`ы

  return widthNoScroll - widthWithScroll;
}

const myScroll = (() => {
  const body = document.body;
  let scrollTop;
  const hideScroll = () => {
    const body = document.body;
    scrollTop = window.scrollY ; // запоминаем текущую прокрутку сверху
    body.classList.add("no-scroll"); // добавляем класс no-scroll
    body.style.position = 'fixed';
    if (hasScrollbar()) {
      // с учетом горизонтального скролла. Чтобы небыло рывка при открытии модального окна
      body.style.width = `calc(100% - ${getScrollbarSize()}px)`;
    } else {
      body.style.width = '100%';
    }
    body.style.top = -scrollTop + 'px';
  };

  const showScroll = () => {
    body.classList.remove('no-scroll'); // удаляем класс no-scroll
    body.style.position = '';
    body.style.width = '';
    body.style.top = '';
    window.scroll(0, scrollTop); // устанавливаем прокрутку сверху в запомненное значение
  };
  return (arg => arg ? hideScroll : showScroll);
})();

export const hideScroll = () => myScroll(true); // функция запрета скролла
export const showScroll = () => myScroll(false); // функция возврата скролла