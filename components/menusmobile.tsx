import React, {useCallback} from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

function MenusMobile({mainScreen, sideScreen}: any) {

  return (
    <div>
      <button onClick={sideScreen.enter}>
        Enter fullscreen
      </button>

      	<FullScreen handle={sideScreen} className='my-component'>
            Any fullscreen content here
			<button onClick={sideScreen.exit}>
					Exit
			</button>
		</FullScreen>

    </div>
  );
}

export default MenusMobile;
