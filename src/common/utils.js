import { RankTypes } from "./constant";

// 防抖
export const debounce = (func, delay) => {
  let timer;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      clearTimeout(timer);
    }, delay);
  };
};
// 拼接歌手名字
export const getName = songList => {
  if (!Array.isArray(songList)) return "";
  let str = "";
  songList.forEach((song, index) => {
    str += index === 0 ? song.name : "/" + song.name;
  });
  return str;
};

// 是否是空对象
export const isEmptyObject = obj => !obj || Object.keys(obj).length === 0;
