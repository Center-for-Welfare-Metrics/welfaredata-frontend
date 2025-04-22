/*
 * Media queries utility
 */

import { css, DefaultTheme, CSSObject, Interpolation } from "styled-components";

/*
 * Taken from https://github.com/DefinitelyTyped/DefinitelyTyped/issues/32914
 */

// Update your breakpoints if you want
export const sizes = {
  iphone5: 320,
  iphone6: 375,
  iphone6_plus: 414,
  small: 480,
  xsmall: 600,
  medium: 768,
  large: 992,
  mlarge: 1024,
  xlarge: 1200,
  laptopM: 1366,
  laptopL: 1440,
  laptopG: 1600,
  qhd: 2560,
};

// Iterate through the sizes and create a media template
export const media = {
  down: (Object.keys(sizes) as Array<keyof typeof sizes>).reduce(
    (acc, label) => {
      acc[label] = (first: any, ...interpolations: any[]) => css`
        @media (min-width: ${sizes[label]}px) {
          ${css(first, ...interpolations)}
        }
      `;

      return acc;
    },
    {} as { [key in keyof typeof sizes]: MediaFunction }
  ),
  up: (Object.keys(sizes) as Array<keyof typeof sizes>).reduce(
    (acc, label) => {
      acc[label] = (first: any, ...interpolations: any[]) => css`
        @media (max-width: ${sizes[label]}px) {
          ${css(first, ...interpolations)}
        }
      `;

      return acc;
    },
    {} as { [key in keyof typeof sizes]: MediaFunction }
  ),
};

/*
 * @types/styled-component is not working properly as explained in the github issue referenced above.
 * We must overcome this with custom typings, however, this might not work in time as the styled-components update.
 * Be carefull and keep an eye on the issue and the possible improvements
 */
type MediaFunction = <P extends object>(
  first: TemplateStringsArray | CSSObject | any,
  ...interpolations: Array<Interpolation<any>>
) => any;

/* Example
const SomeDiv = styled.div`
  display: flex;
  ....
  ${media.medium`
    display: block
  `}
`;
*/
