import { RefObject, useEffect, useState } from "react";
import { CanvasScale } from "../../runtime/interaction-states/CanvasScale";

/**
 *
 * @param parent refernce to the surrounding conatainer
 * @param ref reference of the element to be resized automatically
 */
export const useAutoResize = (parent: RefObject<HTMLElement>) => {
  const [scale, setScale] = useState<number>();
  useEffect(() => {
    const rescale = () => {
      if (parent.current) {
        const container = parent.current;
        const width = container.getBoundingClientRect().width;
        // if container is less than 900px then scale = width/900
        // if contianer is not less than 900px then scale = 1
        if (width < 900) {
          setScale(width / 900);
        } else {
          setScale(1.0);
        }
      }
    };
    rescale();
    window.addEventListener("resize", rescale);
    return () => {
      window.removeEventListener("resize", rescale);
    };
  }, [parent.current]);
  useEffect(() => {
    if (scale) {
      CanvasScale.next(scale);
    }
  }, [scale]);
  return scale;
};
