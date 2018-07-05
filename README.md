# react-native-masonry-layout

> An easy to use, pure JS react-native component to render a masonry layout for any item view

#### [中文文档](./README-zh.md) 

## features
* Full custom item view, Including style definition
* Instead of adding a item per column, the optimal arrangement is automatically determined by the algorithm. Avoid the high gap in each column

![preview](./example/preview.png)

## Usage

#### 1.Install
npm
```shell
$ npm install --save react-native-masonry-layout
```
yarn
```shell
$ yarn add react-native-masonry-layout
```

#### 2.Import
```javascript
import Masonry from 'react-native-masonry-layout';
```

#### 3.Render
```javascript
<Masonry
  ref="masonry"
  columns={3} // optional - Default: 2
  renderItem={(item)=><View>
    <Text>some text</Text>
  </View>}
/>
```

## Component Props
|Props|Type|Description|Default|
|-----|-----|-----|-----|
| columns | number | Desired number of columns | 2 |
| header | View | Add view in front of the masonry layout | null |
| footer | View | Add view in behind the masonry layout | null |
| containerStyle | ViewStyle | Defining the style of the container view | null |
| renderItem | func | The method used to render each item | null |
| keyExtractor | func | By default, the list looks for a key prop on each item and uses that for the React key. Alternatively, you can provide a custom keyExtractor prop. | null |
#### Other attributes are the same as [ScrollView](http://facebook.github.io/react-native/docs/scrollview.html) 

## Component Methods
#### addItems
Add Items to the Masonry component。The items height will be automatically calculated, and the item will be rendered one by one, and addItemsWithHeight should be used if it needs to be rendered in bulk
```javascript
this.refs.masonry.addItems([
	{ key:1, text:"text1" },
	{ key:1, text:"text1" }
]);
```

#### addItemsWithHeight
Add items to masonry. Item height will be automatically calculated, but height attribute must be added to every item object data. This attribute is not the actual item rendering height, but a reference value for item assignment algorithm. Unlike addItems, items is rendered in bulk.
```javascript
this.refs.masonry.addItems([
	{ key:1, text:"text1", height: 210 },
	{ key:1, text:"text1", height: 150 }
]);
```

#### clear
Clear the items of masonry.
```javascript
this.refs.masonry.clear();
```