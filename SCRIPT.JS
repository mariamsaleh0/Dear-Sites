// Toggle category menu
const menuIcon = document.getElementById('menuBtn');
const categoryMenu = document.getElementById('menu');

menuIcon.addEventListener('click', () => {
  categoryMenu.classList.toggle('hidden');
});

// Handle comment submission
const form = document.getElementById('commentForm');
const statusMessage = document.getElementById('statusMessage');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const comment = document.getElementById('comment').value.trim();

  try {
    const response = await fetch('http://localhost:5000/comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, comment })
    });

    const result = await response.json();
    statusMessage.textContent = result.message;

    if (response.ok) {
      form.reset();
      statusMessage.style.color = 'green';
    } else {
      statusMessage.style.color = 'red';
    }
  } catch (err) {
    console.error('Error submitting comment:', err);
    statusMessage.textContent = 'Something went wrong.';
    statusMessage.style.color = 'red';
  }
});

function tryTemplate(type) {
    alert(`Opening the ${type} template demo...`);
  
    // Later this can redirect to a demo page
    // Example: window.location.href = `/templates/${type}.html`;
  }