/**
 * @file:   ThrottleChecker.js 简易的触发频率检查器
 * @author: wangdongyang(punkipod@hotmail.com)
 *
 * const checker = new ThrottleChecker(100);
 * checker.check(‘标记’);
 */

class ThrottleChecker {
  constructor(intervalTime = 100) {
    this.intervalTime = intervalTime;
    this.throttleMap = {};
  }

  check(key) {
    if (!key) {
      return true;
    }

    if (this.throttleMap[key]) {
      const newTimeStamp = new Date().getTime();
      if ((newTimeStamp - this.throttleMap[key]) > this.intervalTime) {
        this.throttleMap[key] = newTimeStamp;
      } else {
        return false;
      }
    } else {
      this.throttleMap[key] = new Date().getTime();
    }
    return true;
  }
}

export default ThrottleChecker;
