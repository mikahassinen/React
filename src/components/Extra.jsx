import React from 'react';

const Extra = () => (
  <ul>
    <li>Before: search all TODO:s in the project and if there is some, implement the solutions</li>
    <li>1. (currently) There is no way to avoid actions creating conflicting changes ones a request is bending (fix it)</li>
    <li>2. Backend might throw internal server error status 500. (currently) There is no decent error handling for requests,
      prepare for exceptions in catch clause in a way that does not conflict with data integrity
      <ul>
        <li>How could you do this as user friendly as possible? (retry a few times? remove item? display item as corrupted?)</li>
      </ul>
    </li>
    <li>3. Implement all promises axios.get/put...(...).then(...).catch(...) using async await syntax</li>
  </ul>
);

export default Extra;