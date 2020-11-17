import data from './data.js';

const URL = 'https://keep-react.firebaseio.com/notes';

export default {
  async get() {
    const response = await fetch(`${URL}.json`);
    const json = await response.json();
    return json;
  },
  post() {},
  async put(id, val) {
    const response = await fetch(`${URL}/${id}.json`, {
      method: 'PUT',
      body: JSON.stringify(val)
    });
    const json = await response.json();
    console.log(json);
  },
  delete(id) {}
};
