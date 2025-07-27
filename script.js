// Cuộn mượt cho tất cả liên kết anchor
const lienKetNav = document.querySelectorAll('.nav-links a');
lienKetNav.forEach(lk => {
    lk.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Hiệu ứng fade-in cho section khi cuộn tới
const cacSectionFade = document.querySelectorAll('.fade-section');
function xuLySectionFade() {
    const diemKichHoat = window.innerHeight * 0.85;
    cacSectionFade.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < diemKichHoat) {
            sec.classList.add('visible');
            // Hiệu ứng cho card bên trong
            const cards = sec.querySelectorAll('.card');
            cards.forEach((card, idx) => {
                card.style.animationDelay = (0.2 + idx * 0.15) + 's';
                card.classList.add('visible');
            });
        } else {
            sec.classList.remove('visible');
            const cards = sec.querySelectorAll('.card');
            cards.forEach(card => {
                card.classList.remove('visible');
                card.style.animationDelay = '0s';
            });
        }
    });
}
window.addEventListener('scroll', xuLySectionFade);
window.addEventListener('load', xuLySectionFade);

// Đánh dấu link navbar active khi cuộn tới section
function capNhatNavActive() {
    let viTriCuon = window.scrollY + 120;
    lienKetNav.forEach(lk => {
        const href = lk.getAttribute('href');
        if (href.startsWith('#')) {
            const sec = document.querySelector(href);
            if (sec) {
                const top = sec.offsetTop;
                const bottom = top + sec.offsetHeight;
                if (viTriCuon >= top && viTriCuon < bottom) {
                    lk.classList.add('active');
                } else {
                    lk.classList.remove('active');
                }
            }
        }
    });
}
window.addEventListener('scroll', capNhatNavActive);
window.addEventListener('load', capNhatNavActive);

// Nút lên đầu trang
const nutLenDauTrang = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        nutLenDauTrang.classList.add('show');
    } else {
        nutLenDauTrang.classList.remove('show');
    }
});
nutLenDauTrang.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Menu mobile (hamburger)
const nutMenu = document.getElementById('menuToggle');
const danhSachNav = document.querySelector('.nav-links');
nutMenu.addEventListener('click', () => {
    danhSachNav.classList.toggle('open');
});
// Đóng menu khi chọn link trên mobile
lienKetNav.forEach(lk => {
    lk.addEventListener('click', () => {
        if(window.innerWidth <= 700) {
            danhSachNav.classList.remove('open');
        }
    });
});

// Fade-in cho gallery-item khi cuộn tới
function xuLyGalleryFadeIn() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const diemKichHoat = window.innerHeight * 0.92;
    galleryItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < diemKichHoat) {
            item.classList.add('visible');
        } else {
            item.classList.remove('visible');
        }
    });
}
window.addEventListener('scroll', xuLyGalleryFadeIn);
window.addEventListener('load', xuLyGalleryFadeIn); 

// Dữ liệu slider và mô tả chi tiết cho từng card (theo thứ tự các card trong HTML)
const duLieuPopup = [
  // Sự kiện lịch sử
  {
    title: 'Chiến thắng Điện Biên Phủ',
    desc: 'Chiến thắng Điện Biên Phủ năm 1954 là một trong những mốc son chói lọi của lịch sử Việt Nam, kết thúc thắng lợi cuộc kháng chiến chống Pháp.',
    images: [
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    title: 'Cách mạng Tháng Tám',
    desc: 'Cách mạng Tháng Tám năm 1945 đã khai sinh nước Việt Nam Dân chủ Cộng hòa, mở ra kỷ nguyên độc lập tự do cho dân tộc.',
    images: [
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=600&q=80'
    ]
  },
  // Địa danh nổi bật
  {
    title: 'Vịnh Hạ Long',
    desc: 'Vịnh Hạ Long là di sản thiên nhiên thế giới với hàng nghìn đảo đá vôi kỳ vĩ trên biển xanh, là điểm đến không thể bỏ lỡ của Việt Nam.',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    title: 'Phố cổ Hội An',
    desc: 'Phố cổ Hội An là di sản văn hóa thế giới, nổi bật với kiến trúc cổ kính và đèn lồng rực rỡ, lưu giữ nhiều giá trị truyền thống.',
    images: [
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
    ]
  },
  // Anh hùng dân tộc
  {
    title: 'Trần Hưng Đạo',
    desc: 'Trần Hưng Đạo là danh tướng kiệt xuất, ba lần đánh bại quân Nguyên Mông, bảo vệ Đại Việt, được nhân dân tôn kính.',
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    title: 'Võ Nguyên Giáp',
    desc: 'Đại tướng Võ Nguyên Giáp là người chỉ huy nhiều chiến dịch lịch sử, góp phần quan trọng vào thắng lợi của dân tộc Việt Nam.',
    images: [
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80'
    ]
  },
  // Văn hóa - Nghệ thuật
  {
    title: 'Áo dài',
    desc: 'Áo dài là trang phục truyền thống tôn vinh vẻ đẹp dịu dàng, thanh lịch của người Việt, là biểu tượng văn hóa đặc sắc.',
    images: [
      'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    title: 'Trống đồng',
    desc: 'Trống đồng là biểu tượng văn hóa lâu đời, gắn liền với nền văn minh Đông Sơn, thể hiện tinh thần và bản sắc Việt.',
    images: [
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80'
    ]
  },
  // Giá trị nhân văn
  {
    title: 'Tinh thần đoàn kết',
    desc: 'Tinh thần đoàn kết là giá trị cốt lõi giúp dân tộc Việt Nam vượt qua mọi thử thách lịch sử, xây dựng đất nước vững mạnh.',
    images: [
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    title: 'Uống nước nhớ nguồn',
    desc: 'Truyền thống biết ơn, tôn trọng cội nguồn, tổ tiên là giá trị nhân văn sâu sắc của người Việt Nam.',
    images: [
      'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd9?auto=format&fit=crop&w=600&q=80'
    ]
  }
];

// Popup modal logic (fix lỗi popupClose is null)
const popupModal = document.getElementById('popupModal');
const popupClose = document.getElementById('popupClose');
const sliderImages = document.getElementById('sliderImages');
const popupTitle = document.getElementById('popupTitle');
const popupDesc = document.getElementById('popupDesc');
const sliderPrev = document.getElementById('sliderPrev');
const sliderNext = document.getElementById('sliderNext');

let popupHienTai = 0;
let slideHienTai = 0;

if (popupClose && popupModal && sliderImages && popupTitle && popupDesc && sliderPrev && sliderNext) {
  // Gán data-index cho từng nút 'Tìm hiểu thêm'
  document.querySelectorAll('.btn-secondary').forEach((btn, idx) => {
    btn.setAttribute('data-index', idx);
  });

  function moPopup(idx) {
    const data = duLieuPopup[idx];
    if (!data) return;
    popupHienTai = idx;
    slideHienTai = 0;
    popupTitle.textContent = data.title;
    popupDesc.textContent = data.desc;
    hienSliderAnh(data.images, slideHienTai);
    popupModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function dongPopup() {
    popupModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function hienSliderAnh(images, activeIdx) {
    sliderImages.innerHTML = '';
    images.forEach((img, i) => {
      const image = document.createElement('img');
      image.src = img;
      image.style.opacity = (i === activeIdx) ? '1' : '0';
      image.style.position = 'absolute';
      image.style.left = '0';
      image.style.top = '0';
      image.style.width = '100%';
      image.style.height = '100%';
      image.style.transition = 'opacity 0.4s';
      sliderImages.appendChild(image);
    });
  }

  function chuyenSlide(dir) {
    const data = duLieuPopup[popupHienTai];
    if (!data) return;
    slideHienTai += dir;
    if (slideHienTai < 0) slideHienTai = data.images.length - 1;
    if (slideHienTai >= data.images.length) slideHienTai = 0;
    hienSliderAnh(data.images, slideHienTai);
  }

  // Sự kiện mở popup
  Array.from(document.querySelectorAll('.btn-secondary')).forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const idx = parseInt(this.getAttribute('data-index'));
      moPopup(idx);
    });
  });
  // Đóng popup
  popupClose.addEventListener('click', dongPopup);
  popupModal.addEventListener('click', function(e) {
    if (e.target === popupModal) dongPopup();
  });
  // Slider
  sliderPrev.addEventListener('click', function(e) {
    e.stopPropagation();
    chuyenSlide(-1);
  });
  sliderNext.addEventListener('click', function(e) {
    e.stopPropagation();
    chuyenSlide(1);
  });
}

// Banner slider logic
const cacAnhBanner = document.querySelectorAll('.banner-slider .slider-image');
const nutPrevBanner = document.getElementById('bannerSliderPrev');
const nutNextBanner = document.getElementById('bannerSliderNext');
const cacChamBanner = document.getElementById('bannerSliderDots');
let bannerHienTai = 0;
let timerBanner = null;

function hienSlideBanner(idx) {
  cacAnhBanner.forEach((img, i) => {
    img.classList.toggle('active', i === idx);
  });
  if (cacChamBanner) {
    Array.from(cacChamBanner.children).forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
  }
  bannerHienTai = idx;
}
function nextSlideBanner() {
  let idx = bannerHienTai + 1;
  if (idx >= cacAnhBanner.length) idx = 0;
  hienSlideBanner(idx);
}
function prevSlideBanner() {
  let idx = bannerHienTai - 1;
  if (idx < 0) idx = cacAnhBanner.length - 1;
  hienSlideBanner(idx);
}
function batTuDongBanner() {
  timerBanner = setInterval(nextSlideBanner, 4000);
}
function dungTuDongBanner() {
  if (timerBanner) clearInterval(timerBanner);
}
if (cacAnhBanner.length) {
  // Tạo chấm tròn
  if (cacChamBanner) {
    cacChamBanner.innerHTML = '';
    for (let i = 0; i < cacAnhBanner.length; i++) {
      const dot = document.createElement('div');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => hienSlideBanner(i));
      cacChamBanner.appendChild(dot);
    }
  }
  hienSlideBanner(0);
  batTuDongBanner();
  // Nút chuyển
  if (nutPrevBanner && nutNextBanner) {
    nutPrevBanner.addEventListener('click', () => { prevSlideBanner(); dungTuDongBanner(); batTuDongBanner(); });
    nutNextBanner.addEventListener('click', () => { nextSlideBanner(); dungTuDongBanner(); batTuDongBanner(); });
  }
  // Dừng auto khi hover
  document.querySelector('.banner-slider').addEventListener('mouseenter', dungTuDongBanner);
  document.querySelector('.banner-slider').addEventListener('mouseleave', batTuDongBanner);
}

// Testimonial slider logic
(function() {
  const testimonialItems = document.querySelectorAll('.testimonial-item');
  const btnPrev = document.querySelector('.testimonial-btn.prev');
  const btnNext = document.querySelector('.testimonial-btn.next');
  let current = 0;
  let autoTimer = null;

  function showTestimonial(idx) {
    testimonialItems.forEach((item, i) => {
      item.classList.toggle('active', i === idx);
    });
    current = idx;
  }
  function nextTestimonial() {
    let idx = (current + 1) % testimonialItems.length;
    showTestimonial(idx);
  }
  function prevTestimonial() {
    let idx = (current - 1 + testimonialItems.length) % testimonialItems.length;
    showTestimonial(idx);
  }
  if (btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => {
      prevTestimonial();
      resetAuto();
    });
    btnNext.addEventListener('click', () => {
      nextTestimonial();
      resetAuto();
    });
  }
  function autoSlide() {
    autoTimer = setInterval(nextTestimonial, 6000);
  }
  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }
  function resetAuto() {
    stopAuto();
    autoSlide();
  }
  const slider = document.querySelector('.testimonial-slider');
  if (slider) {
    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', autoSlide);
    autoSlide();
  }
})();

// Confetti effect when click main button
function taoConfetti() {
  const confettiColors = ['#ffd700', '#ff6b35', '#4ecdc4', '#008037', '#f5576c', '#43e97b'];
  const confettiContainer = document.createElement('div');
  confettiContainer.className = 'confetti';
  for (let i = 0; i < 48; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.animationDelay = (Math.random() * 0.7) + 's';
    piece.style.transform = `rotate(${Math.random()*360}deg)`;
    confettiContainer.appendChild(piece);
  }
  document.body.appendChild(confettiContainer);
  setTimeout(() => confettiContainer.remove(), 2500);
}

const nutKhamPha = document.querySelector('.btn-primary');
if (nutKhamPha) {
  nutKhamPha.addEventListener('click', () => {
    taoConfetti();
  });
}

// Định nghĩa openModal cho tương thích với HTML cũ
function openModal(idx) {
  if (typeof moPopup === 'function') moPopup(idx);
}

// Gán sự kiện click cho các nút 'Xem chi tiết' để mở modal
window.addEventListener('DOMContentLoaded', function() {
  const detailButtons = document.querySelectorAll('button.artifact-detail-button');
  detailButtons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      // Lấy id hiện vật từ openModal('...') trong onclick
      const onclickAttr = btn.getAttribute('onclick');
      if (onclickAttr && onclickAttr.includes('openModal')) {
        e.preventDefault();
        // Lấy tham số truyền vào openModal
        const match = onclickAttr.match(/openModal\(['\"]?(\w+)['\"]?\)/);
        if (match && match[1]) {
          openModal(match[1]);
        }
      }
    });
  });
});

// Gán sự kiện click cho các nút 'Tìm hiểu thêm' để chuyển trang
window.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a.btn-secondary');
  // Danh sách các trang chi tiết tương ứng thứ tự các nút
  const detailPages = [
    'info1.html',
    'info2.html',
    'info12.html',
    'info13.html',
    // 'info6.html', hội an
    'info3.html',
    'info4.html',
    'info14.html',
    'info11.html',
    'info15.html',
     'info6.html',
    'info17.html',
     'info18.html', 
     'info7.html',
     'info8.html',
     'info19.html',
     'info9.html',
     'info10.html',
     'info10.html',
     'info21.html',
     'info22.html',


  ];
  links.forEach(function(link, idx) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      if (detailPages[idx]) {
        window.location.href = detailPages[idx];
      }
    });
  });
});