/* ==========================================================================
   DEVELOPER PORTFOLIO JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --------------------------------------------------------------------------
    // 1. PRELOADER & INITIALIZATION
    // --------------------------------------------------------------------------
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loader) {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
            }
        }, 600);
    });

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 900,
            once: true,
            offset: 100
        });
    }

    // Initialize Typed.js for Hero Subtitle
    if (typeof Typed !== 'undefined' && document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: [
                'Software Developer',
                'Java Developer',
                'Full Stack Developer',
                'AI Enthusiast'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            loop: true
        });
    }

    // Initialize VanillaTilt for elements with .tilt-element
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt-element"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2
        });
    }

    // Initialize tsParticles Backdrop
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("particles-js", {
            fpsLimit: 60,
            particles: {
                color: { value: "#6366f1" },
                links: {
                    color: "#a855f7",
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: "none",
                    random: false,
                    straight: false,
                    outModes: { default: "bounce" }
                },
                number: {
                    density: { enable: true, area: 800 },
                    value: 40
                },
                opacity: { value: 0.3 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } }
            },
            detectRetina: true
        });
    }

    // --------------------------------------------------------------------------
    // 2. THEME SWITCHER (DARK / LIGHT MODE)
    // --------------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (body.classList.contains('dark-theme')) {
                body.classList.remove('dark-theme');
                body.classList.add('light-theme');
                if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
                localStorage.setItem('portfolio-theme', 'light');
            } else {
                body.classList.remove('light-theme');
                body.classList.add('dark-theme');
                if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
                localStorage.setItem('portfolio-theme', 'dark');
            }
        });
    }

    // --------------------------------------------------------------------------
    // 3. NAVBAR STICKY & ACTIVE LINK SCROLLING
    // --------------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const scrollProgress = document.getElementById('scroll-progress');
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Sticky Navbar
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (scrollProgress) scrollProgress.style.width = scrolled + '%';

        // Scroll to Top Button Visibility
        if (scrollToTopBtn) {
            if (scrollY > 400) {
                scrollToTopBtn.classList.add('active');
            } else {
                scrollToTopBtn.classList.remove('active');
            }
        }

        // Active Section Highlighting in Navbar
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Mobile Navigation Drawer Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --------------------------------------------------------------------------
    // 5. PROJECT FILTER & SEARCH LOGIC
    // --------------------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const searchInput = document.getElementById('project-search');

    function filterProjects() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const activeFilterBtn = document.querySelector('.filter-btn.active');
        const filterValue = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';

        projectCards.forEach(card => {
            const cardCategories = card.getAttribute('data-category') || '';
            const cardTitle = card.querySelector('.project-title').textContent.toLowerCase();
            const cardDesc = card.querySelector('.project-desc').textContent.toLowerCase();
            const cardTech = card.querySelector('.project-tech').textContent.toLowerCase();

            const matchesFilter = filterValue === 'all' || cardCategories.includes(filterValue);
            const matchesSearch = cardTitle.includes(searchTerm) || cardDesc.includes(searchTerm) || cardTech.includes(searchTerm);

            if (matchesFilter && matchesSearch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProjects();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', filterProjects);
    }

    // --------------------------------------------------------------------------
    // 6. MODAL HANDLERS (PROJECT DETAILS & LEGAL)
    // --------------------------------------------------------------------------
    const projectModal = document.getElementById('project-modal');
    const closeProjectModal = document.getElementById('close-project-modal');
    const modalProjectContent = document.getElementById('modal-project-content');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');

    const projectData = {
        '1': {
            title: 'AI-Based Exam Evaluator',
            html: `
                <h2>AI-Based Exam Evaluator</h2>
                <div class="modal-project-details" style="color: var(--text-body); font-size: 0.95rem; line-height: 1.6; margin-top: 1rem; max-height: 70vh; overflow-y: auto; padding-right: 0.5rem;">
                    <h4 style="color: var(--primary-color); margin-top: 1rem; margin-bottom: 0.4rem;"><i class="fa-solid fa-circle-info"></i> Overview</h4>
                    <p style="color: var(--text-muted); margin-bottom: 1rem;">The AI-Based Exam Evaluator is an intelligent web application that automates the evaluation of descriptive answers using Artificial Intelligence. Instead of relying on exact keyword matching, the system uses Semantic Similarity (SBERT) to compare a student's answer with the model answer, providing fair and accurate scoring.</p>

                    <h4 style="color: var(--primary-color); margin-top: 1rem; margin-bottom: 0.4rem;"><i class="fa-solid fa-triangle-exclamation"></i> Problem Statement</h4>
                    <p style="color: var(--text-muted); margin-bottom: 1rem;">Manual evaluation of descriptive answers is time-consuming, inconsistent, and prone to human error. The objective of this project is to automate the evaluation process while maintaining accuracy and reducing teachers' workload.</p>

                    <h4 style="color: var(--primary-color); margin-top: 1rem; margin-bottom: 0.4rem;"><i class="fa-solid fa-list-check"></i> Key Features</h4>
                    <ul style="padding-left: 1.2rem; color: var(--text-muted); margin-bottom: 1rem;">
                        <li>Secure Login &amp; Authentication</li>
                        <li>Teacher and Student Dashboard</li>
                        <li>AI-Based Descriptive Answer Evaluation</li>
                        <li>Semantic Similarity using SBERT</li>
                        <li>Automatic Marks Calculation</li>
                        <li>Instant Result Generation</li>
                        <li>Evaluation History</li>
                        <li>REST API Integration</li>
                        <li>Database Storage</li>
                        <li>Responsive User Interface</li>
                    </ul>

                    <h4 style="color: var(--primary-color); margin-top: 1rem; margin-bottom: 0.4rem;"><i class="fa-solid fa-laptop-code"></i> Technologies Used</h4>
                    <div style="margin-bottom: 1rem; color: var(--text-muted);">
                        <p><strong>Frontend:</strong> HTML, CSS, JavaScript</p>
                        <p><strong>Backend:</strong> ASP.NET, REST API</p>
                        <p><strong>Artificial Intelligence:</strong> Python, Sentence-BERT (SBERT)</p>
                        <p><strong>Database:</strong> MySQL</p>
                    </div>

                    <h4 style="color: var(--primary-color); margin-top: 1rem; margin-bottom: 0.4rem;"><i class="fa-solid fa-user-gear"></i> My Role</h4>
                    <ul style="padding-left: 1.2rem; color: var(--text-muted); margin-bottom: 1rem;">
                        <li>Designed the complete database structure.</li>
                        <li>Developed the ASP.NET backend.</li>
                        <li>Integrated Python AI services using REST APIs.</li>
                        <li>Implemented user authentication.</li>
                        <li>Connected the AI model with the web application.</li>
                        <li>Stored evaluation records in MySQL.</li>
                    </ul>

                    <h4 style="color: var(--primary-color); margin-top: 1rem; margin-bottom: 0.4rem;"><i class="fa-solid fa-gears"></i> Challenges Faced</h4>
                    <ul style="padding-left: 1.2rem; color: var(--text-muted); margin-bottom: 1rem;">
                        <li>Integrating ASP.NET with Python.</li>
                        <li>Passing data securely through REST APIs.</li>
                        <li>Optimizing response time of the AI model.</li>
                        <li>Managing similarity score thresholds.</li>
                    </ul>

                    <h4 style="color: var(--primary-color); margin-top: 1rem; margin-bottom: 0.4rem;"><i class="fa-solid fa-award"></i> Outcome</h4>
                    <p style="color: var(--text-muted); margin-bottom: 1rem;">The system successfully evaluates descriptive answers automatically, reduces manual effort, and delivers fast, consistent, and accurate assessment results.</p>
                </div>
            `
        },
        '2': {
            title: 'Food Ordering Website',
            html: `
                <h2>Food Ordering Website</h2>
                <div class="modal-project-details" style="color: var(--text-body); font-size: 0.95rem; line-height: 1.6; margin-top: 1rem; max-height: 70vh; overflow-y: auto; padding-right: 0.5rem;">
                    <h4 style="color: var(--primary-color); margin-top: 1rem; margin-bottom: 0.4rem;"><i class="fa-solid fa-circle-info"></i> Overview</h4>
                    <p style="color: var(--text-muted); margin-bottom: 1rem;">The Food Ordering Website is a responsive web application that provides users with an intuitive interface to explore food items, browse menus, and place orders seamlessly. The project focuses on delivering an attractive user experience through modern web design.</p>

                    <h4 style="color: var(--primary-color); margin-top: 1rem; margin-bottom: 0.4rem;"><i class="fa-solid fa-triangle-exclamation"></i> Problem Statement</h4>
                    <p style="color: var(--text-muted); margin-bottom: 1rem;">Traditional restaurant websites often provide poor user experience and lack responsive design. This project was developed to create an easy-to-use online food ordering interface accessible across all devices.</p>

                    <h4 style="color: var(--primary-color); margin-top: 1rem; margin-bottom: 0.4rem;"><i class="fa-solid fa-list-check"></i> Key Features</h4>
                    <ul style="padding-left: 1.2rem; color: var(--text-muted); margin-bottom: 1rem;">
                        <li>Fully Responsive Design</li>
                        <li>Attractive Landing Page</li>
                        <li>Interactive Food Menu</li>
                        <li>Categories Section</li>
                        <li>Services Section</li>
                        <li>About Restaurant</li>
                        <li>Contact Information</li>
                        <li>Modern UI</li>
                        <li>Smooth Navigation</li>
                        <li>Mobile Friendly Layout</li>
                    </ul>

                    <h4 style="color: var(--primary-color); margin-top: 1rem; margin-bottom: 0.4rem;"><i class="fa-solid fa-laptop-code"></i> Technologies Used</h4>
                    <div style="margin-bottom: 1rem; color: var(--text-muted);">
                        <p>HTML5, CSS3, JavaScript</p>
                    </div>

                    <h4 style="color: var(--primary-color); margin-top: 1rem; margin-bottom: 0.4rem;"><i class="fa-solid fa-user-gear"></i> My Role</h4>
                    <ul style="padding-left: 1.2rem; color: var(--text-muted); margin-bottom: 1rem;">
                        <li>Designed the complete frontend UI.</li>
                        <li>Developed responsive layouts using HTML and CSS.</li>
                        <li>Added interactive elements using JavaScript.</li>
                        <li>Optimized the website for mobile devices.</li>
                        <li>Improved overall user experience.</li>
                    </ul>

                    <h4 style="color: var(--primary-color); margin-top: 1rem; margin-bottom: 0.4rem;"><i class="fa-solid fa-gears"></i> Challenges Faced</h4>
                    <ul style="padding-left: 1.2rem; color: var(--text-muted); margin-bottom: 1rem;">
                        <li>Creating a fully responsive layout.</li>
                        <li>Optimizing images and page loading.</li>
                        <li>Designing an attractive user interface.</li>
                    </ul>

                    <h4 style="color: var(--primary-color); margin-top: 1rem; margin-bottom: 0.4rem;"><i class="fa-solid fa-award"></i> Outcome</h4>
                    <p style="color: var(--text-muted); margin-bottom: 1rem;">Successfully developed a modern, responsive food ordering website that provides a smooth user experience and demonstrates frontend development skills.</p>
                </div>
            `
        }
    };

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projId = btn.getAttribute('data-project');
            const data = projectData[projId];
            if (data && modalProjectContent && projectModal) {
                modalProjectContent.innerHTML = data.html;
                projectModal.classList.add('active');
            }
        });
    });

    if (closeProjectModal && projectModal) {
        closeProjectModal.addEventListener('click', () => {
            projectModal.classList.remove('active');
        });
    }

    // Legal Modals
    const legalModal = document.getElementById('legal-modal');
    const closeLegalModal = document.getElementById('close-legal-modal');
    const openPrivacy = document.getElementById('open-privacy');
    const openTerms = document.getElementById('open-terms');

    if (openPrivacy && legalModal) {
        openPrivacy.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('legal-title').textContent = "Privacy Policy";
            legalModal.classList.add('active');
        });
    }

    if (openTerms && legalModal) {
        openTerms.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('legal-title').textContent = "Terms of Service";
            legalModal.classList.add('active');
        });
    }

    if (closeLegalModal && legalModal) {
        closeLegalModal.addEventListener('click', () => {
            legalModal.classList.remove('active');
        });
    }

    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target === projectModal) projectModal.classList.remove('active');
        if (e.target === legalModal) legalModal.classList.remove('active');
    });

    // --------------------------------------------------------------------------
    // 7. CONTACT FORM SUBMISSION & TOAST NOTIFICATION
    // --------------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show Toast Notification
            if (toast) {
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3500);
            }

            // Reset Form Fields
            contactForm.reset();
        });
    }
});
