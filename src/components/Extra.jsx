import React from 'react';

const Extra = () => (
  <div className='note-exercise-m'>
    <ul>
      <li>0. Search all 'TODO' comments in the project and if there is some, implement the solutions</li>
      <li>1. (currently) There is no way to avoid actions creating conflicting changes ones a request is pending (fix it)</li>
      <li>2. Backend might throw internal server error status 500. If there is no decent error handling for requests,
      prepare for exceptions in catch clause, in a way that does not conflict with data integrity.
      <ul>
        <li>How could you do this as user friendly as possible? (retry a few times? remove item? indicate that item as corrupted?)</li>
      </ul>
      </li>
      <li>3. Implement all promises axios.get/put/delete/post(...).then(...).catch(...) using async await syntax</li>
    </ul>
  </div>
);

export default Extra;