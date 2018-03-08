import React from "react";
import { Image, Text, View, Dimensions, RefreshControl } from "react-native";
import Masonry from "../lib";

const { width } = Dimensions.get( "window" );
const columnWidth = ( width - 10 ) / 2 - 10;

export default class Example extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			withHeight: false,
			loading: false
		};
	}

	componentDidMount() {
		this.load();
	}

	load() {
		this.setState( { loading: true } );
		fetch( "http://huaban.com/boards/17649987/?limit=10", {
			headers: {
				"X-Requested-With": "XMLHttpRequest"
			}
		} ).then( res => res.json() )
			.then( data => {
				this.setState( { loading: false } );
				data = data.board.pins.map( item => {
					return {
						image: "http://img.hb.aicdn.com/" + item.file.key,
						text: item.raw_text,
						key: item.file.key,
						height: columnWidth / item.file.width * item.file.height
					}
				} );
				if ( this.state.withHeight ) {
					this.refs.list.addItemsWithHeight( data );
				} else {
					this.refs.list.addItems( data );
				}
			} );
	}

	onScrollEnd( event ) {
		const scrollHeight = Math.floor( event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height );
		const height = Math.floor( event.nativeEvent.contentSize.height );
		if ( scrollHeight >= height ) {
			this.load();
		}
	}

	render() {
		return <View style={{ flex: 1, backgroundColor: "#EEE" }}>
			<Masonry onMomentumScrollEnd={this.onScrollEnd.bind( this )}
					 style={{ flex: 1, borderWidth: 1, borderColor: "red" }}
					 columns={2} ref="list"
					 containerStyle={{ padding: 5 }}
					 refreshControl={<RefreshControl
						 refreshing={this.state.isRefreshing}
						 onRefresh={this._onRefresh}
						 tintColor="#ff0000"
						 title="Loading..."
						 titleColor="#00ff00"
						 colors={[ '#ff0000', '#00ff00', '#0000ff' ]}
						 progressBackgroundColor="#ffff00"
					 />}
					 renderItem={item => <View
						 style={{
							 margin: 5,
							 backgroundColor: "#fff",
							 borderRadius: 5,
							 overflow: "hidden",
							 borderWidth: 1,
							 borderColor: "#dedede"
						 }}>
						 <Image source={{ uri: item.image }} style={{ height: item.height }}/>
						 <Text style={{ padding: 5, color: "#444" }}>{item.text}</Text>
					 </View>}/>

			{this.state.loading && <View style={{
				position: "absolute",
				justifyContent: "center",
				alignItems: "center",
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				backgroundColor: "rgba(0,0,0,0.3)"
			}}>
				<Text style={{
					backgroundColor: "#fff",
					paddingVertical: 20,
					paddingHorizontal: 30,
					borderRadius: 10
				}}>加载中</Text>
			</View>}
		</View>
	}
}