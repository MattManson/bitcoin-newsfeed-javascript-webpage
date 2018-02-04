var articles = [];


var makeRequest = function(url, callback){
    request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', callback);
    request.send();
}

var populateList = function(articles){
    console.log(articles);
    var ul = document.querySelector('#article-list');

    articles.forEach(function(article){
        var title = document.createElement('li');
        title.innerText = article.title;
        var author = document.createElement('li');
        author.innerText = article.author;
        ul.appendChild(title);
        ul.appendChild(author);
    });
}

var requestComplete = function(){
    if(this.status !== 200)return;
    var jsonString = this.responseText;
    articles = JSON.parse(jsonString);
    populateList(articles.articles);
    save(articles);
}

var save = function(articles) {
    var storedArticles = JSON.stringify(articles)
    localStorage.setItem('articles', storedArticles);
}


var app = function(){
    var url = "https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&apiKey=9d2d16c007944058a8f7ff55200ecad9";
    makeRequest(url, requestComplete);

}

window.addEventListener('load', app);