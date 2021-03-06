import React, { useEffect } from "react";
import { PostCreateEvent } from "../../../../runtime/commands";
import getCoords from "../../lib/getCoords";
import { selectElement } from "../../lib/selectElement";
import { selectParent } from "../../lib/selectParent";
import { DesignRuntime } from "../../runtime/DesignRuntime/DesignRuntime";
import { CanvasScale } from "../../runtime/interaction-states/CanvasScale";
import { SelectedDesignElement } from "../../runtime/interaction-states/SelectedDesignElement";
import { ElementState } from "../../types/ElementState";

export const useDropNewElement = (
  subcontainerRef: React.RefObject<HTMLElement>,
  rootRef: React.RefObject<HTMLElement>
) => {
  useEffect(() => {
    if (subcontainerRef.current) {
      const onmouseup = (event: MouseEvent) => {
        if (SelectedDesignElement.value) {
          const parent = selectParent(event);
          let { top, left } = getCoords(rootRef.current!);
          if (parent !== "root") {
            ({ top, left } = getCoords(
              DesignRuntime.getRefFor(parent).current!
            ));
          }
          const compKey = SelectedDesignElement.value.key;
          const state: Pick<ElementState, "state"> = {
            state: {
              style: {
                position: "absolute",
                top: `${(event.clientY - top) / CanvasScale.value + 10}px`,
                left: `${(event.clientX - left) / CanvasScale.value + 10}px`,
              },
              parent: parent,
              properties: {},
              appearance: {},
              alias: "",
            },
          };
          const ID = DesignRuntime.createElement(compKey, state, true);
          SelectedDesignElement.next(null);
          selectElement(ID);
        }
      };
      subcontainerRef.current.addEventListener("mouseup", onmouseup);
      return () => {
        subcontainerRef.current?.removeEventListener("mouseup", onmouseup);
      };
    }
  }, [subcontainerRef, rootRef]);
};
