// Theme Toggle Functionality
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("theme-toggle")
    this.currentTheme = localStorage.getItem("theme") || "light"
    this.init()
  }

  init() {
    this.setTheme(this.currentTheme)
    this.themeToggle.addEventListener("click", () => this.toggleTheme())
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)
    this.currentTheme = theme
    localStorage.setItem("theme", theme)

    const icon = this.themeToggle.querySelector("i")
    if (theme === "dark") {
      icon.className = "fas fa-sun"
    } else {
      icon.className = "fas fa-moon"
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme === "light" ? "dark" : "light"
    this.setTheme(newTheme)
  }
}

// Mobile Navigation
class MobileNav {
  constructor() {
    this.navToggle = document.getElementById("nav-toggle")
    this.navMenu = document.getElementById("nav-menu")
    this.navLinks = document.querySelectorAll(".nav-link")
    this.init()
  }

  init() {
    this.navToggle.addEventListener("click", () => this.toggleMenu())

    // Close menu when clicking on links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => this.closeMenu())
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
        this.closeMenu()
      }
    })
  }

  toggleMenu() {
    this.navMenu.classList.toggle("active")
    this.navToggle.classList.toggle("active")
  }

  closeMenu() {
    this.navMenu.classList.remove("active")
    this.navToggle.classList.remove("active")
  }
}

// Smooth Scrolling for Navigation Links
class SmoothScroll {
  constructor() {
    this.navLinks = document.querySelectorAll('.nav-link[href^="#"]')
    this.init()
  }

  init() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href")
        const targetSection = document.querySelector(targetId)

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80 // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      })
    })
  }
}

// Contact Form Handler
class ContactForm {
  constructor() {
    this.form = document.getElementById("contact-form")
    this.init()
  }

  init() {
    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleSubmit(e))
    }
  }

  async handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(this.form)
    const submitBtn = this.form.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'
    submitBtn.disabled = true

    try {
      const response = await fetch("/contact", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.status === "success") {
        this.showSuccessMessage(result.message)
        this.form.reset()
      } else {
        this.showErrorMessage("Erro ao enviar mensagem. Tente novamente.")
      }
    } catch (error) {
      console.error("Error:", error)
      this.showErrorMessage("Erro ao enviar mensagem. Tente novamente.")
    } finally {
      // Reset button
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }
  }

  showSuccessMessage(message) {
    this.removeExistingMessages()

    const successDiv = document.createElement("div")
    successDiv.className = "success-message show"
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`

    this.form.insertBefore(successDiv, this.form.firstChild)

    setTimeout(() => {
      successDiv.remove()
    }, 5000)
  }

  showErrorMessage(message) {
    this.removeExistingMessages()

    const errorDiv = document.createElement("div")
    errorDiv.className = "error-message show"
    errorDiv.style.cssText = `
            background: var(--error);
            color: white;
            padding: var(--spacing-md);
            border-radius: var(--radius-md);
            margin-bottom: var(--spacing-md);
            animation: fadeInUp 0.5s ease-out;
        `
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`

    this.form.insertBefore(errorDiv, this.form.firstChild)

    setTimeout(() => {
      errorDiv.remove()
    }, 5000)
  }

  removeExistingMessages() {
    const existingMessages = this.form.querySelectorAll(".success-message, .error-message")
    existingMessages.forEach((msg) => msg.remove())
  }
}

// Scroll Animations
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
    this.init()
  }

  init() {
    if ("IntersectionObserver" in window) {
      this.observer = new IntersectionObserver((entries) => this.handleIntersection(entries), this.observerOptions)

      // Observe elements that should animate
      const animatedElements = document.querySelectorAll(
        ".service-card, .testimonial-card, .about-content, .hero-content",
      )

      animatedElements.forEach((el) => {
        el.style.opacity = "0"
        el.style.transform = "translateY(30px)"
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"
        this.observer.observe(el)
      })
    }
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
        this.observer.unobserve(entry.target)
      }
    })
  }
}

// Navbar Background on Scroll
class NavbarScroll {
  constructor() {
    this.navbar = document.querySelector(".navbar")
    this.init()
  }

  init() {
    window.addEventListener("scroll", () => this.handleScroll())
  }

  handleScroll() {
    if (window.scrollY > 50) {
      this.navbar.style.background = "rgba(255, 255, 255, 0.98)"
      if (document.documentElement.getAttribute("data-theme") === "dark") {
        this.navbar.style.background = "rgba(15, 23, 42, 0.98)"
      }
    } else {
      this.navbar.style.background = "rgba(255, 255, 255, 0.95)"
      if (document.documentElement.getAttribute("data-theme") === "dark") {
        this.navbar.style.background = "rgba(15, 23, 42, 0.95)"
      }
    }
  }
}

// Initialize all components when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager()
  new MobileNav()
  new SmoothScroll()
  new ContactForm()
  new ScrollAnimations()
  new NavbarScroll()

  // Add loading animation to hero section
  const heroContent = document.querySelector(".hero-content")
  if (heroContent) {
    heroContent.classList.add("fade-in-up")
  }
})

// Utility function for smooth scrolling to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Add scroll to top functionality
window.addEventListener("scroll", () => {
  const scrollButton = document.querySelector(".scroll-to-top")
  if (scrollButton) {
    if (window.scrollY > 300) {
      scrollButton.style.display = "block"
    } else {
      scrollButton.style.display = "none"
    }
  }
})
