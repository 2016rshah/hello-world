if (Meteor.isClient) {

   // counter starts at 0
   Session.setDefault("counter", 0);

   Template.hello.helpers({
     counter: function () {
       return Session.get("counter");
     }
   });

   Template.hello.events({
     'click button': function () {
       // increment the counter when button is clicked
       Session.set("counter", Session.get("counter") + 1);
     }
   });
   
   Template.animations.events({
      'click #animationRandomizer': function(){
         var temp = Math.floor(Math.random()*2+1);
         var s = "/animations/animation"+temp;
         window.location.replace(s);
      }
   });
   Template.animationButtons.events({
      'click #ab1': function(){
         window.location.replace("/animations/animation1");
      },
      'click #ab2': function(){
         window.location.replace("/animations/animation2");
      }
   });
}