// ===== Particle Background =====
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// ===== Typing Animation =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// ===== Rotating Titles =====
function rotatingTitles() {
    const titles = ['AI Developer', 'Web Developer', 'ML Engineer', 'Problem Solver'];
    const element = document.getElementById('rotatingTitle');
    let index = 0;
    
    setInterval(() => {
        element.style.opacity = 0;
        setTimeout(() => {
            index = (index + 1) % titles.length;
            element.textContent = titles[index];
            element.style.opacity = 1;
        }, 300);
    }, 3000);
}

// ===== Code Animation =====
function animateCode() {
    const codeElement = document.getElementById('codeAnimation');
    const codeLines = [
        '<span class="keyword">class</span> <span class="class">Developer</span>:',
        '    <span class="keyword">def</span> <span class="function">__init__</span>(<span class="param">self</span>):',
        '        <span class="param">self</span>.name = <span class="string">"Lê Quang Minh"</span>',
        '        <span class="param">self</span>.role = <span class="string">"AI & Web Developer"</span>',
        '        <span class="param">self</span>.skills = [',
        '            <span class="string">"Python"</span>, <span class="string">"PyTorch"</span>,',
        '            <span class="string">"TensorFlow"</span>, <span class="string">"OpenCV"</span>',
        '        ]',
        '',
        '    <span class="keyword">def</span> <span class="function">build</span>(<span class="param">self</span>, project):',
        '        <span class="keyword">return</span> <span class="string">f"Building {project}..."</span>',
        '',
        '<span class="comment"># Ready to create amazing things!</span>',
        'dev = <span class="class">Developer</span>()',
        'dev.<span class="function">build</span>(<span class="string">"AI Solutions"</span>)'
    ];
    
    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = '';
    
    function typeCode() {
        if (lineIndex < codeLines.length) {
            const line = codeLines[lineIndex];
            const plainText = line.replace(/<[^>]*>/g, '');
            
            if (charIndex < plainText.length) {
                // Build the line character by character
                currentLine = buildPartialLine(line, charIndex + 1);
                updateCodeDisplay(lineIndex, currentLine);
                charIndex++;
                setTimeout(typeCode, 30);
            } else {
                lineIndex++;
                charIndex = 0;
                currentLine = '';
                setTimeout(typeCode, 100);
            }
        } else {
            // Restart animation after delay
            setTimeout(() => {
                codeElement.innerHTML = '';
                lineIndex = 0;
                charIndex = 0;
                typeCode();
            }, 5000);
        }
    }
    
    function buildPartialLine(htmlLine, charCount) {
        let result = '';
        let visibleChars = 0;
        let inTag = false;
        
        for (let i = 0; i < htmlLine.length && visibleChars < charCount; i++) {
            if (htmlLine[i] === '<') {
                inTag = true;
                // Find the end of the tag and include it
                const tagEnd = htmlLine.indexOf('>', i);
                result += htmlLine.substring(i, tagEnd + 1);
                i = tagEnd;
                inTag = false;
            } else {
                result += htmlLine[i];
                visibleChars++;
            }
        }
        
        // Close any open tags
        const openTags = result.match(/<span[^>]*>/g) || [];
        const closeTags = result.match(/<\/span>/g) || [];
        const unclosed = openTags.length - closeTags.length;
        for (let i = 0; i < unclosed; i++) {
            result += '</span>';
        }
        
        return result;
    }
    
    function updateCodeDisplay(currentLineIndex, partialLine) {
        let html = '';
        for (let i = 0; i < currentLineIndex; i++) {
            html += '<span class="line">' + codeLines[i] + '</span>\n';
        }
        html += '<span class="line">' + partialLine + '<span class="cursor">|</span></span>';
        codeElement.innerHTML = html;
    }
    
    typeCode();
}

// ===== Navigation =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== Skill Canvas Animation =====
function initSkillCanvas() {
    const canvas = document.getElementById('skillCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    
    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    const skills = [
        { name: 'Python', x: 0, y: 0, vx: 1, vy: 0.5, radius: 40 },
        { name: 'PyTorch', x: 0, y: 0, vx: -0.8, vy: 0.7, radius: 35 },
        { name: 'TensorFlow', x: 0, y: 0, vx: 0.6, vy: -0.9, radius: 35 },
        { name: 'OpenCV', x: 0, y: 0, vx: -0.5, vy: -0.6, radius: 30 },
        { name: 'NumPy', x: 0, y: 0, vx: 0.9, vy: 0.3, radius: 28 },
        { name: 'Pandas', x: 0, y: 0, vx: -0.7, vy: 0.8, radius: 28 },
        { name: 'SQL', x: 0, y: 0, vx: 0.4, vy: -0.5, radius: 25 },
        { name: 'Git', x: 0, y: 0, vx: -0.3, vy: -0.4, radius: 22 }
    ];
    
    // Initialize positions
    skills.forEach((skill, i) => {
        skill.x = Math.random() * (canvas.width - 100) + 50;
        skill.y = Math.random() * (canvas.height - 100) + 50;
    });
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
        ctx.lineWidth = 1;
        skills.forEach((skill1, i) => {
            skills.forEach((skill2, j) => {
                if (i < j) {
                    const dist = Math.hypot(skill1.x - skill2.x, skill1.y - skill2.y);
                    if (dist < 200) {
                        ctx.beginPath();
                        ctx.moveTo(skill1.x, skill1.y);
                        ctx.lineTo(skill2.x, skill2.y);
                        ctx.stroke();
                    }
                }
            });
        });
        
        // Draw skills
        skills.forEach(skill => {
            // Update position
            skill.x += skill.vx;
            skill.y += skill.vy;
            
            // Bounce off walls
            if (skill.x < skill.radius || skill.x > canvas.width - skill.radius) {
                skill.vx *= -1;
            }
            if (skill.y < skill.radius || skill.y > canvas.height - skill.radius) {
                skill.vy *= -1;
            }
            
            // Draw circle
            const gradient = ctx.createRadialGradient(
                skill.x, skill.y, 0,
                skill.x, skill.y, skill.radius
            );
            gradient.addColorStop(0, 'rgba(0, 212, 255, 0.3)');
            gradient.addColorStop(1, 'rgba(124, 58, 237, 0.1)');
            
            ctx.beginPath();
            ctx.arc(skill.x, skill.y, skill.radius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.5)';
            ctx.stroke();
            
            // Draw text
            ctx.fillStyle = '#ffffff';
            ctx.font = '12px Space Grotesk';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(skill.name, skill.x, skill.y);
        });
        
        animationId = requestAnimationFrame(draw);
    }
    
    // Start animation when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                draw();
            } else {
                cancelAnimationFrame(animationId);
            }
        });
    });
    
    observer.observe(canvas);
}


// ===== Scroll Animations =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger children animations
                const children = entry.target.querySelectorAll('[data-aos]');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe individual animated elements
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.classList.add('animate-hidden');
    });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== Skill Tag Hover Effects =====
function initSkillHover() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) translateY(-2px)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });
}

// ===== Project Card Tilt Effect =====
function initTiltEffect() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ===== Timeline Animation =====
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// ===== Contact Card Ripple Effect =====
function initRippleEffect() {
    const cards = document.querySelectorAll('.contact-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ===== Cursor Glow Effect =====
function initCursorGlow() {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ===== Add Dynamic Styles =====
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-hidden {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .timeline-item {
            opacity: 0;
            transform: translateX(-30px);
            transition: all 0.6s ease;
        }
        
        .timeline-item.visible {
            opacity: 1;
            transform: translateX(0);
        }
        
        .timeline-item:nth-child(even) {
            transform: translateX(30px);
        }
        
        .timeline-item:nth-child(even).visible {
            transform: translateX(0);
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(0, 212, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .cursor-glow {
            position: fixed;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: -1;
        }
        
        .line {
            display: block;
        }
        
        .keyword { color: #f472b6; }
        .class { color: #00d4ff; }
        .function { color: #ffcc80; }
        .param { color: #7c3aed; }
        .string { color: #a5d6a7; }
        .comment { color: #6b6b7b; }
        
        #codeAnimation .cursor {
            animation: blink 1s infinite;
        }
        
        #rotatingTitle {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    // Add dynamic styles first
    addDynamicStyles();
    
    // Create particles
    createParticles();
    
    // Initialize typing animation
    const greetingElement = document.getElementById('greeting');
    setTimeout(() => {
        typeWriter(greetingElement, 'Hello, I am', 100);
    }, 500);
    
    // Initialize rotating titles
    rotatingTitles();
    
    // Initialize code animation
    animateCode();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize skill canvas
    initSkillCanvas();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Initialize skill hover effects
    initSkillHover();
    
    // Initialize tilt effect
    initTiltEffect();
    
    // Initialize timeline animation
    initTimelineAnimation();
    
    // Initialize ripple effect
    initRippleEffect();
    
    // Initialize cursor glow (desktop only)
    if (window.innerWidth > 768) {
        initCursorGlow();
    }
    
    console.log('%c Portfolio Loaded! ', 'background: linear-gradient(135deg, #00d4ff, #7c3aed); color: white; padding: 10px 20px; border-radius: 5px; font-size: 14px;');
});

// ===== Preloader (Optional) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
