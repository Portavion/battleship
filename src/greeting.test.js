// const greeting = require("./greeting");
import { greeting } from "./greeting.js";

test("greeting", () => {
	expect(greeting).toBe("Hello!");
});
