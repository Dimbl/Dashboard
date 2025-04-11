import { useEffect, useState } from "react";
import { Widget, LayoutType } from "../../types/types";
import ResponsiveGridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Button } from "../Button/Button";

export const AddedWidgetsContainer = ({
  toggleWidgets,
  addedWidgets,
  widgets,
  setWidgets,
  isEditDashboard,
}: {
  toggleWidgets: (widget: Widget) => void;
  addedWidgets: Widget[];
  widgets: Widget[];
  setWidgets: (widgets: Widget[]) => void;
  isEditDashboard: boolean;
}) => {
  const STORAGE_KEY = "widgets";

  const initialLayout = widgets.map((widget: Widget) => ({
    ...widget.layout,
  }));

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [layout, setLayout] = useState<LayoutType[]>(initialLayout);

  useEffect(() => {
    saveLayout(layout);
  }, [layout]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const savedLayout = localStorage.getItem(STORAGE_KEY);
    if (savedLayout) {
      try {
        const parsedSavedLayout = JSON.parse(savedLayout);
        const parsedLayout = parsedSavedLayout.layout;
        if (parsedLayout) {
          setLayout(parsedLayout);
        }
      } catch (error) {
        console.error("Failed to parse saved layout", error);
      }
    } else {
      setLayout(initialLayout);
    }
  }, [initialLayout, addedWidgets]);

  const saveLayout = (newLayout: LayoutType[]) => {
    widgets.forEach((widget: Widget, index: number) => {
      widget.layout = newLayout[index];
    });
    setWidgets(widgets);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets));
  };

  const onLayoutChange = (newLayout: LayoutType[]) => {
    setLayout(newLayout);
    saveLayout(newLayout);
  };

  return (
    <div className="w-screen bg-white rounded-2xl px-6 py-4 mx-8 mt-0 mb-8">
      <ResponsiveGridLayout
        className="layout"
        layout={layout as Layout[]}
        onLayoutChange={onLayoutChange}
        cols={6}
        rowHeight={height / 10}
        width={width}
        containerPadding={[40, 10]}
      >
        {addedWidgets.map((widget: Widget) => (
          <div
            className="flex flex-row items-center justify-center bg-white rounded-lg 
            border border-solid border-blue-100 p-4 
            hover:border-blue-500 relative group cursor-grab active:cursor-grabbing"
            key={widget.id}
          >
            <span>{widget.name}</span>
            {isEditDashboard ? (
              <Button
                name="X"
                className={`flex items-center justify-center absolute right-1.5 top-1.5 
                  bg-gray-100 border border-gray-400 w-5 h-5 rounded 
                  cursor-pointer invisible group-hover:visible 
                  hover:border-blue-500 hover:bg-blue-500
                   ${widget.addWidget ? "bg-white text-black" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWidgets(widget);
                }}
              />
            ) : null}
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};
