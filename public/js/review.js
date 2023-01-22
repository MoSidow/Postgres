const newReviewHandler = async (event) => {
    event.preventDefault();

    const reviewName = document.querySelector('#review-name').value.trim();
    const reviewComment = document.querySelector('#review-comment').value.trim();
    const reviewRating = document.querySelector('#review-rating').value.trim();

    if(reviewName && reviewComment && reviewRating){
        const response = await fetch(`/api/review`, {
            method: 'POST',
            body: JSON.stringify({
                name: reviewName, 
                comment: reviewComment,
                rating: reviewRating}),
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if (response.ok){
            document.location.replace('/profile')
        } else{
            alert('Failed to create a review')
        }
    }
}

document
    .querySelector('.new-review-form')
    .addEventListener('submit', newReviewHandler)