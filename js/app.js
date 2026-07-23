const EMAILJS_PUBLIC_KEY = "fSRQvp2ftB6OHndUe";
const EMAILJS_SERVICE_ID = "service_xhh5uvf";
const EMAILJS_TEMPLATE_CLIENT = "template_hktlvhp";
const EMAILJS_TEMPLATE_ADMIN = "template_vbrz3in";

// Initialize EmailJS browser SDK
if (typeof emailjs !== 'undefined') {
  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY,
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initHampyRouter();
  initBookingModal();
  initScrollBubbles();
  initScrollReveals();
  initAmbientBubbles();
  initPricingCalculator();
  initBookingPage();
});

window.addEventListener('load', () => {
  // Re-run once layouts and images are fully loaded
  initAmbientBubbles();
});

function initHampyRouter() {
  const navLinks = document.querySelectorAll('[data-router]');
  const viewPanels = document.querySelectorAll('.hampy-view-panel');

  function navigateTo(targetId) {
    viewPanels.forEach(p => p.classList.remove('active'));
    const targetPanel = document.getElementById(`view-${targetId}`);
    if (targetPanel) {
      targetPanel.classList.add('active');
    } else {
      document.getElementById('view-home').classList.add('active');
    }

    navLinks.forEach(link => {
      if (link.dataset.router === targetId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(link.dataset.router);
    });
  });
}

function initBookingModal() {
  const modal = document.getElementById('hampyModal');
  const openBtns = document.querySelectorAll('.open-hampy-modal');
  const closeBtn = document.getElementById('closeHampyModal');
  const form = document.getElementById('hampyForm');
  const success = document.getElementById('hampySuccess');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) modal.style.display = 'flex';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (modal) modal.style.display = 'none';
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      if (success) success.style.display = 'block';
    });
  }
}

/* Dynamic Scroll-Bound Soap Bubbles System (Direct Scroll-Driven Interaction) */
function initScrollBubbles() {
  const container = document.querySelector('.scroll-bubble-stream');
  if (!container) return;

  // Clear existing static bubbles
  container.innerHTML = '';

  const numBubbles = 48;
  const bubbleData = [];

  // Generate bubble elements programmatically
  for (let i = 0; i < numBubbles; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'scroll-bubble';

    // Sizes ranging from 30px to 180px
    const size = Math.random() * 150 + 30;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    // Random horizontal position (0% to 95%)
    const left = Math.random() * 95;
    bubble.style.left = `${left}%`;

    // Staggered vertical start position shifted down by another full screen (~3000px total shift)
    const startY = Math.random() * 1400 + 3000;
    bubble.style.top = `${startY}px`;

    // Random parallax speed (0.35 to 1.15)
    const speed = Math.random() * 0.8 + 0.35;
    
    // Random horizontal sway amplitude (20px to 80px) and frequency
    const swayAmp = Math.random() * 60 + 20;
    const swayFreq = 0.002 + Math.random() * 0.003;
    const swayPhase = Math.random() * Math.PI * 2;

    container.appendChild(bubble);

    bubbleData.push({
      element: bubble,
      startY: startY,
      speed: speed,
      swayAmp: swayAmp,
      swayFreq: swayFreq,
      swayPhase: swayPhase
    });
  }

  // Update bubble transforms on scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    bubbleData.forEach(b => {
      // Calculate scroll-bound vertical offset
      const translateY = -(scrollY * b.speed);
      
      // Calculate natural horizontal wave sway
      const translateX = Math.sin(scrollY * b.swayFreq + b.swayPhase) * b.swayAmp;
      
      // Rotate slightly
      const rotate = scrollY * 0.05 * (b.speed > 0.7 ? 1 : -1);

      b.element.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg)`;
    });
  });
}

/* Intersection Observer for premium scroll entrance reveals */
function initScrollReveals() {
  const wrappers = document.querySelectorAll('.hampy-centered-card-wrapper');
  if (!wrappers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15
  });

  wrappers.forEach(w => observer.observe(w));
}

/* Continuous Ambient Viewport Bubbles Flow (From absolute bottom of website to absolute top) */
function initAmbientBubbles() {
  const container = document.querySelector('.ambient-bubble-stream');
  if (!container) return;

  container.innerHTML = '';

  const numAmbient = 32;
  for (let i = 0; i < numAmbient; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'ambient-bubble';

    // Random sizes (30px to 130px)
    const size = Math.random() * 100 + 30;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    // Random horizontal position (0% to 95%)
    bubble.style.left = `${Math.random() * 95}vw`;

    // Very slow durations to float up the entire height of the site (40s to 80s)
    const duration = Math.random() * 40 + 40;
    
    // Staggered delays distributed across the entire duration (so they cover the full site height instantly)
    const delay = Math.random() * -duration;

    // Random drift horizontal offset
    const drift = Math.random() * 140 - 70; // -70px to 70px
    bubble.style.setProperty('--drift', `${drift}px`);

    bubble.style.animation = `ambientRise ${duration}s linear ${delay}s infinite`;

    container.appendChild(bubble);
  }
}

/* Interactive Pricing Estimator Calculator */
function initPricingCalculator() {
  const minusBtn = document.getElementById('calc-minus');
  const plusBtn = document.getElementById('calc-plus');
  const binCountEl = document.getElementById('calc-bin-count');
  const frequencyToggle = document.querySelectorAll('.calc-freq-option');
  const totalPriceEl = document.getElementById('calc-total-price');
  const periodEl = document.getElementById('calc-period');

  if (!binCountEl) return;

  let binCount = 1;
  let frequency = 'monthly'; // 'monthly' or 'onetime'

  function updatePrice() {
    let rate = 60;
    if (frequency === 'onetime') {
      rate = 20;
    }
    const total = binCount * rate;
    totalPriceEl.textContent = `$${total}`;
    periodEl.textContent = frequency === 'monthly' ? '/ 6 months' : ' one-time';
    binCountEl.textContent = binCount;
  }

  minusBtn.addEventListener('click', () => {
    if (binCount > 1) {
      binCount--;
      updatePrice();
    }
  });

  plusBtn.addEventListener('click', () => {
    if (binCount < 10) {
      binCount++;
      updatePrice();
    }
  });

  frequencyToggle.forEach(opt => {
    opt.addEventListener('click', () => {
      frequencyToggle.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      frequency = opt.dataset.freq;
      updatePrice();
    });
  });

  const bookBtn = document.getElementById('calc-book-btn');
  if (bookBtn) {
    bookBtn.addEventListener('click', () => {
      window.location.href = `booking.html?plan=${frequency}&bins=${binCount}`;
    });
  }

  updatePrice();
}

/* Dedicated Booking Page Logic */
function initBookingPage() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  const planPills = document.querySelectorAll('.plan-pill-opt');
  const binCountEl = document.getElementById('book-bin-count');
  const plusBtn = document.getElementById('book-plus');
  const minusBtn = document.getElementById('book-minus');

  // Summary Elements
  const summaryPlanText = document.getElementById('summary-plan-text');
  const summaryBinsText = document.getElementById('summary-bins-text');
  const summaryTotalPrice = document.getElementById('summary-total-price');
  const summaryPeriod = document.getElementById('summary-period');
  const dateInput = document.getElementById('cust-date');
  const timeInput = document.getElementById('cust-time');
  const summaryDateTime = document.getElementById('summary-datetime-text');
  
  // Paneling Elements
  const mainPanel = document.getElementById('booking-main-panel');
  const successPanel = document.getElementById('booking-success-panel');
  const successCustName = document.getElementById('success-cust-name');

  // Parse URL search parameters
  const params = new URLSearchParams(window.location.search);
  let plan = params.get('plan') === 'onetime' ? 'onetime' : 'monthly';
  let bins = parseInt(params.get('bins')) || 1;
  if (bins < 1) bins = 1;

  // Set date restriction: min date is 2 days in the future (today + 2 days)
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 2);
  const yyyy = minDate.getFullYear();
  const mm = String(minDate.getMonth() + 1).padStart(2, '0');
  const dd = String(minDate.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;

  function updateSummary() {
    // Sync UI selection pills
    planPills.forEach(pill => {
      if (pill.dataset.plan === plan) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    // Update bin quantity counter text
    binCountEl.textContent = bins;

    // Update Live Summary Box
    summaryPlanText.textContent = plan === 'monthly' ? '6-Month Plan' : 'One-Time Clean';
    summaryBinsText.textContent = bins + (bins === 1 ? ' Trash/Recycle Bin' : ' Bins');

    // Calculate rates
    const rate = plan === 'monthly' ? 60 : 20;
    const total = bins * rate;
    summaryTotalPrice.textContent = `$${total}`;
    summaryPeriod.textContent = plan === 'monthly' ? 'upfront' : 'one-time';

    const dateVal = dateInput.value ? dateInput.value : 'Not selected';
    const timeVal = timeInput.value;
    summaryDateTime.textContent = dateInput.value ? `${dateVal} (${timeVal})` : 'Not selected';
  }

  // Bind Plus/Minus Buttons
  plusBtn.addEventListener('click', () => {
    if (bins < 10) {
      bins++;
      updateSummary();
    }
  });

  minusBtn.addEventListener('click', () => {
    if (bins > 1) {
      bins--;
      updateSummary();
    }
  });

  // Bind Date and Time Inputs
  dateInput.addEventListener('change', updateSummary);
  timeInput.addEventListener('change', updateSummary);

  // Bind Plan Selection Pills
  planPills.forEach(pill => {
    pill.addEventListener('click', () => {
      plan = pill.dataset.plan;
      updateSummary();
    });
  });

  // Form Submission via EmailJS
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Disable button to prevent double clicks
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending Booking Request...";

    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const email = document.getElementById('cust-email').value;
    const street = document.getElementById('cust-street').value;
    const city = document.getElementById('cust-city').value;
    const zip = document.getElementById('cust-zip').value;
    const address = `${street}, ${city}, CA ${zip}`;
    const rate = plan === 'monthly' ? 60 : 20;
    const total = bins * rate;

    const templateParams = {
      name: name,
      email: email,
      phone: phone,
      address: address,
      plan: plan === 'monthly' ? '6-Month Plan ($60/bin upfront)' : 'One-Time Clean ($20/bin)',
      binsCount: bins,
      preferredDate: dateInput.value,
      preferredTimeWindow: timeInput.value,
      totalDue: `$${total}`,
      water_faucet_access: document.getElementById('agree-faucet').checked ? 'Agreed' : 'No',
      electricity_plug_access: document.getElementById('agree-plug').checked ? 'Agreed' : 'No',
      in_person_payment_terms: document.getElementById('agree-payment').checked ? 'Agreed' : 'No'
    };

    // Send customer confirmation template & admin notification concurrently
    Promise.all([
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_CLIENT, templateParams, EMAILJS_PUBLIC_KEY),
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ADMIN, templateParams, EMAILJS_PUBLIC_KEY)
    ]).then(() => {
      // Transition panels
      mainPanel.style.display = 'none';
      successPanel.style.display = 'block';
      successCustName.textContent = name;
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }).catch(err => {
      console.error("EmailJS transmission failed:", err);
      const errorMsg = err.text || err.message || JSON.stringify(err) || "Unknown Error";
      alert("Failed to submit request: " + errorMsg + "\n\nPlease verify your details or contact us directly at freshorasd@gmail.com.");
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    });
  });

  // Initial render
  updateSummary();
}
