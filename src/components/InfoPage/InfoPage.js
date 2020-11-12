import React from "react";
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
    newItem: {
      description: "",
      imageUrl: "",
      itemId: 0,
    },
    toggle: false,
  };

  componentDidMount = () => {
    this.getItem();
  };

  getItem = () => {
    this.props.dispatch({ type: "GET_ITEM" });
  };

  handleClick = () => {
    this.props.dispatch({ type: "ADD_ITEM", payload: this.state.newItem });
  };

  handleChange = (event, eventType) => {
    this.setState({
      newItem: {
        ...this.state.newItem,
        [eventType]: event.target.value,
      },
    });
  };

  deleteItem = (userId, itemId) => {
    console.log("clicked delete");
    if (userId === this.props.store.user.id) {
      this.props.dispatch({ type: "DELETE_ITEM", payload: itemId });
    } else {
      alert("This item does not belong to you!");
    }
  };

  showEditItem = (userId, itemId) => {
    if (userId === this.props.store.user.id) {
      this.setState({
        toggle: false,
      });
      this.setState({
        toggle: !this.state.toggle,
        newItem: {
          ...this.state.newItem,
          itemId: itemId,
        }
      });
    } else {
      alert("This item does not belong to you!!!!!!!!!!");
    }
  };

  submitEditItem = () => {
    this.props.dispatch({ type: "EDIT_ITEM", payload: this.state.newItem });
  };

  render() {
    return (
      <>
        <div>
          <p>Info Page</p>
        </div>

        {this.props.store.user.id && (
          <>
            <input
              onChange={(event) => this.handleChange(event, "description")}
              type="text"
              placeholder="Description"
            />

            <input
              onChange={(event) => this.handleChange(event, "imageUrl")}
              type="text"
              placeholder="Image URL"
            />

            <button onClick={this.handleClick}>Submit</button>
          </>
        )}

        <ul>
          {this.props.store.items.map((item) => {
            return (
              <li key={item.id}>
                {item.description}
                <img src={item.image_url} alt={item.description} />

                {item.user_id === this.props.store.user.id ? (
                  <>
                    <button
                      onClick={() => this.deleteItem(item.user_id, item.id)}
                    >
                      Delete
                    </button>
                    <button
                      value={item.id}
                      onClick={() => this.showEditItem(item.user_id, item.id)}
                    >
                      Edit
                    </button>
                  </>
                ) : (
                  <></>
                )}

                {this.state.toggle && item.id === this.state.newItem.itemId ? (
                  <>
                    <input
                      onChange={(event) =>
                        this.handleChange(event, "description")
                      }
                      type="text"
                      placeholder="Description"
                    />

                    <input
                      onChange={(event) => this.handleChange(event, "imageUrl")}
                      type="text"
                      placeholder="Image URL"
                    />

                    <button onClick={() => this.submitEditItem(item.id)}>
                      Submit
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default connect(mapStoreToProps)(InfoPage);
