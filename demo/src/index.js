import React, {Component} from 'react';
import {render} from 'react-dom';

import T, {Provider} from '../../src';

const texts = {
  heading1: '# Heading level 1',
  heading2: '## Heading level 2',
  body: `
### Topic 1

Topic 1, which is the first topic, which I have invented, is very interesting.

It is so interesting, I will just leave you here to contemplate it in 
quiet wonder.

### Topic 2

Topic 2, which is the second topic, which I also invented, is less interesting
but still well worth your attention. Here is a list of reasons why:

1. I invented it.
1. It is amongst the top two topics in this document.
1. It is my topic.
1. It is quite interesting.

### Conclusion

I hope that these topics have provided you with enlightenment and pleasure.
  `
};

class Demo extends Component {
  render() {
    return <div>
      <h1>External Text demonstration</h1>
      <p>The following content is all rendered from external text.</p>
      <T.Provider defaultTexts={texts}>
        <T path='heading1'/>
        <T path='heading2'/>
        <T path='body'/>
      </T.Provider>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'));
