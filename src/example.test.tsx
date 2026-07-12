import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

// Example test — safe to delete. It shows the vitest + Testing Library setup
// (jsdom environment, component rendering) so new modules start with a working
// `pnpm test` instead of an empty one.
function Greeting({ name }: { name: string }) {
	return <p>Hello {name}</p>;
}

describe("example", () => {
	it("renders a component", () => {
		render(<Greeting name="Coral" />);
		expect(screen.getByText("Hello Coral")).toBeTruthy();
	});
});
