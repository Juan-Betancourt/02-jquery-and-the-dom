'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// PUT YOUR RESPONSE HERE - The name is capitalized because it is a constructor; however, JavaScript does not care whether you do this or not, but it is conventional in order to distinguish constructors. this refers to the instance of what will be pulled from and turn into an object. rawDataObj is reference to rawData and the parameters. 

function Article(rawDataObj) {
    // TODO: Use the JS object that is passed in to complete this constructor function:
    // Save ALL the properties of `rawDataObj` into `this`
    this.title = rawDataObj.title;
    this.category = rawDataObj.category;
    this.author = rawDataObj.author;
    this.authorUrl = rawDataObj.authorUrl;
    this.publishedOn = rawDataObj.publishedOn;
    this.body = rawDataObj.body;
}

Article.prototype.toHtml = function() {
    // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
    // PUT YOUR RESPONSE HERE - Cloning allows you to make a copy of the selected elements and all their descendants. Furthermore, you could copy an entire set of event handlers.

    let $newArticle = $('article.template').clone();
    /* TODO: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */

    if (!this.publishedOn) $newArticle.addClass('draft');

    $newArticle.attr('data-category', this.category);

    /* TODO: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
        We need to fill in:
          1. author name,
          2. author url,
          3. article title,
          4. article body, and
          5. publication date. */
    $newArticle.find('h1').html(this.title);
    $newArticle.find('a').html(this.author);
    $newArticle.find('a').attr('href', 'this.authorUrl');
    $newArticle.find('time').html(this.publishedOn);
    $newArticle.find('.article-body').html(this.body);
    $newArticle.removeClass('template');
    // REVIEW: Display the date as a relative number of 'days ago'
    $newArticle.find('time').html('about ' + Math.floor((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000) + ' days ago');
    $newArticle.append('<hr>');
    return $newArticle;
};

rawData.sort(function(a, b) {
    // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODO: Refactor these for loops using the .forEach() array method.

for (let i = 0; i < rawData.length; i++) {
    articles.push(new Article(rawData[i]));
}

for (let i = 0; i < articles.length; i++) {

    // REVIEW: below code will hang until TODO about cloned article is handled
    // Once that TODO is done uncomment code

    $('#articles').append(articles[i].toHtml());

    // COMMENT: (STRETCH) Can you figure out why code hangs?
    // It has to do with the clone() method
}