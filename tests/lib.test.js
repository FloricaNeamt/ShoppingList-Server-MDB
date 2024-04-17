const lib = require("../excercise/lib");
const db = require("../excercise/db");
describe("absolute", () => {
  it("should return a positive number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("should return a positive number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return0 if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Flori");
    expect(result).toMatch(/Flori/);
    expect(result).toContain("Flori");
  });
});

describe("getCurrencies", () => {
  it("should return supported currecies", () => {
    const result = lib.getCurrencies();
    expect(result).toContain("USD");
    expect(result).toContain("AUD");
    expect(result).toContain("EUR");
    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});

describe("getProduct", () => {
  it("should return the product with the given id", () => {
    const result = lib.getProduct(1);
    expect(result).toMatchObject({ id: 1, price: 10 });
    expect(result).toHaveProperty("id", 1);
  });
});

describe("registerUser", () => {
  it("should throw if username is falsy", () => {
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(null);
      }).toThrow();
    });
  });
  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("Flori");
    expect(result).toMatchObject({ username: "Flori" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("fizzBuzz", () => {
  it("should throw an exception if input is not a number", () => {
    expect(() => {
      lib.fizzBuzz("a");
    }).toThrow();
    expect(() => {
      lib.fizzBuzz(null);
    }).toThrow();
    expect(() => {
      lib.fizzBuzz(undefined);
    }).toThrow();
    expect(() => {
      lib.fizzBuzz({});
    }).toThrow();
  });
  it("should return FizzBuzz if input is divisible by 3 and 5", () => {
    const result = lib.fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });
  it("should return Fizz if input is only divisible by 3", () => {
    const result = lib.fizzBuzz(6);
    expect(result).toBe("Fizz");
  });
  it("should return Buzz if input is only divisible by 5", () => {
    const result = lib.fizzBuzz(10);
    expect(result).toBe("Buzz");
  });
  it("should return ibput if input is not divisible by 3 or 5", () => {
    const result = lib.fizzBuzz(10);
    expect(result).toBe("Buzz");
  });
});

describe("applyDiscout", () => {
  it("should apply 10% discout if customer has more than 10 points", () => {
    db.getCustomerSync = function (customerId) {
      console.log("Fake reading customer...");
      return { id: customerId, points: 20 };
    };
    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscout(order);
    expect(order.totalPrice).toBe(9);
  });
});
const mail = require("../excercise/mail");

describe("notifyCustomer", () => {
  it("should send an email to the customer", async () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe("a");
    // expect(mail.send.mock.calls[0][1]).toBe(/order/);
  });
});
