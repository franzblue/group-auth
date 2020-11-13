import React from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

class ShelfPage extends React.Component {
    
    getUserItems = () => {
        this.props.dispatch({type: 'GET_USER_ITEMS', payload: this.props.match.params.id})
    }

    componentDidMount = () => {
        this.getUserItems();
    } 
    
    render () {
        return (
            <div>
                <ul>
                {this.props.store.items.map(item => {
                    return <li key={item.id}>
                                {item.description}
                                <img src={item.image_url} alt={item.description} />
                            </li>
                })}
                </ul>
            </div>
        )
    }
}

export default connect(mapStoreToProps)(ShelfPage);