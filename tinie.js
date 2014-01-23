var Tinie = function(){
  var self = this;
  self.increment = 1;

  self.getPosts = function(i){
    url = "posts/" + i + ".html";
    $.ajax({
      url: url, 
      type: "GET",
      success:function(data){
        $('#posts').append($("<div class='post'>"+data+"</div>"));
        self.increment++;
        self.getPosts(self.increment);
      },
      error:function(data){
        self.setupHistoryClicks;
      }
    });
  };

  self.getPost = function(i){
    url = "posts/" + i + ".html";
    $.ajax({
      url: url, 
      type: "GET",
      success:function(data){
        $('#post').html(data);
        $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
      }
    });
  };


  self.params = function(key){
    parameters = window.location.hash.substring(2).split('/');
    if(parameters[0] == key){
      return parameters[1];
    }else{
      return false;
    }
  };

  self.handleRoute = function(post_id){
    if(post_id){
      $('.readingarea').append("<div id='post'></div>")
      $('#posts').remove();
      self.getPost(post_id);
    }else{
      $('.readingarea').append("<div id='posts'></div>")
      $('#post').remove();
      self.increment = 1;
      self.getPosts(1);
    }
  }

  self.setupHistoryClicks = function(){
    $('h2 a').each(function(){
      self.addClicker(this);
    })
  }

  self.addClicker = function(link) {
    link.addEventListener("click", function(e) {
      self.getPost(window.location.hash.substring(2).split('/')[1]);
      history.pushState(null, null, link.href);
      e.preventDefault();
    }, false);
  }
}


$(document).ready(function(){
  window.addEventListener("popstate", function(e) {
    blog = new Tinie();
    blog.handleRoute(blog.params('posts'));
  });
});
