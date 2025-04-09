import { Button } from "../Button/Button";

export const NoWidgetsAddedContainer = (props: {
  toggleEditDashboard: () => void;
}) => {
  const { toggleEditDashboard } = props;
  return (
    <div className="no-widgets-added-container flex flex-col items-center justify-center gap-4 h-[50vh]">
      <img src="/img.svg" alt="img" />
      <h2 className="text-2xl font-bold mt-4">No widgets added yet</h2>
      <p className="text-sm">Click "Edit Dashboard" to add a new widget</p>
      <Button
        name="Edit Dashboard"
        onClick={toggleEditDashboard}
        className="rounded-lg border border-solid px-2 py-1 text-base font-medium 
        font-sans bg-blue-500 text-white border-blue-500 cursor-pointer 
        hover:bg-blue-600 hover:border-blue-600"
      />
    </div>
  );
};
