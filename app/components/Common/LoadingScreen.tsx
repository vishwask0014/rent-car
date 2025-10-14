import IconContainer from "../IconContainer";

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white gap-4">
      <IconContainer name="logo" />
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
