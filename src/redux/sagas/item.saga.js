import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* addItem(action) {
    try {
        yield axios.post('/api/shelf', action.payload)
       
    }
    catch (error){
        console.log('item post failed', error);
    }
}

function* getItem() {
    try {
        const getResponse = yield axios.get('/api/shelf',)
        yield put({ type: 'SET_ITEM', payload: getResponse.data})
    }
    catch (error){
        console.log('item GET failed', error);
    }
}

function* itemSaga() {
  yield takeEvery("ADD_ITEM", addItem);
  yield takeEvery("GET_ITEM", getItem);
}


export default itemSaga;
