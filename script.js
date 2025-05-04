

// Navigation and Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

// Toggle mobile menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.toggle('active'));
    });
}

// Close mobile menu when clicking a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            
            // Reset hamburger animation
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.remove('active'));
        }
    });
});

// Sticky Navbar with Python color transition
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
        // Add gradient background on scroll
        navbar.style.background = 'linear-gradient(90deg, rgba(48, 105, 152, 0.95), rgba(75, 139, 190, 0.95))';
        navbar.style.color = '#fff';
        
        // Change logo and nav links color
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.style.color = '#fff';
        });
        document.querySelector('.logo-text').style.color = '#FFD43B';
    } else {
        navbar.classList.remove('sticky');
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.color = '';
        
        // Reset colors
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.style.color = '';
        });
        document.querySelector('.logo-text').style.color = '';
    }
});

// Smooth scrolling for anchor links with enhanced timing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target.offsetTop - 70,
                    offsetY: 70
                },
                ease: "power3.inOut"
            });
        }
    });
});

// Form Submission with Python-themed animation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Form validation
        if (!name || !email || !subject || !message) {
            // Show error in Python-style
            const terminalText = document.createElement('div');
            terminalText.className = 'terminal-text error';
            terminalText.textContent = '>>> ValueError: All fields must be filled';
            document.querySelector('.terminal-body').insertBefore(terminalText, contactForm);
            
            // Auto-remove after 3 seconds
            setTimeout(() => {
                terminalText.remove();
            }, 3000);
            return;
        }
        
        // Animate form submission - Python style
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Change button text and disable
        submitBtn.innerHTML = '<span class="terminal-prompt">$ </span>submitting...';
        submitBtn.disabled = true;
        
        // Add terminal output lines
        const terminal = document.querySelector('.terminal-body');
        
        const addTerminalLine = (text, delay, className = '') => {
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = `terminal-text ${className}`;
                line.textContent = text;
                terminal.insertBefore(line, submitBtn.parentNode);
            }, delay);
        };
        
        // Show processing animation
        //addTerminalLine('>>> import email_service', 300);
        //addTerminalLine('>>> data = {"name": "' + name + '", "email": "' + email + '", "subject": "' + subject + '", "message": "' + message + '"}', 800);
        //addTerminalLine('>>> response = email_service.send(data)', 1300);
        
        // Send email
        sendEmail(name, email, subject, message)
            .then(result => {
                if (result.success) {
                    //addTerminalLine('>>> Response: 200 OK', 1800);
                    //addTerminalLine('>>> Email sent successfully!', 2500, 'success');
                    
                    // Reset form with animation
                    setTimeout(() => {
                        gsap.to(contactForm.elements, {
                            opacity: 0,
                            y: -20,
                            stagger: 0.1,
                            duration: 0.5,
                            onComplete: () => {
                                contactForm.reset();
                                gsap.to(contactForm.elements, {
                                    opacity: 1,
                                    y: 0,
                                    stagger: 0.1,
                                    duration: 0.5
                                });
                                
                                // Reset button
                                setTimeout(() => {
                                    submitBtn.innerHTML = originalText;
                                    submitBtn.disabled = false;
                                }, 500);
                            }
                        });
                    }, 3000);
                } else {
                    addTerminalLine('>>> Error: ' + result.message, 2500, 'error');
                    
                    // Reset button after error
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                }
            })
            .catch(error => {
                addTerminalLine('>>> Error: Network error', 2500, 'error');
                
                // Reset button after error
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            });
    });
}

// Add Python syntax highlighting to code snippets
function highlightPythonSyntax() {
    const codeElements = document.querySelectorAll('code.python');
    
    const pythonKeywords = [
        'def', 'class', 'import', 'from', 'return', 'if', 'else', 'elif',
        'for', 'while', 'try', 'except', 'finally', 'with', 'as', 'lambda',
        'print', 'True', 'False', 'None', 'self', '__init__'
    ];
    
    codeElements.forEach(element => {
        let html = element.innerHTML;
        
        // Highlight keywords
        pythonKeywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            html = html.replace(regex, `<span class="keyword">${keyword}</span>`);
        });
        
        // Highlight strings
        html = html.replace(/(["'])(.*?)\1/g, '<span class="string">$&</span>');
        
        // Highlight functions
        html = html.replace(/(\w+)(\s*\()/g, '<span class="function">$1</span>$2');
        
        // Highlight comments
        html = html.replace(/(#.*)/g, '<span class="comment">$1</span>');
        
        element.innerHTML = html;
    });
}

// 3D tilt effect for project cards with Python theme
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const cardRect = card.getBoundingClientRect();
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;
        
        const xPercent = x / cardRect.width - 0.5;
        const yPercent = y / cardRect.height - 0.5;
        
        // Apply tilt effect
        gsap.to(card, {
            rotationY: xPercent * 10,
            rotationX: yPercent * -10,
            transformPerspective: 1000,
            duration: 0.5,
            ease: 'power2.out',
            boxShadow: `
                ${xPercent * -20}px ${yPercent * -20}px 20px rgba(48, 105, 152, 0.1),
                0px 10px 20px rgba(0, 0, 0, 0.1)
            `
        });
        
        // Move the project header icon for depth effect
        const icon = card.querySelector('.project-header i');
        if (icon) {
            gsap.to(icon, {
                x: xPercent * 15,
                y: yPercent * 15,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    });
    
    card.addEventListener('mouseleave', () => {
        // Reset tilt
        gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
            duration: 0.5,
            ease: 'power2.out'
        });
        
        // Reset icon position
        const icon = card.querySelector('.project-header i');
        if (icon) {
            gsap.to(icon, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    });
});

// Parallax effect for hero section
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    // Move code snippet with parallax
    const codeSnippet = document.querySelector('.code-snippet');
    if (codeSnippet) {
        gsap.to(codeSnippet, {
            x: moveX * 2,
            y: moveY * 2,
            duration: 1,
            ease: 'power2.out'
        });
    }
    
    // Move badge elements with parallax
    const badges = document.querySelectorAll('.badge');
    badges.forEach((badge, index) => {
        const factor = (index % 3 + 1) * 0.8;
        gsap.to(badge, {
            x: moveX * factor,
            y: moveY * factor,
            duration: 1,
            ease: 'power2.out'
        });
    });
});

// Typewriter effect for terminal elements
function setupTypewriterEffect() {
    const terminalTexts = document.querySelectorAll('.terminal-text');
    
    terminalTexts.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typeSpeed = 50; // ms per character
        
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, typeSpeed);
            }
        }
        
        typeWriter();
    });
    
    // Also apply to terminal form labels
    setTimeout(() => {
        const labels = document.querySelectorAll('.terminal-window label');
        
        labels.forEach(label => {
            const text = label.textContent;
            label.textContent = '';
            
            let i = 0;
            const typeSpeed = 50; // ms per character
            
            function typeWriter() {
                if (i < text.length) {
                    label.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, typeSpeed);
                }
            }
            
            typeWriter();
        });
    }, 500);
}

// Matrix-style code rain for Python theme
function createCodeRain() {
    const codeRainContainer = document.querySelector('.code-rain');
    if (!codeRainContainer) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    codeRainContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Python-related characters
    const pythonChars = 'defclassimportfromreturnifelseelifforwhiletryexceptfinallywithasself__init__printFalseNoneTrue';
    const operatorChars = '+-*/:=<>()[]{}.,%&|^~';
    const allChars = pythonChars + operatorChars + '0123456789';
    
    // Python colors
    const pythonBlue = '#306998';
    const pythonYellow = '#FFD43B';
    
    // Create drops
    const columns = Math.floor(canvas.width / 20);
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    function draw() {
        // Translucent black background to create fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = '15px Fira Code';
        
        for (let i = 0; i < drops.length; i++) {
            // Choose a random character
            const text = allChars.charAt(Math.floor(Math.random() * allChars.length));
            
            // Alternate between Python blue and yellow
            if (Math.random() > 0.8) {
                ctx.fillStyle = pythonYellow;
            } else {
                ctx.fillStyle = pythonBlue;
            }
            
            // Add some random opacity for effect
            ctx.globalAlpha = Math.random() * 0.5 + 0.5;
            
            // Draw the character
            ctx.fillText(text, i * 20, drops[i] * 20);
            
            // Reset drop position when it goes off screen or randomly
            if (drops[i] * 20 > canvas.height || Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Increment drop position
            drops[i]++;
        }
        
        // Reset alpha
        ctx.globalAlpha = 1;
        
        requestAnimationFrame(draw);
    }
    
    // Resize canvas when window resizes
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Recalculate drops
        const newColumns = Math.floor(canvas.width / 20);
        
        if (newColumns > drops.length) {
            // Add new drops
            for (let i = drops.length; i < newColumns; i++) {
                drops[i] = Math.random() * -100;
            }
        }
    });
    
    draw();
}

// Floating badges animation with GSAP
function animateFloatingBadges() {
    const badges = document.querySelectorAll('.badge');
    
    badges.forEach((badge, index) => {
        // Set initial random position
        gsap.set(badge, {
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            rotation: (Math.random() - 0.5) * 20
        });
        
        // Create animation
        gsap.to(badge, {
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            rotation: (Math.random() - 0.5) * 20,
            duration: 5 + Math.random() * 5,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true
        });
    });
}

// Python typing animation for logo
function animatePythonLogo() {
    const pythonLogo = document.querySelector('.python-logo i');
    
    if (pythonLogo) {
        // Pulse animation
        gsap.to(pythonLogo, {
            scale: 1.2,
            duration: 0.5,
            repeat: -1,
            yoyo: true
        });
        
        // Color change animation
        gsap.to(pythonLogo, {
            color: '#306998', // Python blue
            duration: 2,
            repeat: -1,
            yoyo: true,
            repeatDelay: 1
        });
    }
}

// Initialize all animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Highlight Python syntax in code snippets
    highlightPythonSyntax();
    
    // Setup typewriter effect for terminal elements
    setupTypewriterEffect();
    
    // Create Matrix-style code rain
    createCodeRain();
    
    // Animate floating badges
    animateFloatingBadges();
    
    // Animate Python logo
    animatePythonLogo();
    
    // Add initial animations for hero section
    setTimeout(() => {
        document.querySelectorAll('.animate-text').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 200);
        });
        
        setTimeout(() => {
            document.querySelectorAll('.animate-fade').forEach(el => {
                el.classList.add('active');
            });
        }, 1000);
    }, 500);
    
    // Add GSAP-based scroll animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate skills progress bars on scroll
    document.querySelectorAll('.skill-progress').forEach(progress => {
        const progressBar = progress.querySelector('.progress');
        const width = progressBar.style.width;
        
        gsap.set(progressBar, { width: 0 });
        
        ScrollTrigger.create({
            trigger: progress,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(progressBar, {
                    width: width,
                    duration: 1.5,
                    ease: 'power3.out'
                });
            }
        });
    });
    
    // Add glowing effect to Python-related icons
    document.querySelectorAll('.fab.fa-python').forEach(icon => {
        gsap.to(icon, {
            filter: 'drop-shadow(0 0 5px #FFD43B)',
            duration: 2,
            repeat: -1,
            yoyo: true
        });
    });
    
    // Add scroll indicator animation
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        gsap.to(scrollDown, {
            y: 10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
    }
});