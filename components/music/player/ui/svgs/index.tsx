export const Play = ({ fill }: { fill: string }): JSX.Element => {
  return (
    <svg width="45" height="45" fill={fill} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25Zm3.505 10.186-5.365 3.24a.506.506 0 0 1-.765-.435V8.76a.505.505 0 0 1 .765-.437l5.365 3.241a.51.51 0 0 1 0 .872Z"></path>
    </svg>
  )
}

export const Pause = ({ fill }: { fill: string }): JSX.Element => {
  return (
    <svg width="45" height="45" fill={fill} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25ZM10.5 15A.75.75 0 1 1 9 15V9a.75.75 0 0 1 1.5 0v6Zm4.5 0a.75.75 0 1 1-1.5 0V9A.75.75 0 1 1 15 9v6Z"></path>
    </svg>
  )
}

export const SkipForward = ({ fill }: { fill: string }): JSX.Element => {
  return (
    <svg width="28" height="28" fill={fill} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.75 3a.75.75 0 0 0-.75.75v6.395L7.089 3.615a1.647 1.647 0 0 0-1.677-.021 1.841 1.841 0 0 0-.912 1.61v13.593c0 .674.35 1.29.912 1.61a1.648 1.648 0 0 0 1.677-.022L18 13.855v6.395a.75.75 0 1 0 1.5 0V3.75a.75.75 0 0 0-.75-.75Z"></path>
    </svg>
  )
}

export const SkipBack = ({ fill }: { fill: string }): JSX.Element => {
  return (
    <svg width="28" height="28" fill={fill} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.25 3a.75.75 0 0 1 .75.75v6.395l10.911-6.53a1.647 1.647 0 0 1 1.677-.021c.562.319.912.937.912 1.61v13.593c0 .674-.35 1.29-.912 1.61a1.648 1.648 0 0 1-1.677-.022L6 13.855v6.395a.75.75 0 1 1-1.5 0V3.75A.75.75 0 0 1 5.25 3Z"></path>
    </svg>
  )
}

export const Repeat = ({ fill }: { fill: string }): JSX.Element => {
  return (
    <svg
      version="1.1"
      width="25"
      height="25"
      fill={fill}
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      enableBackground="new 0 0 512 512"
      xmlSpace="preserve"
    >
      <g id="XMLID_1_">
        <path
          id="XMLID_5_"
          d="M363.1,124.1L319,80c-4.7-4.7-11-6.3-18.1-4.7c-1.6,0.8-3.2,0.8-4.7,2.4c-6.3,3.9-9.5,10.2-9.5,17.3
		c0,4.7,2.4,8.7,5.5,11.8l21.3,21.3H104c-27.6,0-53.6,11-73.3,30.7S0,204.4,0,232v21.3c0,10.2,8.7,18.9,18.9,18.9
		s18.9-8.7,18.9-18.9V232c0-18.1,7.1-34.7,19.7-47.3c12.6-12.6,29.1-19.7,47.3-19.7h206.4l-21.3,21.3c-3.2,3.2-5.5,7.1-5.5,11.8
		c-0.8,5.5,1.6,11,5.5,15c3.2,3.2,7.9,5.5,13.4,5.5c4.7,0,9.5-1.6,13.4-5.5l47.3-47.3c5.5-5.5,8.7-12.6,8.7-20.5
		C371.8,137.5,368.6,129.6,363.1,124.1z M493.1,239.9c-10.2,0-18.9,8.7-18.9,18.9V280c0,18.1-7.1,34.7-19.7,47.3
		c-12.6,12.6-29.1,19.7-47.3,19.7H200.9l21.3-21.3c3.2-3.2,5.5-7.1,5.5-11.8c0.8-5.5-1.6-11-5.5-15c-3.2-3.2-7.9-5.5-13.4-5.5
		c-4.7,0-9.5,1.6-13.4,5.5l-47.3,47.3c-5.5,5.5-8.7,12.6-8.7,20.5c0,7.9,3.2,15,8.7,20.5L193,432c4.7,4.7,11,6.3,18.1,4.7
		c1.6-0.8,3.2-0.8,4.7-2.4c6.3-3.9,9.5-10.2,9.5-17.3c0-4.7-2.4-8.7-5.5-11.8L198.5,384H408c57.5,0,104-46.5,104-104v-21.3
		C512,247.7,503.3,239.9,493.1,239.9z"
        />
      </g>
    </svg>
  )
}

export const NoRepeat: React.FC = (): JSX.Element => {
  return (
    <svg
      version="1.1"
      width="25"
      height="25"
      fill="#767676"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      enableBackground="new 0 0 512 512"
      xmlSpace="preserve"
    >
      <g id="XMLID_1_">
        <path
          id="XMLID_5_"
          d="M363.1,124.1L319,80c-4.7-4.7-11-6.3-18.1-4.7c-1.6,0.8-3.2,0.8-4.7,2.4c-6.3,3.9-9.5,10.2-9.5,17.3
		c0,4.7,2.4,8.7,5.5,11.8l21.3,21.3H104c-27.6,0-53.6,11-73.3,30.7S0,204.4,0,232v21.3c0,10.2,8.7,18.9,18.9,18.9
		s18.9-8.7,18.9-18.9V232c0-18.1,7.1-34.7,19.7-47.3c12.6-12.6,29.1-19.7,47.3-19.7h206.4l-21.3,21.3c-3.2,3.2-5.5,7.1-5.5,11.8
		c-0.8,5.5,1.6,11,5.5,15c3.2,3.2,7.9,5.5,13.4,5.5c4.7,0,9.5-1.6,13.4-5.5l47.3-47.3c5.5-5.5,8.7-12.6,8.7-20.5
		C371.8,137.5,368.6,129.6,363.1,124.1z M493.1,239.9c-10.2,0-18.9,8.7-18.9,18.9V280c0,18.1-7.1,34.7-19.7,47.3
		c-12.6,12.6-29.1,19.7-47.3,19.7H200.9l21.3-21.3c3.2-3.2,5.5-7.1,5.5-11.8c0.8-5.5-1.6-11-5.5-15c-3.2-3.2-7.9-5.5-13.4-5.5
		c-4.7,0-9.5,1.6-13.4,5.5l-47.3,47.3c-5.5,5.5-8.7,12.6-8.7,20.5c0,7.9,3.2,15,8.7,20.5L193,432c4.7,4.7,11,6.3,18.1,4.7
		c1.6-0.8,3.2-0.8,4.7-2.4c6.3-3.9,9.5-10.2,9.5-17.3c0-4.7-2.4-8.7-5.5-11.8L198.5,384H408c57.5,0,104-46.5,104-104v-21.3
		C512,247.7,503.3,239.9,493.1,239.9z"
        />
      </g>
    </svg>
  )
}

export const RandomMusicsFalse: React.FC = (): JSX.Element => {
  return (
    <svg
      width="25"
      height="25"
      fill="none"
      stroke="#767676"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m18 4 3 3-3 3"></path>
      <path d="m18 20 3-3-3-3"></path>
      <path d="M3 7h3a5 5 0 0 1 5 5 5 5 0 0 0 5 5h5"></path>
      <path d="M9 16.001c-.865.65-1.918 1-3 .999H3"></path>
      <path d="M21 7h-5a4.978 4.978 0 0 0-2.998.998"></path>
    </svg>
  )
}

export const RandomMusicsTrue = ({ fill }: { fill: string }): JSX.Element => {
  return (
    <svg
      width="25"
      height="25"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m18 4 3 3-3 3"></path>
      <path d="m18 20 3-3-3-3"></path>
      <path d="M3 7h3a5 5 0 0 1 5 5 5 5 0 0 0 5 5h5"></path>
      <path d="M9 16.001c-.865.65-1.918 1-3 .999H3"></path>
      <path d="M21 7h-5a4.978 4.978 0 0 0-2.998.998"></path>
    </svg>
  )
}

export const Download = ({ fill }: { fill: string }): JSX.Element => {
  return (
    <svg
      width="35"
      height="35"
      enableBackground=":new 0 0 499.968 394.332;"
      version="1.1"
      viewBox="0 0 499.968 394.332"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="cloud-arrow-down">
        <g id="cloud-arrow-down_1_">
          <path
            d="M404.168,119.452c-4.322,0-8.527,0.365-12.7,0.923C387.832,53.29,332.279,0,264.272,0    c-55.51,0-97.805,40.418-115.279,89.932c-9.311-2.446-24.007-8.646-34.089-8.646C51.456,81.286,0,132.709,0,196.19    c0,63.437,51.456,114.882,114.904,114.882c15.607,0,39.721,0,67.577,0l51.81,68.844c1.717,2.424,11.059,14.417,26.506,14.417    c6.908,0,17.077-2.489,26.602-14.889l49.149-68.371c30.882,0,55.896,0,67.62,0c52.904,0,95.8-42.885,95.8-95.811    C499.968,162.337,457.072,119.452,404.168,119.452z M228.327,130.693h60.831v22.569v4.956h-60.831v-4.956V130.693z     M228.327,197.069v-20.66v-4.955h60.831v4.955v20.617V199h-60.831V197.069z M314.173,311.072l-41.545,57.774    c-12.4,16.111-23.533,0.514-23.533,0.514l-43.851-58.288l-28.275-37.564c-6.469-13.28,7.691-12.893,7.691-12.893h44.279v-43.443    v-1.974h60.348v1.952v43.465H334.8c0,0,10.845-0.215,7.423,11.434L314.173,311.072z"
            fill={fill}
          />
        </g>
      </g>
      <g id="Layer_1" />
    </svg>
  )
}

export const VolumeOff = ({ fill }: { fill: string }): JSX.Element => {
  return (
    <svg width="20" height="20" fill={fill} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        d="M11.26 3.691A1.2 1.2 0 0 1 12 4.8v14.4a1.2 1.2 0 0 1-2.048.848L5.503 15.6H2.4a1.2 1.2 0 0 1-1.2-1.2V9.6a1.2 1.2 0 0 1 1.2-1.2h3.103l4.449-4.448a1.2 1.2 0 0 1 1.308-.26Zm3.492 5.06a1.2 1.2 0 0 1 1.696 0L18 10.304l1.552-1.551a1.2 1.2 0 1 1 1.696 1.696L19.697 12l1.551 1.552a1.2 1.2 0 0 1-1.696 1.696L18 13.697l-1.552 1.551a1.2 1.2 0 0 1-1.696-1.696L16.303 12l-1.551-1.552a1.2 1.2 0 0 1 0-1.696Z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

export const VolumeOn = ({ fill }: { fill: string }): JSX.Element => {
  return (
    <svg width="20" height="20" fill={fill} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        d="M11.26 3.691A1.2 1.2 0 0 1 12 4.8v14.4a1.199 1.199 0 0 1-2.048.848L5.503 15.6H2.4a1.2 1.2 0 0 1-1.2-1.2V9.6a1.2 1.2 0 0 1 1.2-1.2h3.103l4.449-4.448a1.2 1.2 0 0 1 1.308-.26Zm6.328-.176a1.2 1.2 0 0 1 1.697 0A11.967 11.967 0 0 1 22.8 12a11.966 11.966 0 0 1-3.515 8.485 1.2 1.2 0 0 1-1.697-1.697A9.563 9.563 0 0 0 20.4 12a9.565 9.565 0 0 0-2.812-6.788 1.2 1.2 0 0 1 0-1.697Zm-3.394 3.393a1.2 1.2 0 0 1 1.698 0A7.178 7.178 0 0 1 18 12a7.18 7.18 0 0 1-2.108 5.092 1.2 1.2 0 1 1-1.698-1.698A4.782 4.782 0 0 0 15.6 12a4.78 4.78 0 0 0-1.406-3.394 1.2 1.2 0 0 1 0-1.698Z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

export const All = ({ fill }: { fill: string }): JSX.Element => {
  return (
    <svg
      width="25px"
      height="25px"
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path
        fill={fill}
        d="M4 3v9.4c-0.4-0.2-0.9-0.4-1.5-0.4-1.4 0-2.5 0.9-2.5 2s1.1 2 2.5 2 2.5-0.9 2.5-2v-7.3l7-2.3v5.1c-0.4-0.3-0.9-0.5-1.5-0.5-1.4 0-2.5 0.9-2.5 2s1.1 2 2.5 2 2.5-0.9 2.5-2v-11l-9 3z"
      ></path>
    </svg>
  )
}

export const AllSelected = ({ fill }: { fill: string }): JSX.Element => {
  return (
    <svg
      width="25px"
      height="25px"
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path
        fill={fill}
        d="M4 3v9.4c-0.4-0.2-0.9-0.4-1.5-0.4-1.4 0-2.5 0.9-2.5 2s1.1 2 2.5 2 2.5-0.9 2.5-2v-7.3l7-2.3v5.1c-0.4-0.3-0.9-0.5-1.5-0.5-1.4 0-2.5 0.9-2.5 2s1.1 2 2.5 2 2.5-0.9 2.5-2v-11l-9 3z"
      ></path>
    </svg>
  )
}

export const Search = ({ fill }: { fill: string }): JSX.Element => {
  return (
    <svg
      width="25"
      height="25"
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11 3a8 8 0 1 0 0 16 8 8 0 1 0 0-16z"></path>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
  )
}

export const SearchSelected = ({ fill }: { fill: string }): JSX.Element => {
  return (
    <svg
      width="25"
      height="25"
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11 3a8 8 0 1 0 0 16 8 8 0 1 0 0-16z"></path>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
  )
}

export const Menu: React.FC = (): JSX.Element => {
  return (
    <svg
      width="28"
      height="28"
      fill="none"
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 12h18"></path>
      <path d="M3 6h18"></path>
      <path d="M3 18h18"></path>
    </svg>
  )
}
