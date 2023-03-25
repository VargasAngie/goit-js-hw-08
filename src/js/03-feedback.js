import throttle from 'lodash.throttle';

const input = document.querySelector('input');
const textarea = document.querySelector('textarea');
const form = document.querySelector('form');

function handleInput(evt) {
  evt.preventDefault();

  if (evt.target.tagName === 'INPUT') {
    input.value = evt.target.value;
  }
  if (evt.target.tagName === 'TEXTAREA') {
    textarea.value = evt.target.value;
  }

  const savedForm = {
    email: input.value,
    message: textarea.value,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(savedForm));
}

form.addEventListener('input', throttle(handleInput, 500));

const stringForm = localStorage.getItem('feedback-form-state');
const parseForm = JSON.parse(stringForm);

if (parseForm) {
  input.value = parseForm.email;
  textarea.value = parseForm.message;
}

const handleSubmit = event => {
  event.preventDefault();
  console.log(`Email: ${input.value}, Message: ${textarea.value}`);
  event.currentTarget.reset();
  localStorage.clear();
};

form.addEventListener('submit', handleSubmit);
