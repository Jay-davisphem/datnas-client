export default function Loading() {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="relative w-12 h-12 animate-spin rounded-full border-4 border-solid border-purple-500 border-t-transparent">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-solid border-purple-300 border-t-transparent"></div>
        </div>
      </div>
    );
  }