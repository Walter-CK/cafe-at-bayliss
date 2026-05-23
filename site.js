(function () {
    const menu = window.BAYLISS_MENU;
    const page = document.body.dataset.page;

    function asset(path) {
        const depth = document.body.dataset.depth || "";
        return `${depth}${path}`;
    }

    function renderCategoryCards() {
        const grid = document.getElementById("categoryGrid");
        if (!grid || !menu) return;

        grid.innerHTML = menu.categories.map((category) => `
            <a class="category-card" href="${category.slug}/" style="--card-image: url('${category.image}')">
                <span class="category-card-shade"></span>
                <span class="category-card-content">
                    <span class="category-card-icon"><i class="fa-solid ${category.icon}"></i></span>
                    <span class="category-card-title">${category.name}</span>
                    <span class="category-card-copy">${category.intro}</span>
                    <span class="category-card-meta">${category.items.length} items <i class="fa-solid fa-arrow-right"></i></span>
                </span>
            </a>
        `).join("");
    }

    function renderCategoryPage() {
        const slug = document.body.dataset.category;
        const category = menu.categories.find((item) => item.slug === slug);
        if (!category) return;

        document.title = `${category.name} | Cafe at Bayliss`;

        const hero = document.querySelector(".category-hero");
        if (hero) hero.style.setProperty("--hero-image", `url('../${category.image}')`);

        const title = document.getElementById("categoryTitle");
        const intro = document.getElementById("categoryIntro");
        const count = document.getElementById("categoryCount");
        const list = document.getElementById("categoryItems");
        const order = document.getElementById("categoryOrder");

        if (title) title.textContent = category.name;
        if (intro) intro.textContent = category.intro;
        if (count) count.textContent = `${category.items.length} menu items`;
        if (order) order.href = `../order/?category=${encodeURIComponent(category.name)}`;
        if (list) {
            list.innerHTML = category.items.map(([name, price, description]) => `
                <article class="listing-item">
                    <div>
                        <h3>${name}</h3>
                        ${description ? `<p>${description}</p>` : ""}
                    </div>
                    <strong>${price}</strong>
                </article>
            `).join("");
        }
    }

    function initLightbox() {
        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightbox-img");
        if (!lightbox || !lightboxImg) return;

        document.querySelectorAll("[data-lightbox] img, .update-card-img img, .about-photo img").forEach((img) => {
            img.addEventListener("click", () => {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add("open");
            });
        });

        lightbox.addEventListener("click", () => lightbox.classList.remove("open"));
    }

    function initUpdatesScroll() {
        const updatesScroll = document.getElementById("updatesScroll");
        if (!updatesScroll) return;

        updatesScroll.addEventListener("wheel", function (event) {
            const primaryDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
            event.preventDefault();
            this.scrollBy({ left: primaryDelta, behavior: "auto" });
        }, { passive: false });
    }

    function initOrderForm() {
        const form = document.getElementById("orderForm");
        if (!form) return;

        const params = new URLSearchParams(window.location.search);
        const category = params.get("category");
        const itemInput = document.getElementById("orderItem");
        if (category && itemInput && !itemInput.value) {
            itemInput.value = `${category}: `;
            itemInput.focus();
        }

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const message = document.getElementById("orderMessage");
            if (message) {
                message.textContent = "Thanks. This demo enquiry form has not sent anything yet, so please call Cafe at Bayliss on (07) 3803 7897 to place the order.";
                message.hidden = false;
            }
        });
    }

    if (page === "home") renderCategoryCards();
    if (page === "category") renderCategoryPage();
    initLightbox();
    initUpdatesScroll();
    initOrderForm();
})();
