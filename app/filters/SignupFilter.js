import { operators, Filter } from './_base';

class SignupFilter extends Filter {
  constructor() {
    super();

    this._addFilter(
      'action.type',
      operators.equal,
      'SIGNUP_CREATED'
    );
  }
}

export default SignupFilter;
