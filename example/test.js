import React from "react";
import { Image, Text, View, Dimensions } from "react-native";
import Masonry from "../lib";

const { width } = Dimensions.get( "window" );
const columnWidth = ( width - 10 ) / 2 - 10;

export default class Test extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			data: []
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
				this.setState( { data } );
			} );
	}

	render() {
		return <View style={{
			flex: 1, backgroundColor: "#EEE", flexDirection: 'row',
			flexWrap: 'wrap',
			justifyContent: "flex-start",
			alignItems: "flex-start"
		}}>
			{this.state.data.map( item => <View
				key={item.key}
				style={{
					margin: 5,
					width: 100,
					backgroundColor: "#fff",
					borderRadius: 5,
					overflow: "hidden",
					borderWidth: 1,
					height: item.height,
					borderColor: "#dedede"
				}}>
				<Image source={{ uri: item.image }} style={{ height: item.height }}/>
			</View> )}
		</View>
	}
}