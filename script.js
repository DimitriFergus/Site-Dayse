// ==========================================
// DRA. DAYSE TRIGUEIRO - SCRIPT.JS
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- NAVBAR SCROLL ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ---- HAMBURGER MENU ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  // ---- VSL VIDEO PLAY ----
  const playBtn = document.getElementById('playBtn');
  const vslFrame = document.getElementById('vslFrame');
  const vslThumbnail = document.getElementById('vslThumbnail');
  if (playBtn && vslFrame && vslThumbnail) {
    playBtn.addEventListener('click', function () {
      var src = vslFrame.getAttribute('data-src');
      if (src) {
        vslFrame.setAttribute('src', src);
        vslFrame.classList.remove('hidden');
        vslThumbnail.style.display = 'none';
      }
    });
  }

  // ---- SCROLL REVEAL ----
  var revealEls = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function (el) { observer.observe(el); });

  // ---- FAQ ACCORDION ----
  var faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var answer = item.querySelector('.faq-answer');
      var isOpen = item.classList.contains('open');

      // Fecha todos
      document.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = null;
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Abre o clicado (se estava fechado)
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ---- BOOKING FORM -> WHATSAPP ----
  var form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('fname').value.trim();
      var phone = document.getElementById('fphone').value.trim();
      var email = document.getElementById('femail').value.trim();
      var service = document.getElementById('fservice').value;
      var date = document.getElementById('fdate').value;
      var time = document.getElementById('ftime').value;
      var message = document.getElementById('fmessage').value.trim();

      if (!name || !phone || !service || !date || !time) {
        alert('Por favor, preencha todos os campos obrigatórios (*).');
        return;
      }

      // Formata data
      var dateFormatted = date;
      if (date) {
        var parts = date.split('-');
        if (parts.length === 3) dateFormatted = parts[2] + '/' + parts[1] + '/' + parts[0];
      }

      var text = 'Olá Dra. Dayse! Gostaria de agendar uma consulta.\n\n';
      text += '👤 *Nome:* ' + name + '\n';
      text += '📱 *WhatsApp:* ' + phone + '\n';
      if (email) text += '📧 *E-mail:* ' + email + '\n';
      text += '✨ *Serviço:* ' + service + '\n';
      text += '📅 *Data:* ' + dateFormatted + '\n';
      text += '⏰ *Horário:* ' + time + '\n';
      if (message) text += '\n💬 *Mensagem:* ' + message;

      var waUrl = 'https://wa.me/5585991597451?text=' + encodeURIComponent(text);
      window.open(waUrl, '_blank');
    });
  }

  // ---- PHONE MASK ----
  var phoneInput = document.getElementById('fphone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function () {
      var v = phoneInput.value.replace(/\D/g, '');
      if (v.length <= 10) {
        v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else {
        v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
      }
      phoneInput.value = v;
    });
  }

  // ---- SET MIN DATE FOR BOOKING ----
  var dateInput = document.getElementById('fdate');
  if (dateInput) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    dateInput.setAttribute('min', yyyy + '-' + mm + '-' + dd);
  }

  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ---- MODAIS DE PORTFÓLIO ----
  function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.pmodal-panel').scrollTop = 0;
  }

  function closeModal(modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Abrir modal ao clicar no item do portfólio
  document.querySelectorAll('.portfolio-item[data-modal]').forEach(function (item) {
    item.addEventListener('click', function () {
      openModal(item.getAttribute('data-modal'));
    });
  });

  // Fechar modal pelo botão X
  document.querySelectorAll('.pmodal-close').forEach(function (btn) {
    btn.addEventListener('click', function () {
      closeModal(btn.closest('.pmodal'));
    });
  });

  // Fechar modal ao clicar no backdrop
  document.querySelectorAll('.pmodal-backdrop').forEach(function (bd) {
    bd.addEventListener('click', function () {
      closeModal(bd.closest('.pmodal'));
    });
  });

  // Fechar modal com Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.pmodal.open').forEach(function (m) { closeModal(m); });
    }
  });

  // Fechar modal ao clicar no CTA (leva para agendamento)
  document.querySelectorAll('.pmodal-cta').forEach(function (cta) {
    cta.addEventListener('click', function () {
      closeModal(cta.closest('.pmodal'));
    });
  });

  // ---- TESTIMONIALS CAROUSEL ----
  (function () {
    var track = document.getElementById('testiTrack');
    var dotsWrap = document.getElementById('testiDots');
    var prevBtn = document.querySelector('.testi-prev');
    var nextBtn = document.querySelector('.testi-next');
    if (!track || !prevBtn || !nextBtn) return;

    var cards = Array.from(track.querySelectorAll('.testi-card'));
    var total = cards.length;
    var current = 0;
    var autoTimer = null;
    var GAP = 24;

    function getPerView() {
      var w = window.innerWidth;
      if (w <= 480) return 1;
      if (w <= 768) return 2;
      return 3;
    }

    function getMaxIndex() {
      return Math.max(0, total - getPerView());
    }

    function buildDots() {
      dotsWrap.innerHTML = '';
      var maxIdx = getMaxIndex();
      for (var i = 0; i <= maxIdx; i++) {
        var dot = document.createElement('button');
        dot.className = 'testi-dot' + (i === current ? ' active' : '');
        dot.setAttribute('aria-label', 'Ir para depoimento ' + (i + 1));
        dot.dataset.i = i;
        dot.addEventListener('click', function () { goTo(parseInt(this.dataset.i)); startAuto(); });
        dotsWrap.appendChild(dot);
      }
    }

    function goTo(idx) {
      var maxIdx = getMaxIndex();
      current = Math.max(0, Math.min(idx, maxIdx));
      var cardW = cards[0].offsetWidth;
      track.style.transform = 'translateX(-' + (current * (cardW + GAP)) + 'px)';
      dotsWrap.querySelectorAll('.testi-dot').forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });
      prevBtn.disabled = current === 0;
      nextBtn.disabled = current >= maxIdx;
    }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(function () {
        goTo(current >= getMaxIndex() ? 0 : current + 1);
      }, 4500);
    }

    function stopAuto() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }

    prevBtn.addEventListener('click', function () { goTo(current - 1); startAuto(); });
    nextBtn.addEventListener('click', function () { goTo(current + 1); startAuto(); });

    var outer = track.closest('.testi-outer');
    if (outer) {
      outer.addEventListener('mouseenter', stopAuto);
      outer.addEventListener('mouseleave', startAuto);
    }

    window.addEventListener('resize', function () {
      buildDots();
      goTo(Math.min(current, getMaxIndex()));
    });

    buildDots();
    goTo(0);
    startAuto();
  })();

  // FAQ dentro dos modais
  document.querySelectorAll('.mfaq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.mfaq-item');
      var answer = item.querySelector('.mfaq-a');
      var isOpen = item.classList.contains('open');

      // Fecha todos do mesmo modal
      btn.closest('.pmodal-faq').querySelectorAll('.mfaq-item').forEach(function (i) {
        i.classList.remove('open');
        i.querySelector('.mfaq-a').style.maxHeight = null;
        i.querySelector('.mfaq-q').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });


});
