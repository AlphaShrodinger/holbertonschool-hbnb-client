/* 
  This is a SAMPLE FILE to get you started.
  Please, follow the project instructions to complete the tasks.
*/

document.addEventListener('DOMContentLoaded', () => {
  const token = getCookie('token');
  const reviewForm = document.getElementById('review-form');

  if (!token) {
    window.location.href = 'index.html';
    return;
  }

  if (reviewForm) {
    reviewForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const place = document.getElementById('place').value;
      const reviewText = document.getElementById('review').value;

      try {
        const response = await submitReview(token, place, reviewText);
        handleResponse(response, reviewForm);
      } catch (error) {
        alert('An error occurred: ' + error.message);
      }
    });
  }
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(';').shift() : null;
}

async function submitReview(token, place, reviewText) {
  const endpoint = `http://127.0.0.1:5000/places/reviews`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ place, reviewText })
    });

    return response;
  } catch (error) {
    console.error('Error occurred while submitting review:', error.message);
    throw error;
  }
}

function handleResponse(response, form) {
  if (response.ok) {
    alert('Review submitted successfully!');
    form.reset();
  } else {
    response.json().then(errorData => {
      alert('Failed to submit review: ' + (errorDa
