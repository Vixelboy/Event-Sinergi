/**
 * CV. SINERGI MUDA PRATAMA - Main JavaScript
 * Handles navigation, animations, portfolio filtering, modal viewer,
 * interactive cost calculator, and WhatsApp message generator.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar on Scroll
  const navWrapper = document.querySelector('.navbar-wrapper');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navWrapper.classList.add('scrolled');
    } else {
      navWrapper.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // 3. Portfolio Data & Modal Viewer
  const portfolioData = {
    'item-aveeno-3d': {
      title: '3D Venue Setup & Booth Design - Aveeno Baby',
      category: 'booth',
      badge: 'Venue Setup (3D Concept)',
      image: 'assets/images/booth_3d_design.jpg',
      client: 'Brand Aveeno Baby / Johnson & Johnson',
      scale: 'Exhibition Booth 3x3 Meter',
      year: '2024',
      desc: 'Konsep desain 3D venue setup booth display pameran untuk Aveeno Baby. Mengusung konsep natural organic dengan visual wheat grass, display rack modular minimalis hitam, meja kasir melengkung beraksen warm LED, serta branding visual beresolusi tinggi.'
    },
    'item-aveeno-real': {
      title: 'Venue Setup Execution - Aveeno Baby Exhibition',
      category: 'booth',
      badge: 'Venue Setup (Realisasi Lapangan)',
      image: 'assets/images/booth_real_setup.jpg',
      client: 'Brand Aveeno Baby',
      scale: 'Exhibition Hall On-Site',
      year: '2024',
      desc: 'Eksekusi fabrikasi dan instalasi on-site venue setup booth pameran Aveeno Baby. Realisasi 100% presisi sesuai desain 3D awal, lengkap dengan instalasi spotlight panggung, display shelf produk, backdrop grafis, dan counter pameran.'
    },
    'item-unilever': {
      title: 'Brand Activation & On-Ground Manpower - Unilever Campaign',
      category: 'manpower',
      badge: 'Manpower & Activation',
      image: 'assets/images/manpower_activation.jpg',
      client: 'Unilever Indonesia',
      scale: 'Retail Store Activation (Borma)',
      year: '2024',
      desc: 'Eksekusi direct promo activation produk Unilever (Pepsodent, Lifebuoy, Citra). Menyediakan manpower terlatih (SPG / Brand Ambassador & Event Coordinator), booth display, sound system interaktif untuk promo & announcement, serta games belanja berhadiah.'
    },
    'item-1': {
      title: 'Global Tech Gala & Award 2024',
      category: 'corporate',
      badge: 'Corporate Gala',
      image: 'assets/images/hero.jpg',
      client: 'PT. Quantum Tech Nusantara',
      scale: '1.200 Peserta',
      year: '2024',
      desc: 'Penyelenggaraan annual gala dinner dan apresiasi insan teknologi terbesar, dilengkapi panggung curved LED 360°, lightning show dramatis, dan manajemen pertunjukan musisi nasional secara terintegrasi.'
    },
    'item-2': {
      title: 'Aurora X1 Grand Launching',
      category: 'activation',
      badge: 'Product Launch',
      image: 'assets/images/product_launch.jpg',
      client: 'Aurora Mobile Indonesia',
      scale: '500 VIP & Media',
      year: '2024',
      desc: 'Peluncuran lini flagship smartphone dengan konsep panggung futuristik neon portal, dynamic live streaming broadcasting, serta interactive experience zone untuk para KOL dan jurnalis teknologi.'
    },
    'item-3': {
      title: 'Nusantara Music Wave Festival',
      category: 'concert',
      badge: 'Music Festival',
      image: 'assets/images/festival.jpg',
      client: 'Sinergi Fest Promotor',
      scale: '8.500 Penonton',
      year: '2024',
      desc: 'Festival musik multi-genre 2 hari dengan tata panggung raksasa rigging 20x14m, pyrotechnics kembang api sinkron musik, sistem ticketing digital cashless, serta crowd control berstandar internasional.'
    }
  };

  const modalOverlay = document.getElementById('portfolioModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalBadge = document.getElementById('modalBadge');
  const modalDesc = document.getElementById('modalDesc');
  const modalClient = document.getElementById('modalClient');
  const modalScale = document.getElementById('modalScale');
  const modalYear = document.getElementById('modalYear');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const item = portfolioData[id];
      if (item) {
        modalImg.src = item.image;
        modalTitle.textContent = item.title;
        modalBadge.textContent = item.badge;
        modalDesc.textContent = item.desc;
        modalClient.textContent = item.client;
        modalScale.textContent = item.scale;
        modalYear.textContent = item.year;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // 4. Portfolio Filter System
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          card.style.animation = 'modalIn 0.3s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Interactive Event Cost Calculator
  const calcEventType = document.getElementById('calcEventType');
  const calcScale = document.getElementById('calcScale');
  const calcVenue = document.getElementById('calcVenue');
  const calcFeatures = document.querySelectorAll('.calc-feature');
  
  const summaryEventType = document.getElementById('summaryEventType');
  const summaryScale = document.getElementById('summaryScale');
  const summaryFeatures = document.getElementById('summaryFeatures');
  const calcTotalPrice = document.getElementById('calcTotalPrice');
  const calcWhatsAppBtn = document.getElementById('calcWhatsAppBtn');

  function calculateEstimate() {
    const baseRates = {
      venue_setup: 15000000,
      corporate: 25000000,
      manpower_activation: 12000000,
      concert: 65000000,
      mice: 28000000
    };

    const scaleMultipliers = {
      small: 1.0,
      medium: 1.7,
      large: 2.8,
      mega: 4.8
    };

    const venueAddition = {
      ballroom: 15000000,
      outdoor: 18000000,
      mall: 12000000,
      convention: 22000000,
      office: 5000000
    };

    const eventVal = calcEventType.value;
    const scaleVal = calcScale.value;
    const venueVal = calcVenue.value;

    let base = baseRates[eventVal] || 20000000;
    let multiplier = scaleMultipliers[scaleVal] || 1;
    let venueCost = venueAddition[venueVal] || 8000000;

    let featuresTotal = 0;
    let selectedFeatureNames = [];

    calcFeatures.forEach(chk => {
      if (chk.checked) {
        featuresTotal += parseInt(chk.value, 10);
        selectedFeatureNames.push(chk.getAttribute('data-name'));
      }
    });

    const totalEstimate = Math.round((base * multiplier) + venueCost + featuresTotal);

    // Format Rupiah
    const formatted = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(totalEstimate);

    calcTotalPrice.textContent = formatted;
    summaryEventType.textContent = calcEventType.options[calcEventType.selectedIndex].text;
    summaryScale.textContent = calcScale.options[calcScale.selectedIndex].text;
    summaryFeatures.textContent = selectedFeatureNames.length > 0 
      ? selectedFeatureNames.join(', ') 
      : 'Standar Paket';

    // WhatsApp Direct Link Generator for Calculator (Contact Person: Cantika TD)
    const waPhone = '6285860162796';
    const waText = encodeURIComponent(
      `Halo Kak Cantika TD (CV. SINERGI MUDA PRATAMA),\n` +
      `Saya telah menghitung simulasi kebutuhan event di website:\n\n` +
      `📌 *Kebutuhan Layanan:* ${calcEventType.options[calcEventType.selectedIndex].text}\n` +
      `👥 *Skala Peserta:* ${calcScale.options[calcScale.selectedIndex].text}\n` +
      `📍 *Lokasi/Venue:* ${calcVenue.options[calcVenue.selectedIndex].text}\n` +
      `✨ *Fasilitas Tambahan:* ${selectedFeatureNames.join(', ') || 'Standar'}\n` +
      `💰 *Estimasi Budget:* ${formatted}\n\n` +
      `Mohon info ketersediaan jadwal konsultasi dan proposal resminya. Terima kasih!`
    );
    calcWhatsAppBtn.href = `https://wa.me/${waPhone}?text=${waText}`;
  }

  if (calcEventType && calcScale && calcVenue) {
    [calcEventType, calcScale, calcVenue].forEach(el => el.addEventListener('change', calculateEstimate));
    calcFeatures.forEach(chk => chk.addEventListener('change', calculateEstimate));
    calculateEstimate(); // initial run
  }

  // 6. Contact Form WhatsApp Generator
  const mainContactForm = document.getElementById('mainContactForm');
  if (mainContactForm) {
    mainContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contactName').value.trim();
      const phone = document.getElementById('contactPhone').value.trim();
      const company = document.getElementById('contactCompany').value.trim() || 'Pribadi/Instansi';
      const eventType = document.getElementById('contactEventType').value;
      const eventDate = document.getElementById('contactDate').value;
      const notes = document.getElementById('contactNotes').value.trim();

      const waPhone = '6285860162796'; // Cantika TD
      const message = encodeURIComponent(
        `Halo Kak Cantika TD (CV. SINERGI MUDA PRATAMA),\n` +
        `Saya ingin mengajukan permohonan proposal / konsultasi event:\n\n` +
        `👤 *Nama:* ${name}\n` +
        `🏢 *Perusahaan/Instansi:* ${company}\n` +
        `📞 *Nomor Kontak:* ${phone}\n` +
        `🎉 *Fokus Layanan EO:* ${eventType}\n` +
        `📅 *Rencana Tanggal:* ${eventDate || 'Menyusul'}\n` +
        `📝 *Catatan Kebutuhan:* ${notes || '-'}\n\n` +
        `Mohon informasi lebih lanjut. Terima kasih!`
      );

      // Open WhatsApp in new tab
      window.open(`https://wa.me/${waPhone}?text=${message}`, '_blank');
    });
  }

  // 7. Counter Animation on Scroll
  const counters = document.querySelectorAll('.stat-number');
  let animated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const step = Math.ceil(target / 40);

      const updateCounter = () => {
        count += step;
        if (count < target) {
          counter.textContent = count;
          setTimeout(updateCounter, 25);
        } else {
          counter.textContent = target;
        }
      };
      updateCounter();
    });
  }

  window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.hero-stats-row');
    if (statsSection && !animated) {
      const rect = statsSection.getBoundingClientRect();
      if (rect.top <= window.innerHeight) {
        runCounters();
        animated = true;
      }
    }
  });
});
