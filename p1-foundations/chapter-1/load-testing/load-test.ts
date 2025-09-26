import http from 'k6/http';
import { check, sleep } from 'k6';

const url = 'http://localhost:3000/notes';

const ids = [];

// Función para generar texto aleatorio tipo Lorem Ipsum
const randomText = () => {
  const words = [
    'lorem',
    'ipsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'sed',
    'do',
    'eiusmod',
    'tempor',
    'incididunt',
    'ut',
    'labore',
    'et',
    'dolore',
    'magna',
    'aliqua',
  ];
  let sentence = [];
  for (
    let i = 0;
    i < 5 + Math.floor(Math.random() * 10);
    i++
  ) {
    sentence.push(
      words[Math.floor(Math.random() * words.length)]
    );
  }
  return sentence.join(' ');
};

const getNotes = () => {
  const res = http.get(url);
  check(res, {
    'GET status is 200': (r) => r.status === 200,
  });
};

const getOneNote = () => {
  const id = ids[Math.floor(Math.random() * ids.length)];
  const res = http.get(`${url}/${id}`);
  check(res, {
    'GET one status is 200': (r) => r.status === 200,
  });
};

const createNote = () => {
  const payload = JSON.stringify({
    content: randomText(),
  });
  const res = http.post(url, payload, {
    headers: { 'Content-Type': 'application/json' },
  });
  check(res, {
    'POST status is 201': (r) => r.status === 201,
  });

  if (res.status === 201) {
    const note = res.json();
    ids.push(note.id);
  }
};

const updateNote = () => {
  const id = ids[Math.floor(Math.random() * ids.length)];
  const payload = JSON.stringify({
    content: randomText(),
  });
  const res = http.put(`${url}/${id}`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });
  check(res, {
    'PUT status is 200': (r) => r.status === 200,
  });
};

const deleteNote = () => {
  const id = ids[Math.floor(Math.random() * ids.length)];
  const res = http.del(`${url}/${id}`);
  check(res, {
    'DELETE status is 204': (r) => r.status === 204,
  });
  if (res.status === 204) {
    const index = ids.indexOf(id);
    if (index > -1) {
      ids.splice(index, 1);
    }
  }
};

export const options = {
  vus: 100,
  duration: '120s',
};

export default function () {
  const actions = [
    'CREATE',
    'READ',
    'READ_ONE',
    'UPDATE',
    'DELETE',
  ];
  const action =
    actions[Math.floor(Math.random() * actions.length)];

  if (action === 'CREATE') createNote();
  else if (action === 'READ') getNotes();
  else if (action === 'READ_ONE' && ids.length > 0)
    getOneNote();
  else if (action === 'UPDATE' && ids.length > 0)
    updateNote();
  else if (action === 'DELETE' && ids.length > 0)
    deleteNote();
  else {
    createNote();
  }

  sleep(1);
}
