const axios = require("axios");
const $ = require("jquery");
const _ = require("lodash");
const cache = {};
const repeaters = $("[j-repeat]");
const $gets = $("[j-get")
const http = withCache(cache, axios);

// Use double moustache for delimiters
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

repeaters.each(function() {
  const $repeater = $(this);
  const url = $repeater.attr("j-repeat");
  const dataPath = $repeater.attr("j-data-path") || "";
  const $templateElement = $("template", $repeater);
  const templateInterpolator = _.template($templateElement.html());

  $repeater.data("template", templateInterpolator);

  if (!url) throw Error("Repeaters must specify a url.", this);
  if (!$templateElement.length)
    throw Error("Repeaters require a template child.", this);

  http
    .get(url)
    .then(response => {
      return _.get(response, dataPath, []);
    })
    .then(data => {
      $repeater.empty();
      data.map((item, $index) => {
        $repeater.append($repeater.data("template")({ item, $index }));
      });
    })
    .catch(error => {
      console.error(error);
    });
});

$gets.each(function () {
  const $el = $(this)
  const url = $el.attr("j-get")
  const as = $el.attr("j-as")

  $el.on("click", function (e) {
    e.preventDefault()
    http.get(url)
      .then(response => {
        if (as) cache[as] = response
        return response
      })
      .catch(error => console.error(error))
  })
})

function withCache(cache, httpClient) {
  return {
    get: url => {
      if (cache[url]) {
        return Promise.resolve(cache[url]);
      }
      else {
        cache[url] = []
        return httpClient.get(url).then(response => {
          cache[url] = response;
          return response;
        });
      }
    },

    post: (url, data) => {
      delete cache[url];

      return httpClient.post(url, data).then(response => {
        this.get(url);
        return response;
      });
    },

    delete: (url, data) => {
      delete cache[url];

      return httpClient.delete(url, data).then(response => {
        this.get(url);
        return response;
      });
    }
  };
}



// possible way to prvoide app configuration
var config = {
  base: "https://conduit.productionready.io/api",
  resources: {
    articles: {
      url: "/articles"
    },
    article: {
      url: "/articles/:slug",
      updates: ["/articles"]
    },
    tags: {
      url: "/tags"
    },
    comments: {
      url: "/articles/:slug/comments"
    }
  }
};
