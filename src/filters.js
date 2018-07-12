/**
 * 全局过滤器
 */
export default {
  toFloat(num) {
    if (typeof num !== "number") {
      return num;
    }

    if (!Number.isInteger(num)) {
      return num;
    }

    return num.toFixed(1);
  },
  tranformImg(img, size) {
    if(typeof img !== 'string') {
      return img
    }
    return img.replace('w.h', size);
  }
}