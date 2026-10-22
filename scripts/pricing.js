// ==========================================================================
// VyxAntix Pricing Page Logic
// Monthly/Annual Toggle + URL param handling + FAQ Accordion
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Billing Switcher Logic
  const tabMonthly = document.getElementById('tabMonthly');
  const tabAnnual = document.getElementById('tabAnnual');

  const starterAmount = document.getElementById('starterAmount');
  const growthAmount = document.getElementById('growthAmount');

  const starterBillingNote = document.getElementById('starterBillingNote');
  const growthBillingNote = document.getElementById('growthBillingNote');

  const pricingData = {
    annual: {
      starterPrice: '₹799',
      starterNote: 'Billed annually · ₹999 if billed monthly<br>Minimum 3 users · prices exclude GST',
      growthPrice: '₹1,499',
      growthNote: 'Billed annually · ₹1,899 if billed monthly<br>Minimum 5 users · prices exclude GST'
    },
    monthly: {
      starterPrice: '₹999',
      starterNote: 'Billed monthly<br>Minimum 3 users · prices exclude GST',
      growthPrice: '₹1,899',
      growthNote: 'Billed monthly<br>Minimum 5 users · prices exclude GST'
    }
  };

  function setBilling(cycle) {
    if (cycle === 'monthly') {
      if (tabMonthly) tabMonthly.classList.add('active');
      if (tabAnnual) tabAnnual.classList.remove('active');

      if (starterAmount) starterAmount.textContent = pricingData.monthly.starterPrice;
      if (starterBillingNote) starterBillingNote.innerHTML = pricingData.monthly.starterNote;

      if (growthAmount) growthAmount.textContent = pricingData.monthly.growthPrice;
      if (growthBillingNote) growthBillingNote.innerHTML = pricingData.monthly.growthNote;
    } else {
      if (tabAnnual) tabAnnual.classList.add('active');
      if (tabMonthly) tabMonthly.classList.remove('active');

      if (starterAmount) starterAmount.textContent = pricingData.annual.starterPrice;
      if (starterBillingNote) starterBillingNote.innerHTML = pricingData.annual.starterNote;

      if (growthAmount) growthAmount.textContent = pricingData.annual.growthPrice;
      if (growthBillingNote) growthBillingNote.innerHTML = pricingData.annual.growthNote;
    }
  }

  if (tabMonthly && tabAnnual) {
    tabMonthly.addEventListener('click', () => setBilling('monthly'));
    tabAnnual.addEventListener('click', () => setBilling('annual'));

    // Check URL query parameters for ?billing=monthly
    const urlParams = new URLSearchParams(window.location.search);
    const billingParam = urlParams.get('billing');
    if (billingParam === 'monthly') {
      setBilling('monthly');
    } else {
      setBilling('annual');
    }
  }

  // 2. FAQ Accordion Logic (one open at a time, first open on load)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all items
        faqItems.forEach(i => {
          i.classList.remove('open');
          const icon = i.querySelector('.faq-icon');
          if (icon) icon.innerHTML = '+';
        });

        // If not already open, open it
        if (!isOpen) {
          item.classList.add('open');
          const icon = item.querySelector('.faq-icon');
          if (icon) icon.innerHTML = '−';
        }
      });
    }
  });
});
