# pull-stream-docs

- uses [`ecosystem-docs`](https://github.com/hughsk/ecosystem-docs) to aggregate modules within the `pull-stream` ecosystem, both inside the [`pull-stream` org](https://github.com/pull-stream) and out.
- using [`inu`](https://github.com/ahdinosaur/inu) to render a static website to discover and reference modules within the `pull-stream` ecosystem.

the list of modules included within the ecosystem is [./modules.md](./modules.md).

the built output is [`pull-stream/pull-stream.github.io`](https://github.com/pull-stream/pull-stream.github.io) which is rendered at <https://pull-stream.github.io>.

## adding a module to the ecosystem

1. edit [./modules.md](./modules.md) to include your module within the appropriate category.
1. submit a pull request here to apply this change.
1. a `pull-stream` maintainer will merge your change and re-deploy the website.

## maintainer how to

### install

```shell
git clone git://github.com/pull-stream/pull-stream-docs
cd pull-stream-docs
npm install
```

### start development server

```shell
npm start
```

### deploy to production

```shell
npm run deploy:remote
npm run deploy
```

## inspiration

- [stackgl/packages](https://github.com/stackgl/packages)

## license

The Apache License

Copyright &copy; 2016 Michael Williams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
