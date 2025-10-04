// Efeito de navbar ao scrollar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');

    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      backToTop.classList.add('show');
    } else {
      navbar.classList.remove('scrolled');
      backToTop.classList.remove('show');
    }

    // Atualizar active da navbar baseado na seção visível
    updateActiveNavLink();
  });

  // Função para atualizar o link ativo na navbar
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section, #home');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });

    // Caso especial para a home (carrossel)
    if (window.scrollY < 100) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#home') {
          link.classList.add('active');
        }
      });
    }
  }

  // Animação de elementos ao scrollar - SEMPRE QUE ENTRAR NA TELA
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      const elementBottom = element.getBoundingClientRect().bottom;

      // Remove a classe quando o elemento sair da tela
      if (elementPosition > screenPosition || elementBottom < 0) {
        element.classList.remove('animated');
      }
      // Adiciona a classe quando o elemento entrar na tela
      else if (elementPosition < screenPosition) {
        element.classList.add('animated');
      }
    });
  };

  // LOADING OTIMIZADO - Lazy Loading
  function initLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-load');

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // CORREÇÃO: Smooth scroll que não interfere no menu mobile
  document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para links da navbar com fechamento automático no mobile
    document.querySelectorAll('.navbar-nav .nav-link').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId.startsWith('#')) return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Fechar menu mobile se estiver aberto
          const navbarCollapse = document.querySelector('.navbar-collapse');
          const navbarToggler = document.querySelector('.navbar-toggler');

          if (navbarCollapse.classList.contains('show')) {
            // Usando Bootstrap para fechar o menu corretamente
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
              toggle: false
            });
            bsCollapse.hide();
          }

          e.preventDefault();
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });

    // Inicializações
    updateActiveNavLink();
    initLazyLoading();
  });

  // Event listeners separados para evitar conflitos
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);

  // Botão voltar ao topo
  document.querySelector('.back-to-top').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Inicializar o carrossel com autoplay
  document.addEventListener('DOMContentLoaded', function() {
    const carouselElement = document.getElementById('home');
    if (carouselElement) {
      const carousel = new bootstrap.Carousel(carouselElement, {
        interval: 5000, // 5 segundos
        wrap: true,
       // pause: 'hover'
      });
    }
  });
