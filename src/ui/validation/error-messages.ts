export interface ErrorMessage {
  id: string,
  message: string;
}

export const stringIsEmptyButShouldNotBe = (): ErrorMessage => ({
  id: 'STRING-IS-EMPTY-BUT-SHOULD-NOT-BE',
  message: `This field should not be empty!`
});
