import { useState } from "react";
import { Widget } from "../../types/types";
import { Button } from "../Button/Button";

export const WidgetsContainer = (props: {
  widgets: Widget[];
  toggleWidgets: (widget: Widget) => void;
}) => {
  const { widgets, toggleWidgets } = props;
  const [search, setSearch] = useState("");

  const filteredWidgets = widgets.filter((widget) =>
    widget.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="w-screen flex flex-col items-start justify-start flex-wrap bg-white 
    rounded-2xl mx-8 my-8 px-6 py-4 gap-4"
    >
      <h2 className="text-2xl font-bold">Manage Widgets</h2>
      <form>
        <input
          className="bg-gray-100 border border-solid border-gray-300 rounded-md p-2"
          name="search"
          type="text"
          placeholder="Search"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
      </form>
      <div className="flex flex-wrap items-center justify-around gap-3 overflow-auto h-[20vh]">
        {filteredWidgets.map((widget) => (
          <div
            key={widget.id}
            className={`flex flex-row items-center justify-between bg-white rounded-lg 
              border border-blue-100 w-[300px] min-w-[260px] h-min min-h-[70px] p-4 
              ${widget.addWidget ? "bg-blue-100 border-blue-500" : ""}`}
          >
            <div>{widget.name}</div>
            <div>
              <Button
                name={widget.addWidget ? "Remove" : "Add"}
                onClick={() => toggleWidgets(widget)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
