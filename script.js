const newsContainer = document.querySelector(".news-container");
const form = document.querySelector("form");
const apiKey = "pub_14728d068fdb21a61ce36a1e748368a7c73b1";
let newsSearchInput = document.querySelector("form input");
let query = "latest news";

async function fetchNews(myQuery) {
  const response = await fetch(
    `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${myQuery}`
  );
  const responseJSON = await response.json();
  return responseJSON;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  query = newsSearchInput.value;
  fetchNews(query);
  newsContainer.innerHTML = "";
  newsSearchInput.value = "";
  populateNews();
});

function populateNews() {
  const newsData = fetchNews(query);
  newsData.then((news) => {
    const newsArray = news.results;

    newsArray.forEach((element) => {
      let newsCardHTML;
      if (element.image_url == null) {
        newsCardHTML = `
        <div class="news-card">
            <img src="https://media.istockphoto.com/id/1182477852/photo/breaking-news-world-news-with-map-backgorund.jpg?s=612x612&w=0&k=20&c=SQfmzF39HZJ_AqFGosVGKT9iGOdtS7ddhfj0EUl0Tkc=" alt="">
            <h3 class="heading"><a target='_blank' href="${element.link}">${element.title}</a></h3>
        </div>
        `;
      } else {
        newsCardHTML = `
        <div class="news-card">
            <img src="${element.image_url}" alt="">
            <h3 class="heading"><a target='_blank' href="${element.link}">${element.title}</a></h3>
        </div>
        `;
      }

      newsContainer.innerHTML += newsCardHTML;
    });
  });
}

populateNews();
