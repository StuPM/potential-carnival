<template>
  <footer>
    <div>
      <UColorModeButton />
    </div>
    <div>

      <UDrawer>
        <UButton label="Info" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-up" />

        <template #header>stuart@trackMyFilms</template>

        <template #content>
          <p>Personal film tracker</p>
          <p>222 entries</p>
          <p>Tracking since: 20202</p>
          <p>MangaDex</p>
          <p>Admin login</p>
        </template>
      </UDrawer>
       
    </div>
    <div>
      <UDrawer>
        <UButton label="Credits" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-up" />

        <template #header>Credits</template>

        <template #content>
          <p>TMDB</p>
          <p>Hardcover</p>
          <p>MangaDex</p>
        </template>
      </UDrawer>
    </div>

    <!-- <p>6 of 6 entries show</p>
    <p>Sorted by:</p>
    <RouterLink to="/admin">
      <p>Admin</p>
    </RouterLink> -->
  </footer>
</template>
<script lang="ts">


</script>
<style sass>
footer {
  display: flex;
  /* flex-direction: row; */
  justify-content: space-evenly;

  border: 1px solid black;

  position: fixed;
  bottom: 0;
  background-color: white;

  width: 100%;
}
</style>
