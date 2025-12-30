// ==================== VARIÁVEIS GLOBAIS ====================
const header = document.getElementById('header');
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scrollTop');
const sections = document.querySelectorAll('section[id]');
const heroVideo = document.querySelector('.hero-video');


// ==================== NAVEGAÇÃO MÓVEL ====================
// Toggle menu mobile
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    const icon = navToggle.querySelector('i');
    
    if (navMenu.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ==================== SCROLL EFFECTS ====================
// Header com efeito de scroll
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    // Header background ao scrollar
    if (scrollY >= 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Mostrar/esconder botão scroll to top
    if (scrollY >= 400) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
    
    // Active link na navegação baseado na seção visível
    scrollActive();
});

// ==================== SCROLL TO TOP ====================
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== ACTIVE LINK NA NAVEGAÇÃO ====================
function scrollActive() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.remove('active');
        }
    });
}

// ==================== SMOOTH SCROLL PARA LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== SCROLL DOWN BUTTON NO HERO ====================
const scrollDownBtn = document.querySelector('.scroll-down');
if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
        const sobreSection = document.getElementById('sobre');
        const headerHeight = header.offsetHeight;
        const targetPosition = sobreSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
}

// ==================== ANIMAÇÃO AOS (Animate On Scroll) ====================
function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Inicializar AOS ao carregar a página
document.addEventListener('DOMContentLoaded', initAOS);

// ==================== FORMULÁRIO DE CONTATO ====================
const enviarBtn = document.getElementById('enviarBtn');
const formMessage = document.getElementById('formMessage');

if (enviarBtn) {
    enviarBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Pegar valores dos campos
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const servico = document.getElementById('servico').value;
        const mensagem = document.getElementById('mensagem').value.trim();
        
        // Validação simples
        if (!nome || !email || !telefone || !mensagem) {
            showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }
        
        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Por favor, insira um email válido.', 'error');
            return;
        }
        
        // Validação de telefone (formato básico)
        const telefoneRegex = /^[\d\s\-\(\)]+$/;
        if (!telefoneRegex.test(telefone)) {
            showMessage('Por favor, insira um telefone válido.', 'error');
            return;
        }
        
        // Simular envio (em produção, aqui seria feito o envio para servidor)
        enviarBtn.disabled = true;
        enviarBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        setTimeout(() => {
            showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            
            // Limpar formulário
            document.getElementById('nome').value = '';
            document.getElementById('email').value = '';
            document.getElementById('telefone').value = '';
            document.getElementById('servico').value = '';
            document.getElementById('mensagem').value = '';
            
            enviarBtn.disabled = false;
            enviarBtn.innerHTML = 'Enviar Mensagem';
            
            // Esconder mensagem após 5 segundos
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }, 2000);
    });
}

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Scroll suave até a mensagem
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ==================== EFEITOS DE HOVER NOS CARDS ====================
// Adicionar efeito de tilt nos cards
const cards = document.querySelectorAll('.glass-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==================== CONTADOR ANIMADO PARA ESTATÍSTICAS ====================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '') + 
                                  (element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '') + 
                                  (element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
}

// Animar contadores quando visíveis
const statNumbers = document.querySelectorAll('.stat-item h4');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            entry.target.classList.add('counted');
            animateCounter(entry.target, number);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ==================== PRELOADER (Opcional) ====================
window.addEventListener('load', () => {
    // Adicionar classe ao body indicando que a página carregou
    document.body.classList.add('loaded');
    
    // Inicializar animações
    setTimeout(() => {
        initAOS();
    }, 100);
});

// ==================== PARALLAX EFFECT NO HERO ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < hero.offsetHeight) {
        const parallaxElements = hero.querySelectorAll('.hero-content, .hero-title, .hero-subtitle');
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Parallax sutil no vídeo
        if (heroVideo && scrolled < hero.offsetHeight) {
            heroVideo.style.transform = `translate(-50%, -50%) scale(${1 + scrolled * 0.0002})`;
        }
    }
});

// ==================== LIGHTBOX PARA GALERIA (Simples) ====================
const galeriaItems = document.querySelectorAll('.galeria-item');

galeriaItems.forEach(item => {
    item.addEventListener('click', () => {
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 200);
    });
});

// ==================== MÁSCARA PARA TELEFONE ====================
const telefoneInput = document.getElementById('telefone');

if (telefoneInput) {
    telefoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            if (value.length <= 2) {
                value = value.replace(/^(\d{0,2})/, '($1');
            } else if (value.length <= 6) {
                value = value.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
            } else if (value.length <= 10) {
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else {
                value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            }
        }
        
        e.target.value = value;
    });
}

