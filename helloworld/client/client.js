if (Meteor.isClient) {
    Template.animations.events({
        'click #animationRandomizer': function() {
            var temp = Math.floor(Math.random() * 3 + 1);
            var s = "/animations/animation" + temp;
            window.location.replace(s);
        }
    });
    Template.animationButtons.events({
        'click #ab1': function() {
            window.location.replace("/animations/animation1");
        },
        'click #ab2': function() {
            window.location.replace("/animations/animation2");
        },
        'click #ab3': function(){
           window.location.replace("/animations/animation3");
        }
    });
    Template.animation1.rendered = function(){
      console.log("Template rendered");
      var scene = new THREE.Scene();
      var WIDTH = 1000;
      var HEIGHT = 500;
      var camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(WIDTH, HEIGHT);
      $("#actualAnimation1").append(renderer.domElement);
      var geometry = new THREE.BoxGeometry(1, 1, 1);
      var material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
      });
      var cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      
      camera.position.z = 5;
      
      var render = function() {
        requestAnimationFrame(render);
      
        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;
      
        renderer.render(scene, camera);
      };
      
      render();
    };
    Template.animation2.rendered = function(){
            var container;
            var camera, scene, renderer;
            var particleMaterial;
            var count;
            var CAMZ = 100;
            var WIDTH = 1000;
            var HEIGHT = 500;

            init();
            animate();

            function init() {
                container = document.createElement('div');
                $("#actualAnimation2").append(container);

                camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);
                camera.position.z = CAMZ;
                scene = new THREE.Scene();
                count = 0;
                var PI2 = Math.PI * 2;

                particleMaterial = new THREE.ParticleCanvasMaterial({
                    color: 0x66FF66,
                    program: function(context) {
                        context.beginPath();
                        context.arc(0, 0, 1, 0, PI2, true);
                        context.fill();
                    }
                });
                particles = [];
                for (var i = 0; i < 250; i++) {
                    var tempParticle = new THREE.Particle(particleMaterial.clone());
                    tempParticle.position.x = Math.random() * 100 - 50;
                    tempParticle.position.y = Math.random() * 100 - 50;
                    tempParticle.position.z = Math.random() * (200) - CAMZ;
                    scene.add(tempParticle);
                    particles.push(tempParticle);
                }


                renderer = new THREE.CanvasRenderer();
                renderer.setSize(WIDTH, HEIGHT);

                container.appendChild(renderer.domElement);
            }

            function animate() {
                requestAnimationFrame(animate);
                render();
            }

            function render() {

                for (var index in particles) {
                    particles[index].material.color = new THREE.Color().setHSL((count / 100) % 1, 0.5, 0.5);
                    particles[index].position.z += 1;
                    if (particles[index].position.z > CAMZ) {
                        particles[index].position.z = 0;
                    }
                }

                renderer.setClearColor(
                    particles[0].material.color.clone().offsetHSL(0.5, 0, 0)
                );

                camera.lookAt(scene.position);
                renderer.render(scene, camera);
                count++;
            }
    };
    Template.animation3.events({
       'click #startAnimation3': function(){
            var type = $("#trigInput").val();
            console.log(type);
            $("#startAnimation3").hide();
            var container;
            var camera, scene, renderer;
            var particleMaterial;
            var count;
            var CAMZ = 125;
            var WIDTH = 1000;
            var HEIGHT = 500;

            init();
            animate();

            function init() {
                container = document.createElement('div');
                $("#actualAnimation3").append(container);

                camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);
                camera.position.z = CAMZ;
                scene = new THREE.Scene();
                count = 0;
                var PI2 = Math.PI * 2;

                particleMaterial = new THREE.ParticleCanvasMaterial({
                    color: 0x66FF66,
                    program: function(context) {
                        context.beginPath();
                        context.arc(0, 0, 1, 0, PI2, true);
                        context.fill();
                    }
                });
                particles = [];
               //  for (var i = 0; i < 250; i++) {
               //     var tempParticle = new THREE.Particle(particleMaterial.clone());
               //     tempParticle.position.x = Math.random() * 100 - 50;
               //     tempParticle.position.y = Math.random() * 100 - 50;
               //     tempParticle.position.z = Math.random() * (200) - CAMZ;
               //     scene.add(tempParticle);
               //     particles.push(tempParticle);
               //  }
               var tempParticle = new THREE.Particle(particleMaterial.clone());
               tempParticle.position.x = 0;
               tempParticle.position.y = 0;
               tempParticle.position.z = 0;
               scene.add(tempParticle);
               particles.push(tempParticle);
               var axes = new THREE.AxisHelper(100);
				scene.add( axes );


                renderer = new THREE.CanvasRenderer();
                renderer.setSize(WIDTH, HEIGHT);
                container.appendChild(renderer.domElement);
            }

            function animate() {
                requestAnimationFrame(animate);
                render();
            }

            function render() {
	                if(particles[0].position.x<100){
	                	particles[0].position.x++;
	                }
	                else{
	                	particles[0].position.x = -100;
	                }
	               if(type == "cos")
	                     particles[0].position.y = 10 * (1*(Math.cos((particles[0].position.x)/15)));
	               else if(type == "sin")
                        particles[0].position.y = 10 * (1*(Math.sin((particles[0].position.x)/15)));
                  else if(type == "tan")
                        particles[0].position.y = 10 * (1*(Math.tan((particles[0].position.x)/15)));
                  else if(type == "cot")
                        particles[0].position.y = 10 * (1/(Math.tan((particles[0].position.x)/15)));
                  else if(type == "csc")
                        particles[0].position.y = 10 * (1/(Math.sin((particles[0].position.x)/15)));
                  else if(type == "sec")
                        particles[0].position.y = 10 * (1/(Math.cos((particles[0].position.x)/15)));
                  else
                        particles[0].position.y = 10 * (1/(Math.cos((particles[0].position.x)/15)));
	                
	                camera.lookAt(scene.position);
	                renderer.render(scene, camera);
                count++;
            }
       }
    });
}