# blog-frontend

# type

message: {
  type: [String, Object] as PropType<string | MessageVM>,
  default: '',
},
onClose: {
  type: Function as PropType<() => void>,
  required: true,
},

interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}

## service-worker

"register-service-worker": "^1.7.1",
"@vue/cli-plugin-pwa": "^4.5.11",
"vue-class-component": "^8.0.0-0",

## mavonEditor

## theme

主题仿照`Twenty Twelve`

## size

42, 36, 30, 24

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

### Run your unit tests

```
npm run test:unit
```

### Run your end-to-end tests

```
npm run test:e2e
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
