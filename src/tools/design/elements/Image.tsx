/**
    Copyright 2021 Quaffles    
 
    This file is part of Maurya Editor.

    Maurya Editor is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 2 of the License, or
    (at your option) any later version.

    Maurya Editor is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Foobar.  If not, see <https://www.gnu.org/licenses/>.
 */
import React from "react";
import { RenderProps } from "./types/RenderProps";
import { SimpleComponent } from "./utils/SimpleComponent";
import { SimpleDragComponent } from "./utils/SimpleDragComponent";
import AddImage from "./assets/add-image.svg";
import { useStyle } from "./hooks/useStyle";
import { useAttachAppearance } from "./hooks/useAttachAppearance";

const Image: React.FC<RenderProps> = (props) => {
  const [style, setStyle] = useStyle(props.ID, props.style!);

  const Width = useAttachAppearance<string>(
    props.ID,
    "design/text",
    "Width",
    props.properties?.Width || "256px"
  );

  const Height = useAttachAppearance<string>(
    props.ID,
    "design/text",
    "Height",
    props.properties?.Height || "256px"
  );

  return (
    <img
      height={Height}
      style={{ ...style, objectFit: "cover" }}
      alt={""}
      src={AddImage}
      width={Width}
    />
  );
};

const manifest = {
  key: "Image",
  comp: SimpleComponent,
  props: { name: "Image" },
  ondragComp: SimpleDragComponent,
  ondragProps: { name: "Image" },
  renderComp: Image,
  renderCompProps: () => {
    return {
      style: { width: "2em" } as React.CSSProperties,
    };
  },
};

export default manifest;
