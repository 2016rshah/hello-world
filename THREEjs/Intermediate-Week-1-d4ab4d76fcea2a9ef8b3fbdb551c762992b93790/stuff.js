			var container;
			var camera, scene, renderer, controls;
			var mouseX, mouseY;
			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;
			var particleMaterial; 
			var count;
			var ASPECT = window.innerWidth/window.innerHeight;
			var CAMZ = 100;
			
			init();
			animate();

			function init(){
				container = document.createElement('div');
				document.body.appendChild(container);

				camera = new THREE.PerspectiveCamera( 45, ASPECT, 1, 1000 );
				camera.position.z = CAMZ;
				scene = new THREE.Scene();

				controls = new THREE.TrackballControls(camera);
				count = 0;
				var PI2 = Math.PI * 2;

				particleMaterial = new THREE.ParticleCanvasMaterial({
					color: 0x66FF66,
					program: function(context){
						context.beginPath();
						context.arc(0, 0, 1, 0, PI2, true);
						context.fill();
					}
				});
				particles = [];

				for(var i = -100; i<100; i++){
					var tempParticle = new THREE.Particle(particleMaterial.clone());
					tempParticle.position.x = Math.random()*200-100;
					tempParticle.position.y = Math.random()*200-100;
					tempParticle.position.z = Math.random()*(200)-CAMZ;
					scene.add(tempParticle);
					particles.push(tempParticle);
				}

				renderer = new THREE.CanvasRenderer();
				renderer.setSize(window.innerWidth, window.innerHeight);

				container.appendChild(renderer.domElement);
				document.addEventListener('mousemove', onDocumentMouseMove, false);
				window.addEventListener('resize', onWindowResize, false);
			}

			function animate(){
				requestAnimationFrame(animate);
				render();
			}

			function render(){
				for(var index in particles){
					particles[index].material.color = new THREE.Color().setHSL((count/100)%1, 0.5, 0.5);
					particles[index].position.z+=1;
					if(particles[index].position.z>CAMZ){
						particles[index].position.z = 0;
					}
				}

				// renderer.setClearColor(
				// 	particles[0].material.color.clone().offsetHSL(0.5, 0, 0)
				// );
 
				camera.lookAt(scene.position);
				
				controls.update();
				renderer.render(scene, camera);
      			count++;
			}
