/**
 * include.js가 컴포넌트 로딩을 완료한 시점('componentsLoaded')에 실행됩니다.
 * 이벤트 위임이나 초기화 로직을 여기에 작성합니다.
 */
document.addEventListener('componentsLoaded', () => {
    initTheme();
    initMobileMenu();
    highlightActiveLink();
});

// 1. 다크 모드 초기화 및 토글
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const icon = themeToggleBtn.querySelector('i');
    
    // 저장된 테마 불러오기 (없으면 시스템 설정 따름)
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    // 버튼 클릭 이벤트
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });
}

// 2. 모바일 메뉴 토글
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // 아이콘 변경 (옵션)
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// 3. 현재 페이지 네비게이션 하이라이트
function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        // href 속성값 가져오기 (예: "about.html")
        const href = link.getAttribute('href');
        
        // 현재 경로에 해당 href가 포함되어 있다면 active 클래스 추가
        // index.html의 경우 루트 경로('/')일 때도 처리
        if (currentPath.includes(href) || (currentPath.endsWith('/') && href === 'index.html')) {
            link.classList.add('active-link');
            link.style.color = 'var(--accent-color)';
            link.style.fontWeight = '700';
        }
    });
}
