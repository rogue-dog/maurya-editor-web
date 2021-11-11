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
import { useState } from "react";
declare interface WebPatchData {
  ID: string;
  slice: { [key: string | number]: any };
}
declare const PostPatchEvent: (payload: WebPatchData) => string;

// Simplification-7 Take ID as props rather than bus
export const TextRequiredProperty: React.FC<{
  ID: string;
  propertyName: string;
  initialValue: string;
}> = (props) => {
  // Publish to bus on value change
  const [value, setValue] = useState<string>(props.initialValue);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4em" }}>
      <div style={{ color: "#1E40AF", fontWeight: 600, fontSize: "0.8em" }}>
        {props.propertyName}
        <span style={{ color: "#A42862" }}>&nbsp;*</span>
      </div>
      <input
        type="text"
        onChange={(event) => {
          PostPatchEvent({
            ID: props.ID,
            slice: {
              properties: {
                [props.propertyName]: event.target.value,
              },
            },
          });
          setValue(event.target.value);
        }}
        value={value}
        style={{
          outline: "none",
          paddingLeft: "1em",
          paddingRight: "1em",
          lineHeight: "2.5em",
          border: "1px solid #CBD5E1",
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
};