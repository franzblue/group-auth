import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* addItem(action) {
    try {
        yield axios.post('/api/shelf', action.payload);
        yield put({type: "GET_ITEM"});
    }
    catch (error){
        console.log('item post failed', error);
    }
}

function* getItem() {
    try {
        const getResponse = yield axios.get('/api/shelf');
        yield put({ type: 'SET_ITEM', payload: getResponse.data});
    }
    catch (error){
        console.log('item GET failed', error);
    }
}

function* deleteItem(action) {
    try {
        yield axios.delete(`/api/shelf/${action.payload}`);
        yield put({type: "GET_ITEM"});
    }
    catch (error){
        console.log('item delete failed', error);
    }
}

function* itemSaga() {
  yield takeEvery("ADD_ITEM", addItem);
  yield takeEvery("GET_ITEM", getItem);
  yield takeEvery("DELETE_ITEM", deleteItem);
}


export default itemSaga;
