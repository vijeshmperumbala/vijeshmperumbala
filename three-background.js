// Three.js Background Animation with Python theme
let scene, camera, renderer, particles;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// Python theme colors
const pythonBlue = new THREE.Color('#306998');
const pythonYellow = new THREE.Color('#FFD43B');
const pythonLightBlue = new THREE.Color('#4B8BBE');

// Initialize Three.js scene
function init() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 1000;
    
    // Create particle system for background
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1500;
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    // Create particles with positions and colors
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Position
        positions[i3] = (Math.random() - 0.5) * 2000;
        positions[i3 + 1] = (Math.random() - 0.5) * 2000;
        positions[i3 + 2] = (Math.random() - 0.5) * 2000;
        
        // Color - use Python colors
        const colorChoice = Math.random();
        let color;
        
        if (colorChoice < 0.5) {
            color = pythonBlue;
        } else if (colorChoice < 0.8) {
            color = pythonLightBlue;
        } else {
            color = pythonYellow;
        }
        
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
        
        // Size - varied for depth effect
        sizes[i] = Math.random() * 5 + 1;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Custom shader material for better looking particles
    const particlesMaterial = new THREE.ShaderMaterial({
        uniforms: {
            pointTexture: { value: new THREE.TextureLoader().load('data:image/png;base64,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') }
        },
        vertexShader: `
            attribute float size;
            varying vec3 vColor;
            void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            uniform sampler2D pointTexture;
            varying vec3 vColor;
            void main() {
                gl_FragColor = vec4(vColor, 1.0) * texture2D(pointTexture, gl_PointCoord);
                if (gl_FragColor.a < 0.3) discard;
            }
        `,
        transparent: true,
        depthWrite: false,
        vertexColors: true
    });
    
    // Create particle system
    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Add Python logo geometry
    createPythonLogo();
    
    // Add code fragments
    createCodeFragments();
    
    // Setup renderer
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    
    // Add canvas to the DOM
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    // Event listeners
    document.addEventListener('mousemove', onDocumentMouseMove);
    window.addEventListener('resize', onWindowResize);
}

// Create Python logo
function createPythonLogo() {
    // This would be a stylized 3D Python logo
    // For simplicity, we'll just create a basic shape with Python colors
    
    // Create blue snake part
    const blueGeometry = new THREE.TorusKnotGeometry(50, 10, 100, 16);
    const blueMaterial = new THREE.MeshBasicMaterial({ 
        color: pythonBlue,
        transparent: true,
        opacity: 0.7,
        wireframe: true
    });
    const bluePart = new THREE.Mesh(blueGeometry, blueMaterial);
    bluePart.position.set(-300, 200, -500);
    scene.add(bluePart);
    
    // Create yellow snake part
    const yellowGeometry = new THREE.TorusKnotGeometry(50, 10, 100, 16);
    const yellowMaterial = new THREE.MeshBasicMaterial({ 
        color: pythonYellow,
        transparent: true,
        opacity: 0.7,
        wireframe: true
    });
    const yellowPart = new THREE.Mesh(yellowGeometry, yellowMaterial);
    yellowPart.position.set(300, -200, -500);
    scene.add(yellowPart);
    
    // Animation for the parts
    function animatePythonLogo() {
        bluePart.rotation.x += 0.01;
        bluePart.rotation.y += 0.01;
        yellowPart.rotation.x += 0.01;
        yellowPart.rotation.y += 0.01;
        
        requestAnimationFrame(animatePythonLogo);
    }
    
    animatePythonLogo();
}

// Create floating code fragments
function createCodeFragments() {
    const codeFragments = [
        'def hello_world():',
        '    print("Hello, World!")',
        'class Python:',
        '    def __init__(self):',
        '        self.awesome = True',
        'import django',
        'from flask import Flask',
        'if __name__ == "__main__":',
        '    app.run(debug=True)'
    ];
    
    const codeGroup = new THREE.Group();
    scene.add(codeGroup);
    
    // Helper function to create text mesh
    function createTextMesh(text, position) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 512;
        canvas.height = 128;
        
        // Draw text to canvas
        context.fillStyle = 'rgba(48, 105, 152, 0.8)';
        context.font = 'Bold 40px Courier New';
        context.fillText(text, 10, 50);
        
        // Create texture from canvas
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        
        // Create material and geometry
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide
        });
        
        const geometry = new THREE.PlaneGeometry(canvas.width / 4, canvas.height / 4);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(position.x, position.y, position.z);
        
        return mesh;
    }
    
    // Create and position text fragments
    codeFragments.forEach((fragment, index) => {
        const x = (Math.random() - 0.5) * 1000;
        const y = (Math.random() - 0.5) * 1000;
        const z = (Math.random() - 0.5) * 1000;
        
        const textMesh = createTextMesh(fragment, { x, y, z });
        codeGroup.add(textMesh);
        
        // Give each fragment a random rotation and movement pattern
        textMesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            },
            movementSpeed: {
                x: (Math.random() - 0.5) * 0.5,
                y: (Math.random() - 0.5) * 0.5,
                z: (Math.random() - 0.5) * 0.5
            }
        };
    });
    
    // Animation function for code fragments
    function animateCodeFragments() {
        codeGroup.children.forEach(fragment => {
            // Rotate
            fragment.rotation.x += fragment.userData.rotationSpeed.x;
            fragment.rotation.y += fragment.userData.rotationSpeed.y;
            fragment.rotation.z += fragment.userData.rotationSpeed.z;
            
            // Move
            fragment.position.x += fragment.userData.movementSpeed.x;
            fragment.position.y += fragment.userData.movementSpeed.y;
            fragment.position.z += fragment.userData.movementSpeed.z;
            
            // Boundary check
            const boundary = 1000;
            if (Math.abs(fragment.position.x) > boundary) fragment.userData.movementSpeed.x *= -1;
            if (Math.abs(fragment.position.y) > boundary) fragment.userData.movementSpeed.y *= -1;
            if (Math.abs(fragment.position.z) > boundary) fragment.userData.movementSpeed.z *= -1;
        });
        
        requestAnimationFrame(animateCodeFragments);
    }
    
    animateCodeFragments();
}

// Mouse move event handler
function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.05;
    mouseY = (event.clientY - windowHalfY) * 0.05;
}

// Window resize event handler
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    render();
}

// Render the scene
function render() {
    // Rotate particles based on mouse position
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    // Rotate particles slowly for ambient movement
    particles.rotation.x += 0.0008;
    particles.rotation.y += 0.001;
    
    renderer.render(scene, camera);
}

// Initialize particles.js background
document.addEventListener('DOMContentLoaded', function() {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 50,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#306998", "#FFD43B", "#4B8BBE"]
            },
            "shape": {
                "type": ["circle", "triangle"],
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 5,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#306998",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
});

// Initialize code rain effect
function setupCodeRain() {
    const codeRainContainer = document.querySelector('.code-rain');
    
    if (!codeRainContainer) return;
    
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]()=<>+-*/%.,:;_|\\~`^#';
    const pythonKeywords = ['def', 'class', 'import', 'from', 'return', 'if', 'else', 'elif', 'for', 'while', 'try', 'except', 'finally', 'with', 'as', 'lambda', 'self', '__init__', 'print', 'True', 'False', 'None'];
    
    // Create columns of falling characters
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'code-column';
        column.style.left = `${i * 20}px`;
        column.style.animationDelay = `${Math.random() * 10}s`;
        
        // Randomly choose to display a Python keyword or random characters
        if (Math.random() < 0.3) { // 30% chance for a keyword
            const keyword = pythonKeywords[Math.floor(Math.random() * pythonKeywords.length)];
            column.textContent = keyword;
            column.classList.add('keyword');
        } else {
            // Random characters
            const length = 5 + Math.floor(Math.random() * 15);
            for (let j = 0; j < length; j++) {
                const span = document.createElement('span');
                span.textContent = characters[Math.floor(Math.random() * characters.length)];
                span.style.animationDelay = `${j * 0.1}s`;
                column.appendChild(span);
            }
        }
        
        codeRainContainer.appendChild(column);
    }
    
    // Add style for the code rain
    const style = document.createElement('style');
    style.textContent = `
        .code-column {
            position: absolute;
            top: -100px;
            font-family: 'Fira Code', monospace;
            font-size: 14px;
            color: rgba(48, 105, 152, 0.7);
            text-shadow: 0 0 5px rgba(48, 105, 152, 0.5);
            animation: rain linear infinite;
            animation-duration: calc(15s + (var(--index) * 2s));
            opacity: 0.8;
        }
        
        .code-column.keyword {
            color: rgba(255, 212, 59, 0.9);
            text-shadow: 0 0 5px rgba(255, 212, 59, 0.7);
        }
        
        .code-column span {
            display: block;
            animation: flicker 2s infinite alternate;
        }
        
        @keyframes rain {
            0% {
                transform: translateY(-100px);
                opacity: 0;
            }
            10% {
                opacity: 0.8;
            }
            90% {
                opacity: 0.8;
            }
            100% {
                transform: translateY(calc(100vh + 100px));
                opacity: 0;
            }
        }
        
        @keyframes flicker {
            0%, 100% {
                opacity: 0.8;
            }
            50% {
                opacity: 0.4;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add GSAP animations for smooth transitions
document.addEventListener('DOMContentLoaded', () => {
    // Animate hero section elements on load
    gsap.to('.animate-text', { 
        opacity: 1, 
        y: 0, 
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        onComplete: () => {
            document.querySelectorAll('.animate-text').forEach(el => {
                el.classList.add('active');
            });
        }
    });
    
    gsap.to('.animate-fade', { 
        opacity: 1, 
        duration: 1.5,
        delay: 0.8,
        ease: 'power2.out',
        onComplete: () => {
            document.querySelectorAll('.animate-fade').forEach(el => {
                el.classList.add('active');
            });
        }
    });
    
    // Scroll trigger animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Timeline items
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.from(item, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleClass: { targets: item, className: 'animate' },
                once: true
            }
        });
    });
    
    // Project cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.2,
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleClass: { targets: card, className: 'animate' },
                once: true
            }
        });
    });
    
    // Skill categories
    gsap.utils.toArray('.skill-category').forEach((skill, i) => {
        gsap.from(skill, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.2,
            scrollTrigger: {
                trigger: skill,
                start: 'top 80%',
                toggleClass: { targets: skill, className: 'animate' },
                once: true
            }
        });
    });
    
    // Skill progress bars
    // gsap.utils.toArray('.skill-progress').forEach((progress) => {
    //     const progressBar = progress.querySelector('.progress');
    //     const width = progressBar.style.width;
        
    //     gsap.set(progressBar, { width: 0 });
        
    //     gsap.to(progressBar, {
    //         width: width,
    //         duration: 1.5,
    //         ease: 'power2.out',
    //         scrollTrigger: {
    //             trigger: progress,
    //             start: 'top 80%',
    //             once: true
    //         }
    //     });
    // });
    
    // Setup code rain effect
    setupCodeRain();
});

// Initialize and animate Three.js background
init();
animate();