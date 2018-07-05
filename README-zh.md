# react-native-masonry-layout

> 一个简单易用纯粹基于react-native官方组件封装的瀑布流布局组件。

## 特点
* 完全自定义瀑布流 item, 包括样式的定义
* 与大部分其他瀑布流组件不一样的地方在于，item的分配是有算法自动确定，选择最优列进行添加，而不是每个列一次添加一个item，避免了列与列之间高度差距过大的问题

![preview](./example/preview.png)

## 用法

#### 1.安装
npm
```shell
$ npm install --save react-native-masonry-layout
```
yarn
```shell
$ yarn add react-native-masonry-layout
```

#### 2.导入
```javascript
import Masonry from 'react-native-masonry-layout';
```

#### 3.渲染
```javascript
<Masonry
  ref="masonry" // 为组件添加一个引用名，可以通过this.refs.masonry访问该组件
  columns={3} // optional - Default: 2
  renderItem={(item)=><View>
    <Text>some text</Text>
  </View>}
/>
```

## 组件属性
|属性|类型|描述|默认值|
|-----|-----|-----|-----|
| columns | number | 定义显示的列数 | 2 |
| header | View | 在瀑布流之前添加view | null |
| footer | View | 在瀑布流之后添加view | null |
| containerStyle | ViewStyle | 定义瀑布流容器组件的样式 | null |
| renderItem | func | The method used to render each item | null |
| keyExtractor | func | 默认的item列表渲染时会自动选用key属性作为列表项的key，也可以通过定义此属性选择其他属性来作为key | null |
#### 其他属性方法和 [ScrollView](https://reactnative.cn/docs/0.51/scrollview.html#content) 相同

## 组件方法
#### addItems
添加 items 到瀑布流组件中，item的高度将自动确定，但渲染过程是单个item依次渲染。如果需要批量渲染，请使用addItemsWithHeight
```javascript
this.refs.masonry.addItems([
	{ key:1, text:"text1" },
	{ key:1, text:"text1" }
]);
```

#### addItemsWithHeight
添加 items 到瀑布流组件中，item的高度也将自动确定，但需要在每个item对象的数据中添加height属性，该属性不是item渲染后的实际高度，而是作为item分配列的算法参考值。和addItems不一样的是，是批量渲染的
```javascript
this.refs.masonry.addItemsWithHeight([
	{ key:1, text:"text1", height: 210 },
	{ key:1, text:"text1", height: 150 }
]);
```

#### clear
清除瀑布流数据
```javascript
this.refs.masonry.clear();
```