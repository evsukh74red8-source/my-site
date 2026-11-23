// 1. Typing-эффект в hero
const phrases = [
    "Диагностика и ремонт электронных систем",
    "Проектирование плат в KiCad",
    "Локальные AI-агенты на Qwen",
    "Разработка ПО для оборудования"
];
const typed = document.getElementById("typed");
let pi = 0, ci = 0, del = false;

function type() {
    const cur = phrases[pi];
    if (!del) {
        ci++;
        typed.textContent = cur.slice(0, ci);
        if (ci === cur.length) { del = true; setTimeout(type, 2000); return; }
    } else {
        ci--;
        typed.textContent = cur.slice(0, ci);
        if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, del ? 35 : 60);
}
type();

// 2. Появление секций при скролле
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
    });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(function(el) { observer.observe(el); });

// 3. 3D-наклон карточек за курсором
document.querySelectorAll(".card").forEach(function(card) {
    card.addEventListener("mousemove", function(ev) {
        const r = card.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width - 0.5;
        const y = (ev.clientY - r.top) / r.height - 0.5;
        card.style.transform = "perspective(800px) rotateY(" + (x * 10) + "deg) rotateX(" + (-y * 10) + "deg) translateY(-4px)";
    });
    card.addEventListener("mouseleave", function() {
        card.style.transform = "";
    });
});

// 4. Анимированные счётчики
const nums = document.querySelectorAll(".stat-num");
const numObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
        if (!e.isIntersecting) return;
        const el = e.target, target = +el.dataset.target, dur = 1400, t0 = performance.now();
        function tick(t) {
            const p = Math.min((t - t0) / dur, 1);
            el.textContent = Math.floor(p * target) + (target === 100 ? "%" : "+");
            if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        numObs.unobserve(el);
    });
}, { threshold: 0.6 });
nums.forEach(function(n) { numObs.observe(n); });