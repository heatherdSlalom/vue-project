<script setup lang="ts">
// About page component
</script>

<template>
  <div class="container">
    <div class="card">
      <button class="back-button" @click="$router.push('/')">
        ← Back to Home
      </button>

      <div class="profile">
        <img src="/Headshot.jpg" alt="Heather Davis" class="avatar" />
      </div>

      <h1 class="name">About Heather Davis</h1>

      <div class="bio">
        <p>
          Heather Davis, SHRM-CP, PHR, is a seasoned HR professional specializing in enterprise workforce transformation.
          With extensive experience in employee experience, learning ecosystems, and organizational development,
          Heather designs people systems that make AI adoption work effectively in modern organizations.
        </p>
        <p>
          Her expertise spans strategic HR initiatives, talent management, and creating inclusive workplace cultures
          that drive business success and employee satisfaction.
        </p>
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
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: background-color 0.3s ease;
}

.back-button {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: none;
  border: none;
  color: var(--accent);
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;
}

.back-button:hover {
  opacity: 0.8;
}

.profile {
  text-align: center;
  margin-bottom: 1.5rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
  border: 3px solid var(--accent);
}

.name {
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.bio {
  color: var(--text-color);
  line-height: 1.6;
}

.bio p {
  margin-bottom: 1rem;
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
  }
}
</style>