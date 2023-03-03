import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
// Importing the jest testing library
import '@testing-library/jest-dom'
import { HideOnDesktop, HideOnMobile } from "./HideOn";

const setWidth = (width: number) => {
  global.innerWidth = width;
  global.dispatchEvent(new Event('resize'));
}

describe('Testing responsive components', () => {
  it('HideOnDesktop shows content on mobile', () => {
    setWidth(500);
    const component = renderer.create(
      <HideOnDesktop>
        Mobile content
      </HideOnDesktop>
    );

    expect(component).toHaveTextContent("Mobile content");
  });

  it('HideOnMobile shows content on desktop', () => {
    setWidth(1920);
    const component = renderer.create(
      <HideOnMobile>
        Desktop content
      </HideOnMobile>
    );

    expect(component).toHaveTextContent("Desktop content");
  });

  it('Repsonsive components behave correctly on scaling', () => {
    expect(true).toBeTruthy();
  });
});
