import React from 'react';

export enum iconEnum {
  Link = 'link',
  LeftArrow = 'leftArrow',
  ArrowUp = 'arrowUp',
}

const icons = {
  [iconEnum.Link]: {
    path: (
      <>
        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
      </>
    ),
  },
  [iconEnum.LeftArrow]: {
    path: (
      <>
        <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
      </>
    ),
  },
  [iconEnum.ArrowUp]: {
    path: (
      <>
        <path
          fillRule="evenodd"
          d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
        />
      </>
    ),
  },
};

export interface IconProps {
  name: iconEnum;
  size?: string;
  fill?: string;
  fillOpacity?: number;
  focusable?: boolean;
  tabIndex?: number;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = '100%',
  fill = 'currentColor',
  fillOpacity = 1,
  focusable,
  tabIndex,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={fill}
    fillOpacity={fillOpacity}
    viewBox="0 0 16 16"
    {...{ focusable, tabIndex }}
  >
    {icons[name].path}
  </svg>
);

export default Icon;
