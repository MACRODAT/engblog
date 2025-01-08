import React, {useCallback} from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

function MenusMobile({mainScreen}: any) {
  const handle = useFullScreenHandle();

  return (
    <div>
      <button onClick={handle.enter}>
        Enter fullscreen
      </button>

      <FullScreen handle={handle} className='my-component'>
        Any fullscreen content here
		<button onClick={handle.exit}>
            Exit
		</button>
      </FullScreen>
    </div>
  );
}

export default MenusMobile;
