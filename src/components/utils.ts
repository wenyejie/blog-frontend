/**
 * @author: Storm
 * @date: 2021/1/11 0011
 * @email: wenyejie@foxmail.com
 */

// 定义props: {type: Boolean, default: false}
export const propBooleanDefFalse = {
  type: Boolean,
  default: false
};

// size默认配置
export const propSizeOpts = {
  type: String,
  validator: (val: string) => {
    return ["large", "small", "mini"].includes(val);
  }
};
