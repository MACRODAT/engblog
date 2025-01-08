import React, {useCallback} from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

function MenusMobile() {
  const handle = useFullScreenHandle();

  return (
    <div>
      <button onClick={handle.enter}>
        Enter fullscreen
      </button>

      <FullScreen handle={handle}>
        Any fullscreen content here
      </FullScreen>
    </div>
  );
}

export default MenusMobile;
