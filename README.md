# bank-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Adding icons
npm install @fortawesome/fontawesome-free -D
    
npm install @mdi/font

 import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";

import { aliases, mdi } from 'vuetify/iconsets/mdi'

icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
