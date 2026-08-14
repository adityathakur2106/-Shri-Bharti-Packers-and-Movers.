// Shri Bharti Packers and Movers - Interactive Script

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = hamburger.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }

  // FAQ Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all accordion items
      document.querySelectorAll('.accordion-item').forEach(el => {
        el.classList.remove('active');
      });

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Cost Calculator Form
  const calcForm = document.getElementById('calc-form');
  const calcResultBox = document.getElementById('calc-result');
  const calcPrice = document.getElementById('calc-price');

  if (calcForm) {
    calcForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const moveType = document.getElementById('move-type').value;
      const houseSize = document.getElementById('house-size').value;
      const distance = parseFloat(document.getElementById('distance').value) || 10;

      let basePrice = 3500;

      // House size multiplier
      switch (houseSize) {
        case '1rk': basePrice = 3000; break;
        case '1bhk': basePrice = 4500; break;
        case '2bhk': basePrice = 7500; break;
        case '3bhk': basePrice = 11000; break;
        case 'villa': basePrice = 16000; break;
        case 'office': basePrice = 14000; break;
      }

      // Move type multiplier
      if (moveType === 'interstate') {
        basePrice += distance * 35;
      } else if (moveType === 'international') {
        basePrice += 45000;
      } else {
        basePrice += distance * 18;
      }

      const minEstimate = Math.round(basePrice * 0.95);
      const maxEstimate = Math.round(basePrice * 1.15);

      if (calcPrice) {
        calcPrice.textContent = `₹${minEstimate.toLocaleString('en-IN')} - ₹${maxEstimate.toLocaleString('en-IN')}`;
      }

      if (calcResultBox) {
        calcResultBox.classList.add('active');
        calcResultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // Scroll to top button
  const scrollTopBtn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Tracking Modal
  const trackBtn = document.getElementById('track-btn');
  const trackModal = document.getElementById('track-modal');
  const trackClose = document.getElementById('track-close');
  const trackForm = document.getElementById('track-form');
  const trackStatus = document.getElementById('track-status');

  if (trackBtn && trackModal) {
    trackBtn.addEventListener('click', (e) => {
      e.preventDefault();
      trackModal.classList.add('active');
    });
  }

  if (trackClose && trackModal) {
    trackClose.addEventListener('click', () => {
      trackModal.classList.remove('active');
    });
  }

  if (trackForm) {
    trackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const trackingId = document.getElementById('tracking-id').value;
      if (trackStatus) {
        trackStatus.innerHTML = `
          <div style="margin-top:1.5rem; padding:1.25rem; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; text-align:left;">
            <div style="font-weight:700; color:#166534; font-size:1.05rem; margin-bottom:0.4rem;">
              <i class="fa-solid fa-circle-check"></i> Active Shipment Found (${trackingId})
            </div>
            <p style="font-size:0.9rem; color:#15803d; margin-bottom:0.75rem;">Status: <strong>In Transit - On Schedule</strong></p>
            <div style="font-size:0.85rem; color:#374151; line-height:1.6;">
              <div>📍 <strong>Origin:</strong> Bengaluru Main Hub</div>
              <div>🚚 <strong>Current Location:</strong> NH-44 Toll Plaza (En Route)</div>
              <div>📦 <strong>Items:</strong> Household Goods + Vehicle Transport</div>
              <div>⏱️ <strong>Estimated Arrival:</strong> Tomorrow by 2:00 PM</div>
            </div>
          </div>
        `;
      }
    });
  }

  // Service details modal function
  window.openServiceModal = function(serviceTitle, serviceDescription) {
    const modal = document.getElementById('service-modal');
    const titleEl = document.getElementById('service-modal-title');
    const descEl = document.getElementById('service-modal-desc');

    if (modal && titleEl && descEl) {
      titleEl.textContent = serviceTitle;
      descEl.textContent = serviceDescription;
      modal.classList.add('active');
    }
  };

  const serviceModalClose = document.getElementById('service-modal-close');
  if (serviceModalClose) {
    serviceModalClose.addEventListener('click', () => {
      document.getElementById('service-modal').classList.remove('active');
    });
  }

  // Close modals when clicking outside content
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.classList.remove('active');
    }
  });

  // Animated Counter for Stats Section
  const counters = document.querySelectorAll('.stat-number');
  let speed = 200;

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace(/[^0-9]/g, '');
        const inc = Math.ceil(target / speed);

        if (count < target) {
          counter.innerText = (count + inc).toLocaleString('en-IN') + '+';
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = target.toLocaleString('en-IN') + ' +';
        }
      };
      updateCount();
    });
  };

  // Trigger counter animation on scroll
  const statsSection = document.querySelector('.stats-section');
  let animated = false;

  if (statsSection) {
    window.addEventListener('scroll', () => {
      const sectionPos = statsSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight / 1.3;

      if (sectionPos < screenPos && !animated) {
        animateCounters();
        animated = true;
      }
    });
  }
});
