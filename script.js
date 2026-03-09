const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".code-panel");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const targetId = tab.dataset.target;

        tabs.forEach((item) => {
            item.classList.remove("is-active");
            item.setAttribute("aria-selected", "false");
        });
        panels.forEach((panel) => {
            panel.classList.remove("is-active");
            panel.hidden = true;
        });

        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");

        const targetPanel = document.getElementById(targetId);
        targetPanel?.classList.add("is-active");
        if (targetPanel) targetPanel.hidden = false;
    });
});

document.querySelectorAll(".copy-button").forEach((button) => {
    button.addEventListener("click", async () => {
        const text = button.dataset.copy;
        if (!text) return;

        try {
            await navigator.clipboard.writeText(text);
            const original = button.textContent;
            button.textContent = "Copied";
            button.classList.add("is-done");
            window.setTimeout(() => {
                button.textContent = original;
                button.classList.remove("is-done");
            }, 1200);
        } catch {
            button.textContent = "Clipboard blocked";
            window.setTimeout(() => {
                button.textContent = "Copy";
            }, 1200);
        }
    });
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15,
    }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
