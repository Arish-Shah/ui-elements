const URL = 'https://keep-react.firebaseio.com/notes';

export default {
  async get() {
    const response = await fetch(URL + '.json');
    const json = await response.json();
    return json;
  },
  async put(id, data) {
    const response = await fetch(`${URL}/${id}.json`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    const json = await response.json();
    console.log(json);
  },
  async delete(id) {
    const response = await fetch(`${URL}/${id}.json`, {
      method: 'DELETE'
    });
    const json = await response.json();
    console.log(json);
  }
};
