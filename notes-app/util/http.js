const URL = 'https://keep-react.firebaseio.com/notes';
const wcRoot = document.querySelector('wc-root');

export default {
  async get() {
    const response = await fetch(`${URL}.json`);
    const json = await response.json();
    return json;
  },
  async post(val) {
    const note = { ...val, timestamp: new Date().valueOf() };
    const wcNote = document.createElement('wc-note');
    wcNote.props = { ...note, id: 'temp-note' };
    document.querySelector('wc-notes').addNote(wcNote);

    const response = await fetch(`${URL}.json`, {
      method: 'POST',
      body: JSON.stringify(note)
    });
    const json = await response.json();
    wcNote.id = json.name;
    wcNote.props = {
      ...note,
      id: json.name
    };
  },
  put(id, val) {
    if (val.title.trim() === '' && val.content.trim() === '') {
      this.delete(id);
      return;
    }
    fetch(`${URL}/${id}.json`, {
      method: 'PUT',
      body: JSON.stringify(val)
    });
    const noteEl = wcRoot.querySelector(`#${id}`);
    noteEl.props = val;
    noteEl.parentElement.updateMasonry();
  },
  delete(id) {
    const noteEl = wcRoot.querySelector(`#${id}`);
    noteEl.parentElement.removeNote(noteEl);
    fetch(`${URL}/${id}.json`, {
      method: 'DELETE'
    });
  }
};
