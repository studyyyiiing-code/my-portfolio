/**
 * header.html, footer.html 등의 공통 요소를 동적으로 로드합니다.
 * 로드가 완료되면 'componentsLoaded' 이벤트를 발생시켜 main.js가 이를 감지하도록 합니다.
 */
async function loadComponents() {
    const includes = document.querySelectorAll('[data-include]');
    
    const promises = Array.from(includes).map(async (el) => {
        const file = el.getAttribute('data-include');
        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error(`Could not load ${file}`);
            const content = await response.text();
            el.outerHTML = content; // div 태그 자체를 로드된 내용으로 교체
        } catch (error) {
            console.error('Component Load Error:', error);
        }
    });

    await Promise.all(promises);

    // 모든 컴포넌트 로딩이 완료되면 커스텀 이벤트 발생
    document.dispatchEvent(new Event('componentsLoaded'));
}

// DOM이 로드되면 실행
document.addEventListener('DOMContentLoaded', loadComponents);
