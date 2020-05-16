# Worker Controller

[![npm version](https://badge.fury.io/js/%40technote-space%2Fworker-controller.svg)](https://badge.fury.io/js/%40technote-space%2Fworker-controller)
[![CI Status](https://github.com/technote-space/worker-controller/workflows/CI/badge.svg)](https://github.com/technote-space/worker-controller/actions)
[![CodeFactor](https://www.codefactor.io/repository/github/technote-space/worker-controller/badge)](https://www.codefactor.io/repository/github/technote-space/worker-controller)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/technote-space/worker-controller/blob/master/LICENSE)

Worker Controller

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [Setup](#setup)
- [Author](#author)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Setup
```shell script
yarn add @technote-space/worker-controller
```

`Pgocess.ts`
```typescript
import {ProcessBase} from '@technote-space/worker-controller';
import {UpdateResult} from './types';

global['Process'] = class Process extends ProcessBase<UpdateResult> {
    //...
};
```

`webpack.js`
```js
module.exports = {
    //...
    entry: {
        index: path.join(__dirname, 'src/index.jsx'),

        // create worker.js
        'worker-controller.worker': '@technote-space/worker-controller/dist/Worker/worker-controller.worker',
        // create process.js
        process: path.join(__dirname, 'src/Process'),
    },
    //...
};
```

`Test.jsx`
```typescript jsx
import React, {useEffect, useMemo, useState} from 'react';
import {Button} from '@material-ui/core';
import {Controller} from '@technote-space/worker-controller';

export default function NavContentEx() {
    const [worker, setWorker] = useState(null);

    useEffect(() => {
        const worker = new Controller(result => {
          //...
        });
        setWorker(worker);
        worker.reset();
    }, []);

    return useMemo(() => <>
      <Button onClick={() => worker.reset()}>Reset</Button>
      <Button onClick={() => worker.start()}>Start</Button>
      <Button onClick={() => worker.stop()}>Stop</Button>
    </>, [worker])
}
```

## Author
[GitHub (Technote)](https://github.com/technote-space)  
[Blog](https://technote.space)
