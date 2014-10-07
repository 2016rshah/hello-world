Router.map(function(){
    this.route('hello');
    this.route('share');
    this.route('about');
    this.route('animations');
    this.route('animation1', {path: '/animations/animation1'});
    this.route('animation2', {path: '/animations/animation2'});
    this.route('animation3', {path: '/animations/animation3'});
    this.route('home', {path: '/'} );
    console.log(document.URL);
    
    
    this.route('404', {
       path: '/*',
       template: 'pageNotFound',
       onBeforeAction: function(){
          console.log('not found');
       }
    });
});