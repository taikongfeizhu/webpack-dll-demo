class Singleton {
  static factory() {
    if (!this.instance) {
      this.instance = new Singleton();
    } else {
      console.error('instance is created');
    }
    return this.instance;
  }

  constructor() {
    this.activedKey = null;
    this.namespace = {};
  }

  getName(name, prefix) {
    return `${prefix}_${name}`;
  }

  setName(name) {
    const key = this.activedKey;
    const item = this.namespace[key];
    if (!item.includes(name)) {
      this.namespace[key] = [...item, name];
    }
    return this;
  }

  add(name, ...prefix) {
    // 不走单例配置，按输入返回常量名
    if (prefix.length > 0) {
      const [pre] = prefix;
      return this.getName(name, pre);
    }
    const nameMerge = this.setName(name);
    if (nameMerge) {
      return nameMerge.getName(name, this.activedKey);
    }
    throw new Error('this key exist');
  }

  setKey(key) {
    this.activedKey = key;
    this.namespace[key] = [];
    return this;
  }
}

export const singleton = Singleton.factory();
