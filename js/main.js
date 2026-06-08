// ===== 平滑滚动和导航高亮 =====

document.addEventListener('DOMContentLoaded', function() {
  
  // 导航栏点击平滑滚动
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // 计算导航栏高度，避免内容被遮挡
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // 更新活动导航项
        updateActiveNav(this);
      }
    });
  });

  // "继续查看"箭头点击事件 - Home -> About
  const scrollHintHome = document.getElementById('scrollHintHome');
  if (scrollHintHome) {
    scrollHintHome.addEventListener('click', function() {
      const aboutSection = document.querySelector('.about-section');
      if (aboutSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = aboutSection.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }

  // "继续查看"箭头点击事件 - About -> Gallery
  const scrollHintAbout = document.getElementById('scrollHint');
  if (scrollHintAbout) {
    scrollHintAbout.addEventListener('click', function() {
      const gallerySection = document.querySelector('.gallery-section');
      if (gallerySection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = gallerySection.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }

  // "继续查看"箭头点击事件 - Gallery -> Sound
  const scrollHintGallery = document.getElementById('scrollHintGallery');
  if (scrollHintGallery) {
    scrollHintGallery.addEventListener('click', function() {
      const soundSection = document.querySelector('.sound-section');
      if (soundSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = soundSection.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }

  // "继续查看"箭头点击事件 - Sound -> Links
  const scrollHintSound = document.getElementById('scrollHintSound');
  if (scrollHintSound) {
    scrollHintSound.addEventListener('click', function() {
      const linksSection = document.querySelector('.links-section');
      if (linksSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = linksSection.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }

  // 滚动时导航栏高亮当前区块
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', function() {
    let current = '';
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbarHeight - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    // 更新导航栏活动状态
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === '#' + current) {
        item.classList.add('active');
      }
    });
  });

  // 导航栏滚动效果
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // 滚动时添加阴影效果
    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });

  // 滚动动画 - 元素进入视口时淡入
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // 为各个板块添加滚动动画
  const animatedElements = document.querySelectorAll('.info-card, .gallery-item, .music-item, .social-card');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // 更新活动导航项
  function updateActiveNav(activeItem) {
    navItems.forEach(item => item.classList.remove('active'));
    activeItem.classList.add('active');
  }

  // 页面加载完成后的初始化
  console.log('个人门户网站加载完成！');
  
  // 欢迎信息
  setTimeout(() => {
    console.log('欢迎来到我的个人空间 ~');
  }, 1000);
});

// ===== 图片查看器功能 =====
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const closeModal = document.querySelector('.close-modal');
const galleryItems = document.querySelectorAll('.gallery-item');

// 点击画廊图片打开查看器
galleryItems.forEach(item => {
  item.addEventListener('click', function() {
    const img = this.querySelector('img');
    const caption = this.querySelector('.gallery-overlay span');
      
    if (img) {
      modal.classList.add('show');
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modalCaption.textContent = caption ? caption.textContent : img.alt;
      document.body.style.overflow = 'hidden'; // 防止背景滚动
    }
  });
});

// 点击关闭按钮
if (closeModal) {
  closeModal.addEventListener('click', function() {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // 恢复背景滚动
  });
}

// 点击背景关闭
modal.addEventListener('click', function(e) {
  if (e.target === modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
});

// ESC键关闭
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && modal.classList.contains('show')) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
});

<<<<<<< HEAD
// ===== 鼠标动效：柔和光晕跟随 + 粒子轨迹 =====

(function() {
  // 创建光晕元素
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  document.body.appendChild(cursorGlow);
  
  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;
  let lastParticleTime = 0;
  
  // 监听鼠标移动
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // 创建粒子效果（限制频率）
    const currentTime = Date.now();
    if (currentTime - lastParticleTime > 50) { // 每50ms创建一个粒子
      createParticle(mouseX, mouseY);
      lastParticleTime = currentTime;
    }
  });
  
  // 平滑动画循环
  function animateGlow() {
    // 使用缓动效果让光晕跟随更自然
    const ease = 0.15;
    glowX += (mouseX - glowX) * ease;
    glowY += (mouseY - glowY) * ease;
    
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    
    requestAnimationFrame(animateGlow);
  }
  
  animateGlow();
  
  // 创建粒子
  function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    
    // 随机选择粉色或蓝色
    const colors = [
      'rgba(212, 165, 165, 0.6)',  // 粉色
      'rgba(168, 197, 214, 0.6)',  // 蓝色
      'rgba(212, 165, 165, 0.4)',  // 浅粉
      'rgba(168, 197, 214, 0.4)'   // 浅蓝
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.background = randomColor;
    particle.style.left = (x + (Math.random() - 0.5) * 20) + 'px';
    particle.style.top = (y + (Math.random() - 0.5) * 20) + 'px';
    
    document.body.appendChild(particle);
    
    // 动画结束后移除粒子
    setTimeout(() => {
      particle.remove();
    }, 1000);
  }
  
  // 鼠标离开窗口时隐藏光晕
  document.addEventListener('mouseleave', function() {
    cursorGlow.style.opacity = '0';
  });
  
  document.addEventListener('mouseenter', function() {
    cursorGlow.style.opacity = '1';
  });
})();
=======
// ===== 附加功能：鼠标跟随装饰效果（可选） =====

document.addEventListener('mousemove', function(e) {
  // 可以在这里添加鼠标跟随的装饰效果
  // 例如：微妙的粒子效果或光标轨迹
});
>>>>>>> 4d48532be9f18cf100e9ca9607560447901f508d

// ===== 键盘导航支持 =====

document.addEventListener('keydown', function(e) {
  const navItems = document.querySelectorAll('.nav-item');
  const activeIndex = Array.from(navItems).findIndex(item => item.classList.contains('active'));
  
  // 使用左右箭头键切换导航
  if (e.key === 'ArrowRight' && activeIndex < navItems.length - 1) {
    navItems[activeIndex + 1].click();
  } else if (e.key === 'ArrowLeft' && activeIndex > 0) {
    navItems[activeIndex - 1].click();
  }
});
