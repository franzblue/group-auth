import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* addItem(action) {
    try {
        yield axios.post('/api/shelf', action.payload)
        yield put({ type: 'SET_ITEM' , payload: action.payload})
    }
    catch (error){
        console.log('item post failed', error);
    }
}

function* itemSaga() {
  yield takeEvery("ADD_ITEM", addItem);
}


export default itemSaga;
