import { useEffect, useState } from "react";
import { ControlPanel } from "./components/ControlPanel/ControlPanel";
import { WidgetsContainer } from "./components/WidgetsContainer/WidgetsContainer";
import { AddedWidgetsContainer } from "./components/AddedWidgetsContainer/AddedWidgetsContainer.tsx";
import { NoWidgetsAddedContainer } from "./components/NoWidgetsAddedContainer/NoWidgetsAddedContainer.tsx";
import { WidgetsState } from "./store/storeWidgets.ts";
import { Widget } from "./types/types.ts";

function App() {
  const [isEditDashboard, setIsEditDashboard] = useState(false);
  const [addedWidgets, setAddedWidgets] = useState<Widget[]>([]);
  const [widgets, setWidgets] = useState<Widget[]>(WidgetsState);

  useEffect(() => {
    loadLocalStorage();
  }, []);

  useEffect(() => {
    const widgetsAdded = widgets.filter((w: Widget) => w.addWidget);
    if (widgetsAdded.length !== 0) {
      setAddedWidgets(widgetsAdded);
    } else {
      setAddedWidgets([]);
    }
  }, [widgets]);

  const loadLocalStorage = () => {
    const widgetsFromLocalStorage = localStorage.getItem("widgets");
    if (widgetsFromLocalStorage) {
      setWidgets(JSON.parse(widgetsFromLocalStorage));
    }
  };

  const saveWidgetToLocalStorage = () => {
    localStorage.setItem("widgets", JSON.stringify(widgets));
  };

  const toggleWidgets = (widget: Widget) => {
    widget.addWidget = !widget.addWidget;
    setWidgets([...widgets]);
  };

  const toggleEditDashboard = () => {
    setIsEditDashboard(!isEditDashboard);
  };

  return (
    <>
      <ControlPanel
        isEditDashboard={isEditDashboard}
        saveWidgetToLocalStorage={saveWidgetToLocalStorage}
        toggleEditDashboard={toggleEditDashboard}
      />
      {isEditDashboard ? (
        <WidgetsContainer widgets={widgets} toggleWidgets={toggleWidgets} />
      ) : addedWidgets.length === 0 ? (
        <NoWidgetsAddedContainer toggleEditDashboard={toggleEditDashboard} />
      ) : null}
      {addedWidgets.length > 0 && (
        <AddedWidgetsContainer
          toggleWidgets={toggleWidgets}
          widgets={widgets}
          setWidgets={setWidgets}
          addedWidgets={addedWidgets}
          isEditDashboard={isEditDashboard}
        />
      )}
    </>
  );
}

export default App;
