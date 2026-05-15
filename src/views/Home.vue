<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDarkMode = ref(true)

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  document.body.classList.toggle('light-mode', !isDarkMode.value)
}

onMounted(() => {
  // Start with dark mode by default (no light-mode class)
})
</script>

<template>
  <div class="container">
    <div class="card">
      <button class="theme-toggle" @click="toggleTheme" :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'">
        {{ isDarkMode ? '☀️' : '🌙' }}
      </button>

      <div class="profile">
        <div class="avatar">HD</div>
      </div>

      <h1 class="name">Heather Davis, SHRM-CP, PHR</h1>
      <p class="tagline">I design the people systems that make AI adoption actually work | Enterprise Workforce Transformation, Employee Experience, Learning Ecosystems, and Organizational Development.</p>

      <div class="links">
        <a href="mailto:your.email@example.com" class="link-button">
          📧 Email
        </a>
        <a href="https://instagram.com/yourusername" class="link-button" target="_blank" rel="noopener">
          📷 Instagram
        </a>
        <a href="https://linkedin.com/in/yourprofile" class="link-button" target="_blank" rel="noopener">
          💼 LinkedIn
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.card {
  background-color: var(--card-bg);
  border-radius: 1rem;
  padding: 2rem;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: background-color 0.3s ease;
}

.theme-toggle {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.theme-toggle:hover {
  transform: scale(1.1);
}

.profile {
  text-align: center;
  margin-bottom: 1.5rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--button-bg);
  margin: 0 auto;
  border: 3px solid var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: #ff6b35;
}

.name {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.tagline {
  text-align: center;
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 2rem;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.link-button {
  display: block;
  padding: 1rem;
  background-color: var(--button-bg);
  color: var(--text-color);
  text-decoration: none;
  border-radius: 0.5rem;
  text-align: center;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.link-button:hover {
  background-color: var(--button-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

@media (max-width: 480px) {
  .card {
    padding: 1.5rem;
  }

  .name {
    font-size: 1.5rem;
  }

  .avatar {
    width: 80px;
    height: 80px;
    font-size: 1.5rem;
  }
}
</style>