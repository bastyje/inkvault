import { ErrorMessage, stringIsEmptyButShouldNotBe } from "./error-messages";

export class GuardException extends Error {
  constructor(errorMessage: ErrorMessage) {
    super();
    this.errorMessage = errorMessage;
  }

  public errorMessage: ErrorMessage;
}

export const shouldNotBeEmpty = (testString: string | null)  => {
  if (testString === null || testString === undefined || testString === '')
    throw new GuardException(stringIsEmptyButShouldNotBe());
}
