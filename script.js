/**
 * J&J Distribuição - Landing Page Client Logic & WhatsApp Integration
 */
(function () {
  'use strict';

  // Configuração padrão de contingência
  let appConfig = {
    whatsappNumber: '5511992704530',
    formattedWhatsApp: '(11) 99270-4530',
    phoneLandline: '(11) 99270-4530',
    email: 'vendas@jjdistribuicao.com.br'
  };

  // Carrega configurações dinâmicas do backend se disponível
  fetch('/api/config')
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      if (data && data.whatsappNumber) {
        appConfig = Object.assign(appConfig, data);
        updateContactDetailsInDOM();
      }
    })
    .catch(() => {
      // Caso executado como arquivo estático sem backend rodando
      console.log('Backend offline ou abrindo via file://. Usando configuração padrão.');
    });

  function updateContactDetailsInDOM() {
    // Atualiza elementos com data-bind-wa
    const waElements = document.querySelectorAll('[data-bind-wa]');
    waElements.forEach(el => {
      el.textContent = appConfig.formattedWhatsApp;
      if (el.tagName === 'A') {
        el.href = `https://wa.me/${appConfig.whatsappNumber}`;
      }
    });

    // Atualiza elementos com data-bind-phone
    const phoneElements = document.querySelectorAll('[data-bind-phone]');
    phoneElements.forEach(el => {
      el.textContent = appConfig.phoneLandline;
      if (el.tagName === 'A') {
        el.href = `tel:${appConfig.phoneLandline.replace(/\D/g, '')}`;
      }
    });

    // Atualiza elementos com data-bind-email
    const emailElements = document.querySelectorAll('[data-bind-email]');
    emailElements.forEach(el => {
      el.textContent = appConfig.email;
      if (el.tagName === 'A') {
        el.href = `mailto:${appConfig.email}`;
      }
    });
  }

  // Toast de feedback visual para o usuário
  function showToast(message, type = 'success') {
    let toast = document.getElementById('jj-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'jj-toast';
      toast.className = 'fixed top-5 right-5 z-[9999] max-w-md bg-slate-900 text-white px-5 py-3.5 rounded-lg shadow-xl border border-slate-700 flex items-center gap-3 transition-all duration-300 transform translate-y-[-20px] opacity-0 pointer-events-none';
      document.body.appendChild(toast);
    }

    const icon = type === 'success' ? 'chat' : 'info';
    toast.innerHTML = `
      <span class="material-symbols-outlined text-green-400 text-[22px]">${icon}</span>
      <span class="text-sm font-medium leading-snug">${message}</span>
    `;

    toast.classList.remove('translate-y-[-20px]', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-[-20px]', 'opacity-0', 'pointer-events-none');
    }, 3200);
  }

  // Envia registro de lead / clique para a API do backend
  function logLeadToBackend(origin, product, message) {
    const payload = {
      origin: origin,
      product: product,
      message: message,
      url: window.location.href,
      referrer: document.referrer || 'Direto'
    };

    // Tenta usar sendBeacon para garantia de envio durante navegação
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      navigator.sendBeacon('/api/leads', blob);
    } else {
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(err => console.warn('Lead tracking offline:', err));
    }
  }

  // Ação principal de clique no WhatsApp
  window.openWhatsApp = function (origin, product, defaultMsg) {
    const phone = appConfig.whatsappNumber;
    const text = encodeURIComponent(defaultMsg || 'Olá! Gostaria de falar com um atendente da J&J Distribuição.');
    const whatsappUrl = `https://wa.me/${phone}?text=${text}`;

    // Rastreia o clique no backend
    logLeadToBackend(origin, product, defaultMsg);

    // Feedback visual
    showToast('Iniciando conversa no WhatsApp da J&J Distribuição...');

    // Abre o WhatsApp em nova aba
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 250);
  };

  // Inicialização quando o DOM estiver pronto
  document.addEventListener('DOMContentLoaded', function () {
    // 1. Vincula todos os botões com atributos data-wa-*
    document.querySelectorAll('[data-wa-origin]').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const origin = this.getAttribute('data-wa-origin') || 'Botão Desconhecido';
        const product = this.getAttribute('data-wa-product') || 'Geral';
        const msg = this.getAttribute('data-wa-msg') || 'Olá! Gostaria de um orçamento.';
        window.openWhatsApp(origin, product, msg);
      });
    });

    // 2. Controla o Tooltip do Botão Flutuante
    const floatingCta = document.getElementById('floating-whatsapp-cta');
    const floatingTooltip = document.getElementById('floating-whatsapp-tooltip');

    if (floatingCta && floatingTooltip) {
      // Exibe sutilmente o tooltip após 3.5 segundos para chamar atenção
      setTimeout(() => {
        floatingTooltip.classList.remove('opacity-0', 'translate-y-2', 'pointer-events-none');
        floatingTooltip.classList.add('opacity-100', 'translate-y-0');

        // Esconde após 6 segundos adicionais, permitindo reabrir no hover
        setTimeout(() => {
          if (!floatingCta.matches(':hover')) {
            floatingTooltip.classList.remove('opacity-100', 'translate-y-0');
            floatingTooltip.classList.add('opacity-0', 'translate-y-2', 'pointer-events-none');
          }
        }, 6000);
      }, 3500);

      floatingCta.addEventListener('mouseenter', () => {
        floatingTooltip.classList.remove('opacity-0', 'translate-y-2', 'pointer-events-none');
        floatingTooltip.classList.add('opacity-100', 'translate-y-0');
      });

      floatingCta.addEventListener('mouseleave', () => {
        floatingTooltip.classList.remove('opacity-100', 'translate-y-0');
        floatingTooltip.classList.add('opacity-0', 'translate-y-2', 'pointer-events-none');
      });
    }

    // 3. Highlight de menu ativo durante o scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav a[href^="#"]');

    function highlightNavOnScroll() {
      const scrollY = window.pageYOffset + 100;

      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-primary');
              link.classList.remove('text-on-surface-variant');
            } else {
              link.classList.remove('text-primary', 'font-bold', 'border-b-2', 'border-primary');
              link.classList.add('text-on-surface-variant');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

    // 4. Menu Mobile Interativo
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', function () {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
          mobileMenu.classList.remove('hidden');
          mobileMenuBtn.setAttribute('aria-expanded', 'true');
          if (mobileMenuIcon) mobileMenuIcon.textContent = 'close';
        } else {
          mobileMenu.classList.add('hidden');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          if (mobileMenuIcon) mobileMenuIcon.textContent = 'menu';
        }
      });

      // Fecha o menu móvel ao clicar em qualquer link de seção
      document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', function () {
          mobileMenu.classList.add('hidden');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          if (mobileMenuIcon) mobileMenuIcon.textContent = 'menu';
        });
      });
    }
  });
})();
