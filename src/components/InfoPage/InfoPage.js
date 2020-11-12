import React from 'react';
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";


// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

// const InfoPage = () => (
//   <div>
//     <p>
//       Shelf Page
//     </p>
//   </div>
// );

// If you needed to add local state or other things,
// you can make it a class component like:

class InfoPage extends React.Component {

  state = {
    newItem : {
      description : '',
      imageUrl : ''
    }
  }

  handleClick = () => {
    this.props.dispatch({type: 'ADD_ITEM', payload: this.state.newItem})
    }

  handleChange = (event, eventType) => {
    this.setState({
      newItem : {
        ...this.state.newItem,
        [eventType]: event.target.value
      }
    });
    // console.log(this.state);
  }

  render() {
    return (
      <>
        <div>
          <p>Info Page</p>
        </div>
        <input
          onChange={(event) => this.handleChange(event, 'description')}
          type="text"
          placeholder="Description"
        />
        <input
          onChange={(event) => this.handleChange(event, 'imageUrl')}
          type="text"
          placeholder="Image URL"
        />
        <button onClick={this.handleClick}>Submit</button>
      </>
    );
  }
}

export default connect(mapStoreToProps)(InfoPage);
