
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations with combined settings
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out-quart',
        once: true,
        offset: 100
    });

    // Load Spline 3D scene (commented out by default)
    const loadSpline = () => {
        const spline = new SplineRuntime();
        spline.load('scene.splinecode').then(() => {
            const container = document.getElementById('spline-container');
            container.appendChild(spline);
            
            spline.setAttribute('loading', 'eager');
            spline.setAttribute('interaction', 'none');
        });
    };
    // Uncomment when ready to use Spline
    // loadSpline();

    // Enhanced navbar hover effects
    const navItems = document.querySelectorAll('.nav-links a, nav ul li a');
    
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (!item.classList.contains('active')) {
                item.style.transform = 'translateY(-2px)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (!item.classList.contains('active')) {
                item.style.transform = 'translateY(0)';
            }
        });
    });

    // Combined card animation approach
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach((card, index) => {
        // Initial state for both animations
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) rotateX(10deg)';
        card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.transitionDelay = `${index * 0.1}s`;
        card.style.animationDelay = `${index * 0.2}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) rotateX(0)';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
    });

    // Enhanced button ripple effect for all buttons
    const buttons = document.querySelectorAll('.primary-btn, .tool-btn, .secondary-btn, button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    // Unified authentication popup handler
    document.querySelectorAll('.secondary-btn, .primary-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Determine which view to show based on button text
            let targetView = 'login'; // Default view
            
            if (btn.textContent.trim() === 'Get Started') {
                targetView = 'signup';
            }
            
            // Open popup with query parameter
            const authWindow = window.open(
                `auth/auth.html?view=${targetView}`, 
                'AuthWindow',
                'width=500,height=600,top=100,left=100'
            );
            
            // Check if the window was blocked by a popup blocker
            if (authWindow === null) {
                alert('Please allow popups for this site to login.');
            }
        });
    });

    // Enhanced message listener for auth success
    window.addEventListener('message', (event) => {
        if (event.data.type === 'AUTH_SUCCESS') {
            const user = event.data.user;
            
            // Update hero section
            document.querySelector('.hero-section').innerHTML = `
                <h1>Welcome back, ${user.displayName || 'User'}!</h1>
                <p>Your creative journey continues. Start crafting amazing images now.</p>
                <div class="cta-buttons">
                    <button class="primary-btn">Launch Editor</button>
                    <button class="secondary-btn">View Projects</button>
                </div>
            `;
            
            // Update nav with user profile
            const nav = document.querySelector('nav ul');
            const profileLi = document.createElement('li');
            profileLi.innerHTML = `
                <a href="#profile" class="profile-link">
                    <img src="${user.photoURL || 'https://via.placeholder.com/32'}" alt="Profile" class="profile-pic">
                </a>
            `;
            nav.appendChild(profileLi);
            
            // Hide auth buttons
            document.querySelectorAll('.secondary-btn, .primary-btn').forEach(btn => {
                btn.style.display = 'none';
            });
            
        }
        
    });
    
});
