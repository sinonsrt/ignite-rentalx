describe("Create category", () => {
  it("Should be some 2 + 2 = 4", () => {
    const soma = 2 + 2;

    const result = 4;

    expect(soma).toEqual(result);
  });

  it("Should be 2 + 2 diff from 5", () => {
    const soma = 2 + 2;
    const result = 5;

    expect(soma).not.toBe(result);
  });
});
