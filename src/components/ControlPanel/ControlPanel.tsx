import { Button } from "../Button/Button";

export const ControlPanel = ({
  isEditDashboard,
  saveWidgetToLocalStorage,
  toggleEditDashboard,
}: {
  isEditDashboard: boolean;
  saveWidgetToLocalStorage: () => void;
  toggleEditDashboard: () => void;
}) => {
  return (
    <div
      className="w-screen flex items-center justify-start flex-wrap
      bg-white rounded-b-2xl mx-8 my-0 mb-8 px-6 py-4"
    >
      {(isEditDashboard && (
        <>
          <Button name="Cancel" onClick={toggleEditDashboard} />
          <Button
            name="Save Changes"
            onClick={() => {
              saveWidgetToLocalStorage();
              toggleEditDashboard();
            }}
            className="rounded-lg border border-solid ml-2 px-2 py-1 
            text-base font-medium font-sans  bg-blue-500 text-white border-blue-500 
            cursor-pointer hover:bg-blue-600 hover:border-blue-600"
          />
        </>
      )) || <Button name="Edit Dashboard" onClick={toggleEditDashboard} />}
    </div>
  );
};
