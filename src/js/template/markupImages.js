export const markupImages = items =>
  items
    .map(
      ({
        id,
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="photo-card"  data-id="${id}">
  <a class="photo-card" href="${largeImageURL}">
    <img
      src="${webformatURL}"
      alt="${tags}"
      class="photo-car__img"
      loading="lazy"
    />
    <div class="info">
      <p class="info-item"><b>Likes</b>${likes}</p>
      <p class="info-item"><b>Views</b>${views}</p>
      <p class="info-item"><b>Comments</b>${comments}</p>
      <p class="info-item"><b>Downloads</b>${downloads}</p>
    </div></a
  >
</li>
`
    )
    .join('');
