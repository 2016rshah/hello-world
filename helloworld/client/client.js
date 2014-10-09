if (Meteor.isClient) {
    Session.set("currentInput", "empty");
    Session.set("currentInput4", "empty");
    UI.registerHelper("currentURL", function(){
        var s = window.location.pathname;
        //current url path 
        return s;
    });
    Template.mobile.rendered = function() {
        var index = navigator.appVersion.indexOf("Mobile");
        if (index > -1) {
            $('body > :not(#mobile)').hide(); //hide all nodes directly under the body
            $('#mobile').append('<div class = "line"></div><h1>Mobile</h1><div class = "line"></div><p>Sorry but mobile browsers are currently not supported.</p>');
        } else {
            //non-mobile code
        }
    };
    Template.animations.events({
        'click #animationRandomizer': function() {
            var temp = Math.floor(Math.random() * 4 + 1);
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
        'click #ab3': function() {
            window.location.replace("/animations/animation3");
        },
        'click #ab4': function(){
            window.location.replace("/animations/animation4");
        }
    });
    Template.animation1.rendered = function() {
        console.log("Template rendered");
        var scene = new THREE.Scene();
        var WIDTH = window.innerWidth / 2;
        var HEIGHT = 500;
        var camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(WIDTH, HEIGHT);
        $("#actualAnimation1").append(renderer.domElement);
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });
        cube = new THREE.Mesh(geometry, material);
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
    Template.animation2.rendered = function() {
        var container;
        var camera, scene, renderer;
        var particleMaterial;
        var count;
        var CAMZ = 100;
        var WIDTH = window.innerWidth / 2;
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
        'click #startAnimation3': function() {
            var type = $("#trigInput").val();
            Session.set("currentInput", type);
            console.log(type);
            $("#startAnimation3").hide();
            $("#trigInput").hide();
            if (type === "sin" || type === "cos" || type === "tan" || type === "cot" || type === "csc" || type === "sec") {
                $("#goodInput").show();
                var container;
                var camera, scene, renderer;
                var particleMaterial;
                var count;
                var CAMZ = 125;
                var WIDTH = window.innerWidth / 2;
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
                    var initialParticle = new THREE.Particle(particleMaterial.clone());
                    initialParticle.position.x = -11;
                    initialParticle.position.y = 0;
                    initialParticle.position.z = 0;
                    scene.add(initialParticle);
                    particles.push(initialParticle);
                    for (var i = -10; i < 10; i++) {
                        var tempParticle = new THREE.Particle(particleMaterial.clone());
                        tempParticle.position.x = i;
                        tempParticle.position.y = 0;
                        tempParticle.position.z = 0;
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
                    for (var i = 0; i < particles.length; i++) {
                        if (particles[i].position.x < 100) {
                            particles[i].position.x++;
                            var color = particles[i].material.color.getHSL();
                            particles[i].material.color.setHSL(particles[i].position.x / 100, 1, .5);
                        } else {
                            particles[i].position.x = -100;
                        }
                        if (type == "cos")
                            particles[i].position.y = 10 * (1 * (Math.cos((particles[i].position.x) / 15)));
                        else if (type == "sin")
                            particles[i].position.y = 10 * (1 * (Math.sin((particles[i].position.x) / 15)));
                        else if (type == "tan")
                            particles[i].position.y = 10 * (1 * (Math.tan((particles[i].position.x) / 15)));
                        else if (type == "cot")
                            particles[i].position.y = 10 * (1 / (Math.tan((particles[i].position.x) / 15)));
                        else if (type == "csc")
                            particles[i].position.y = 10 * (1 / (Math.sin((particles[i].position.x) / 15)));
                        else if (type == "sec")
                            particles[i].position.y = 10 * (1 / (Math.cos((particles[i].position.x) / 15)));
                        else
                            particles[i].position.y = 10 * (1 / (Math.cos((particles[i].position.x) / 15)));
                    }
                    camera.lookAt(scene.position);
                    renderer.render(scene, camera);
                    count++;
                }
            } else {
                $("#badInput").show();
            }
        }
    });
    Template.animation4.events({
       'click #startAnimation4': function() {
            console.log(Session.get("currentInput4"));
            $("#startAnimation4").hide();
            if (Session.get("currentInput4") === "cos" || Session.get("currentInput4") === "cot" || Session.get("currentInput4") === "csc" || Session.get("currentInput4") === "sec") {
                $("#goodInput4").show();
                $("#message4").hide();
                var container;
                var camera, scene, renderer;
                var particleMaterial;
                var count;
                var CAMZ = 125;
                var WIDTH = window.innerWidth / 2;
                var HEIGHT = 500;

                init();
                animate();

                function init() {
                    container = document.createElement('div');
                    $("#actualAnimation4").append(container);

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
                    var initialParticle = new THREE.Particle(particleMaterial.clone());
                    initialParticle.position.x = -11;
                    initialParticle.position.y = 0;
                    initialParticle.position.z = 0;
                    scene.add(initialParticle);
                    particles.push(initialParticle);
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
                        particles[index].position.x += 1;
                        if (particles[index].position.x > 100) {
                            particles[index].position.x = -100;
                        }
                        if(Session.get("currentInput4") == "csc"){
                            particles[index].position.y = 10 * (1 / (Math.sin((particles[index].position.x) / 15)));
                        }
                        else if(Session.get("currentInput4") == "sec"){
                            particles[index].position.y = 10 * (1 / (Math.cos((particles[index].position.x) / 15)));
                        }
                        else if(Session.get("currentInput4") == "cot"){
                            particles[index].position.y = 10 * (1 / (Math.tan((particles[index].position.x) / 15)));
                        }
                        else if(Session.get("currentInput4") == "cos"){
                            particles[index].position.y = 10 * (1 * (Math.cos((particles[index].position.x) / 15)));
                        }
                        else{
                            particles[index].position.y = 10 * (1 * (Math.cos((particles[index].position.x) / 15)));
                        }
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
            } 
            else {
                $("#badInput4").show();
            }
        },
        'keydown #trigInput4': function(e){
            if(e.which === 13){
                if(Session.get("currentInput4") == "empty"){
                    Session.set("currentInput4", $("#trigInput4").val());
                    $("#startAnimation4").click();
                }
                else{
                    if(goodInput4($("#trigInput4").val())){
                        $("#goodInput4").show();
                        $("#badInput4").hide();
                    }
                    else{
                        $("#badInput4").show();
                        $("#goodInput4").hide();
                    }
                    Session.set("currentInput4", $("#trigInput4").val());
                }
            }
        }
    });
    Template.animation4.currentInput = function() {
        return Session.get("currentInput4");
    };
    function goodInput4(s){
        return (s=="cos" || s=="sec" || s == "csc" || s == "cot");
    }
    
}