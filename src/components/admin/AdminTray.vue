<template>
  <nav class="cn-tray">
    <section style="padding: 0 12px;">
      <cyan-toolbar>
        <cyan-icon noun="tools" />
        <cyan-toolbar-heading :level="1">
          {{ $t('admin.title') }}
        </cyan-toolbar-heading>
      </cyan-toolbar>
      <p>
        {{ $t('admin.description') }}
      </p>
    </section>
    <router-link
      to="/admin/settings"
      class="text button"
    >
      <cyan-icon
        small
        noun="monsters"
      />
      {{ $t('admin.settings.title') }}
    </router-link>

    <router-link 
      to="/admin/users"
      class="text button"
    >
      <cyan-icon 
        small
        noun="avatar"
      />
      {{ $t('admin.users.title') }}
    </router-link>

   
    <router-link to="/admin/testing-tools">
      <cyan-nav-button
        noun="admin"
      >
        {{ $t('admin.testingTools.title') }}
      </cyan-nav-button>
    </router-link>
    <router-link to="/admin/sandbox">
      <cyan-nav-button
        noun="tools"
      >
        {{ $t('admin.sandbox.title') }}
      </cyan-nav-button>
    </router-link>
  </nav>
</template>