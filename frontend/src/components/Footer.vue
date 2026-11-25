<template>
  <UFooter :ui="{
    root: 'fixed bottom-0 inset-x-0 z-50 bg-default border-t border-default',
    container: 'flex items-center py-2 lg:py-2',
    left: 'order-1 flex-1 mt-0 lg:justify-center',
    center: 'order-2 flex-1 mt-0',
    right: 'order-3 flex-1 lg:justify-center'
  }">
    <template #left>
      <UColorModeButton />
    </template>

    <template #default>
      <UDrawer>
        <UButton label="Info" color="neutral" variant="subtle" />

        <template #header>stuart@trackMyFilms</template>

        <template #content>
          <p>Personal film tracker</p>
          <p>222 entries</p>
          <p>Tracking since: 20202</p>
          <p>MangaDex</p>
          <p>Admin login</p>
        </template>
      </UDrawer>
    </template>

    <template #right>
      <UDrawer>
        <UButton label="Credits" color="neutral" variant="subtle" />

        <template #header>Credits</template>

        <template #content>
          <p>TMDB</p>
          <p>Hardcover</p>
          <p>MangaDex</p>
        </template>
      </UDrawer>
    </template>

    <!-- <p>6 of 6 entries show</p>
    <p>Sorted by:</p>
    <RouterLink to="/admin">
      <p>Admin</p>
    </RouterLink> -->
  </UFooter>
</template>
